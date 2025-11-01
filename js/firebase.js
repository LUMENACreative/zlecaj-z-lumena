// js/firebase.js

// Import z CDN (działa bez Node i bez bundlera)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Twoja konfiguracja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDgAH3j1FBQmPkCqH7VG9vwhX1q82NkN0",
  authDomain: "zlecaj-z-lumena.firebaseapp.com",
  projectId: "zlecaj-z-lumena",
  storageBucket: "zlecaj-z-lumena.firebasestorage.app",
  messagingSenderId: "46650398157",
  appId: "1:46650398157:web:cd4d90782bb3039b8ce354",
  measurementId: "G-W8TCWBDERY"
};

// Inicjalizacja aplikacji
const app = initializeApp(firebaseConfig);

// Eksport modułów
export const auth = getAuth(app);
export const db = getFirestore(app);
