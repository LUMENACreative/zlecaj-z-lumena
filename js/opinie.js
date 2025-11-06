// 💎 opinie.js — obsługa opinii klientów dla firm
// Autor: LUMENA Creative

import { db } from "/js/firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// 🔹 Pobieranie danych użytkownika
const userEmail = localStorage.getItem("userEmail");
const userType = localStorage.getItem("userType");
const firmId = new URLSearchParams(window.location.search).get("id");

// 🔹 Elementy interfejsu
const opinieList = document.getElementById("opinieList");
const opinieAuthInfo = document.getElementById("opinieAuthInfo");
const addOpinionBox = document.getElementById("addOpinionBox");
const submitBtn = document.getElementById("submitOpinion");
const opinionText = document.getElementById("opiniaText");
const ratingContainer = document.getElementById("ratingStars");
const avgRatingEl = document.getElementById("avgRating");

// 🟡 Ikony diamentów (złote i szare)
const diamondFilled = "💎";
const diamondEmpty = "◇";

let currentRating = 0;
let editingOpinionId = null;

// 🔸 Pokazujemy formularz tylko zalogowanym klientom
if (userType === "client" && userEmail) {
  addOpinionBox.style.display = "block";
} else {
  opinieAuthInfo.style.display = "block";
}

// 🔹 Generowanie interaktywnych diamentów
function renderRatingInput(selected = 0) {
  ratingContainer.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const span = document.createElement("span");
    span.textContent = i <= selected ? diamondFilled : diamondEmpty;
    span.classList.add("diamond");
    span.dataset.value = i;
    span.style.fontSize = "26px";
    span.style.cursor = "pointer";
    span.style.marginRight = "5px";
    span.addEventListener("click", () => {
      currentRating = i;
      renderRatingInput(i);
    });
    ratingContainer.appendChild(span);
  }
}
renderRatingInput();

// 🔹 Dodawanie nowej opinii
submitBtn.addEventListener("click", async () => {
  const text = opinionText.value.trim();

  if (!text || currentRating === 0) {
    alert("Wybierz liczbę diamentów i wpisz treść opinii 💎");
    return;
  }

  try {
    if (editingOpinionId) {
      // ✏️ Aktualizacja istniejącej opinii
      const docRef = doc(db, "opinie", editingOpinionId);
      await updateDoc(docRef, {
        tresc: text,
        ocena: currentRating,
        updatedAt: serverTimestamp(),
      });
      alert("Twoja opinia została zaktualizowana 💎");
      editingOpinionId = null;
      submitBtn.textContent = "Dodaj opinię";
    } else {
      // 🆕 Dodanie nowej opinii
      await addDoc(collection(db, "opinie"), {
        firmId,
        autorEmail: userEmail,
        tresc: text,
        ocena: currentRating,
        createdAt: serverTimestamp(),
      });
      alert("Dziękujemy za opinię 💎");
    }

    opinionText.value = "";
    currentRating = 0;
    renderRatingInput();
    loadOpinions();
  } catch (err) {
    console.error("❌ Błąd przy zapisie opinii:", err);
    alert("Wystąpił błąd przy dodawaniu opinii.");
  }
});

