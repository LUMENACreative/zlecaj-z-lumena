// 🔥 firebase-test.js — test połączenia i zapisu do Firestore
import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

async function testFirestore() {
  try {
    const docRef = await addDoc(collection(db, "firmy"), {
      nazwa: "Testowa firma z kodu",
      miasto: "Warszawa",
      branża: "Remonty i wykończenia",
      data: new Date().toISOString()
    });
    console.log("✅ Dokument zapisany z ID:", docRef.id);
    alert("Firebase działa! Dokument został zapisany w kolekcji 'firmy'.");
  } catch (e) {
    console.error("❌ Błąd zapisu:", e);
    alert("Błąd połączenia z Firebase. Sprawdź konsolę (F12).");
  }
}

testFirestore();
import { storage } from "./firebase.js";
console.log("🔗 Połączenie ze Storage:", storage);
