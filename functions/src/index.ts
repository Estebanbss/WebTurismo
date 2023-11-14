/* eslint-disable max-len */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

exports.addAdminRole = functions.https.onCall(async (data, context) => {
  // Asegúrate de que el usuario esté autenticado
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "La solicitud no tiene autenticación.");
  }

  const requesterUid = context.auth.uid;

  try {
    // Obtén el documento del usuario que hace la solicitud
    const requesterDoc = await admin.firestore().collection("users").doc(requesterUid).get();

    // Verifica si el solicitante es admin o superadmin
    if (requesterDoc.exists && (requesterDoc.data()?.rol === "admin" || requesterDoc.data()?.rol === "superadmin")) {
      // Encuentra al usuario por email y asigna el custom claim de admin
      const userToChange = await admin.auth().getUserByEmail(data.email);
      await admin.auth().setCustomUserClaims(userToChange.uid, {admin: true});
      return {message: `Éxito! ${data.email} ha sido hecho administrador`};
    } else {
      throw new functions.https.HttpsError("permission-denied", "No tienes permisos para realizar esta operación");
    }
  } catch (err) {
    // Maneja cualquier error que ocurra durante la función
    console.log(err);
    throw new functions.https.HttpsError("unknown", "Error al procesar la solicitud");
  }
});