// 🔹 Wczytywanie opinii z Firestore
async function loadOpinions() {
  try {
    const q = query(
      collection(db, "opinie"),
      where("firmId", "==", firmId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    opinieList.innerHTML = "";

    if (snapshot.empty) {
      opinieList.innerHTML = "<p>Brak opinii. Bądź pierwszym, który ją doda 💎</p>";
      avgRatingEl.textContent = "";
      return;
    }

    let total = 0;
    let count = 0;

    snapshot.forEach((docSnap) => {
      const o = docSnap.data();
      const div = document.createElement("div");
      div.classList.add("opinia-card");

      const isAuthor = o.autorEmail === userEmail;
      const formattedDate = o.createdAt?.toDate
        ? o.createdAt.toDate().toLocaleDateString("pl-PL")
        : "";

      total += o.ocena || 0;
      count++;

      // Generowanie diamentów
      let diamonds = "";
      for (let i = 1; i <= 5; i++) {
        diamonds += i <= o.ocena ? diamondFilled : diamondEmpty;
      }

      div.innerHTML = `
        <div class="opinia-header">
          <span class="autor">${o.autorEmail || "Anonim"}</span>
          <span class="ocena">${diamonds}</span>
        </div>
        <p class="tresc">${o.tresc}</p>
        <p class="meta">${formattedDate}</p>
        ${
          isAuthor
            ? `<div class="opinia-actions">
                <button class="cta small edit" data-id="${docSnap.id}">Edytuj</button>
                <button class="cta small secondary delete" data-id="${docSnap.id}">Usuń</button>
              </div>`
            : ""
        }
      `;

      opinieList.appendChild(div);
    });

    // 🔸 Oblicz i pokaż średnią ocenę
    const avg = (total / count).toFixed(1);
    avgRatingEl.innerHTML = `${generateDiamonds(avg)} <span style="color:#f7d6d0;font-size:0.9rem;">(${avg})</span>`;
  } catch (err) {
    console.error("❌ Błąd wczytywania opinii:", err);
    opinieList.innerHTML = "<p>Wystąpił problem z wczytaniem opinii.</p>";
  }
}

// 🔹 Edycja / usuwanie opinii
opinieList.addEventListener("click", async (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.classList.contains("edit")) {
    const card = e.target.closest(".opinia-card");
    const text = card.querySelector(".tresc").textContent;
    const ocena = card.querySelector(".ocena").textContent.split("").filter(d => d === "💎").length;

    opinionText.value = text;
    currentRating = ocena;
    renderRatingInput(ocena);
    editingOpinionId = id;
    submitBtn.textContent = "Zapisz zmiany";
  }

  if (e.target.classList.contains("delete")) {
    if (confirm("Czy na pewno chcesz usunąć tę opinię?")) {
      try {
        await deleteDoc(doc(db, "opinie", id));
        alert("Opinia została usunięta 🗑️");
        loadOpinions();
      } catch (err) {
        console.error("Błąd usuwania opinii:", err);
        alert("Nie udało się usunąć opinii.");
      }
    }
  }
});

// 🔹 Pomocnicza — generowanie diamentów dla średniej
function generateDiamonds(avg) {
  const full = Math.floor(avg);
  const half = avg % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "💎".repeat(full) + "◇".repeat(empty);
}

// 🔹 Inicjalizacja
loadOpinions();

/* === STYLIZACJA OPINII (mini CSS) === */
const style = document.createElement("style");
style.textContent = `
  .opinie-section { margin-top: 70px; }
  .opinie-section h2 { color: var(--gold); margin-bottom: 25px; }
  .add-opinion-box { background:#111; padding:25px; border-radius:12px; margin-bottom:30px; }
  .add-opinion-box h3 { color:var(--gold); margin-bottom:10px; }
  .add-opinion-box textarea {
    width:100%; min-height:90px; background:#0f0f0f; color:#fff;
    border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:12px; margin-top:10px;
  }
  .opinie-actions { text-align:right; margin-top:10px; }
  .opinia-card {
    background:#1a1a1a; border:1px solid rgba(255,255,255,0.08);
    border-radius:12px; padding:18px 20px; margin-bottom:20px;
  }
  .opinia-card .autor { color:var(--gold); font-weight:600; }
  .opinia-card .ocena { color:var(--gold); font-size:1.2rem; }
  .opinia-card .tresc { color:#fff; margin:10px 0; }
  .opinia-card .meta { color:#aaa; font-size:0.85rem; }
  .opinia-actions button { font-size:0.8rem; margin-right:6px; }
  .avg-rating { color: var(--gold); font-size:1.1rem; vertical-align:middle; }
  .opinie-auth-info { text-align:center; color:#ccc; background:#111; padding:15px; border-radius:10px; margin-bottom:25px; }
`;
document.head.appendChild(style);
