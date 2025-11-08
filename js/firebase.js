// 🔥 firebase.js — pełna konfiguracja (Auth + Firestore + Storage)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-storage.js";

// 🧩 Konfiguracja Twojego projektu Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDgaH3j1FKB0mPkCqH7VG9vwhX1q82NkR0",
  authDomain: "zlecaj-z-lumena.firebaseapp.com",
  projectId: "zlecaj-z-lumena",
  storageBucket: "zlecaj-z-lumena.appspot.com",
  messagingSenderId: "46650398157",
  appId: "1:46650398157:web:cd4d90782bb3039b8ce354",
  measurementId: "G-W8TCWBDE7Y"
};

// 🚀 Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// 🌍 Eksporty do użycia w innych plikach
export { app, db, auth, storage };
