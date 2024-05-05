import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { RouterModule } from '@angular/router';
import { AboutUsComponent } from './modules/about-us/about-us.component';
import { SharedModule } from "./shared/shared.module";


@NgModule({
    declarations: [
        AppComponent,

    ],
    bootstrap: [AppComponent],
    providers: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        SharedModule
    ]
})
export class AppModule {
}
