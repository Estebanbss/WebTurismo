import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {
  constructor(private router:Router) {}


  private serviciosGastronomia: Set<string> = new Set<string>();
  serviciosSubject: BehaviorSubject<Set<string>> = new BehaviorSubject<Set<string>>(this.serviciosGastronomia);

  private valueSource = new BehaviorSubject<string>('');
  currentValue = this.valueSource.asObservable();

  private modalsuichpstSubject = new BehaviorSubject<boolean>(false);
  modalsuich$ = this.modalsuichpstSubject.asObservable();

  private modaldataSubject = new BehaviorSubject<boolean>(false);
  modaldata$ = this.modaldataSubject.asObservable();

  private warningSubject = new BehaviorSubject<boolean>(false);
  warning$ = this.warningSubject.asObservable();

  private warningAllSubject = new BehaviorSubject<boolean>(false);
  warningAll$ = this.warningAllSubject.asObservable();

  private modalsuichmuniSubject = new BehaviorSubject<boolean>(false);
  modalsuichmuni$ = this.modalsuichmuniSubject.asObservable();

  private modalsuichatracSubject = new BehaviorSubject<boolean>(false);
  modalsuichatrac$ = this.modalsuichatracSubject.asObservable();

  private modalsuichrutasSubject = new BehaviorSubject<boolean>(false);
  modalsuichrutas$ = this.modalsuichrutasSubject.asObservable();

  private modalsuichtodoSubject = new BehaviorSubject<boolean>(false);
  modalsuichtodo$ = this.modalsuichtodoSubject.asObservable();

  private modalPFHeaderSubject = new BehaviorSubject<boolean>(false);
  modalPFHeader$ = this.modalPFHeaderSubject.asObservable();

  private modalTurnMuniSubject = new BehaviorSubject<boolean>(false);
  modalTurnMuni$ = this.modalTurnMuniSubject.asObservable();

  private modalTurnSliderPSubject = new BehaviorSubject<boolean>(false);
  modalTurnSliderP$ = this.modalTurnSliderPSubject.asObservable();

  setTurnSliderP(value: boolean) {
    this.modalTurnSliderPSubject.next(value);
  }

  setWarningAll(value: boolean) {
    this.warningAllSubject.next(value);
  }

  setModalSuichPst(value: boolean) {
    this.modalsuichpstSubject.next(value);
  }
  setWarning(value: boolean) {
    this.warningSubject.next(value);
  }
  setModalSuichMuni(value: boolean) {
    this.modalsuichmuniSubject.next(value);
  }

  setValue(value: string) {
    this.valueSource.next(value);
  }

  setModalSuichAtrac(value: boolean) {
    this.modalsuichatracSubject.next(value);
  }
  setModalSuichRutas(value: boolean) {
    this.modalsuichrutasSubject.next(value);
  }
  setModalSuichTodo(value: boolean) {
    this.modalsuichtodoSubject.next(value);
  }

  setData(value: boolean) {
    this.modaldataSubject.next(value);
  }

  setProfileHeader(value: boolean) {
    this.modalPFHeaderSubject.next(value);
  }

  setTurnMuni(value: boolean) {
    this.modalTurnMuniSubject.next(value);
  }

  toggleServicioGastronomico(servicio: string): void {
    if (this.serviciosGastronomia.has(servicio)) {
      this.serviciosGastronomia.delete(servicio);
    } else {
      this.serviciosGastronomia.add(servicio);
    }
    this.serviciosSubject.next(this.serviciosGastronomia);
  }

  obtenerServiciosGastronomia(): Observable<Set<string>> {
    return this.serviciosSubject.asObservable();
  }

  navigateToContact() {
    this.router.navigateByUrl('/home').then(() => {
      const element = document.getElementById('contacto');

      if (element) {
        setTimeout(() => { element.scrollIntoView({ behavior: 'smooth' });}, 0);

      }
    });
  }

}
