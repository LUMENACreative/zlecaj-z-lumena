// 🔥 firebase-storage-test.js — test połączenia ze Storage
import { storage } from "./firebase.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-storage.js";

async function testStorageUpload() {
  try {
    // Tworzymy testowy plik (tekst jako blob)
    const blob = new Blob(["Testowy plik z LUMENA"], { type: "text/plain" });

    // Ścieżka w Storage
    const storageRef = ref(storage, "testy/testowy-plik.txt");

    // Upload
    await uploadBytes(storageRef, blob);
    console.log("✅ Plik wysłany do Firebase Storage");

    // Pobranie URL
    const url = await getDownloadURL(storageRef);
    console.log("📎 Publiczny link:", url);
    alert("Firebase Storage działa! Zobacz link w konsoli.");
  } catch (error) {
    console.error("❌ Błąd Storage:", error);
    alert("Nie udało się połączyć z Firebase Storage.");
  }
}

testStorageUpload();
