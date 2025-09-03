import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// Firebase importok
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAGkXm4BwWon1s-fAzCoIiyVj_DT1saZk0",
  authDomain: "learnenglish-8fac0.firebaseapp.com",
  databaseURL: "https://learnenglish-8fac0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "learnenglish-8fac0",
  storageBucket: "learnenglish-8fac0.firebasestorage.app",
  messagingSenderId: "121433128411",
  appId: "1:121433128411:web:2597bee0ca242e025c7bfe",
  measurementId: "G-XXVDLTQHK1"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
