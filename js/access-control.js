// access-control.js
// Skrypt kontroli dostępu i logiki logowania
// Autor: Arek / LUMENA Creative

document.addEventListener("DOMContentLoaded", () => {
  const loggedIn = localStorage.getItem("loggedIn");
  const userType = localStorage.getItem("userType");
  const userEmail = localStorage.getItem("userEmail");

  // Zabezpieczenie paneli
  if (window.location.pathname.includes("panel-klient.html")) {
    if (!loggedIn || userType !== "client") {
      alert("Dostęp tylko dla zalogowanych klientów 💎");
      window.location.href = "/pages/login.html";
    }
  }

  if (window.location.pathname.includes("panel-firma.html")) {
    if (!loggedIn || userType !== "company") {
      alert("Dostęp tylko dla zalogowanych firm 💼");
      window.location.href = "/pages/login.html";
    }
  }

  // 🔒 PANEL ADMINA — dostęp tylko dla Arek (email)
  if (window.location.pathname.includes("panel-admin.html")) {
    if (
      !loggedIn ||
      userType !== "admin" ||
      userEmail !== "arkadiuszgruca41@gmail.com"
    ) {
      alert("Brak uprawnień do tej sekcji 🔐");
      window.location.href = "/pages/login.html";
    }
  }

  // Przycisk "Dodaj zlecenie"
  const addJobBtns = document.querySelectorAll("#addJobBtn, #addJobBtnHero");
  addJobBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!loggedIn) {
        alert("Musisz być zalogowany, aby dodać zlecenie 💎");
        window.location.href = "/pages/rejestracja.html";
      } else if (userType === "client") {
        window.location.href = "/pages/dodaj-zlecenie.html";
      } else {
        alert("Tylko klienci mogą dodawać zlecenia 💎");
      }
    });
  });

  // Przycisk "Przeglądaj zlecenia"
  const browseJobsBtn = document.querySelector("#browseJobsBtn");
  if (browseJobsBtn) {
    browseJobsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!loggedIn) {
        alert("Zaloguj się, aby przeglądać zlecenia 💼");
        window.location.href = "/pages/login.html";
      } else if (userType === "company") {
        window.location.href = "/pages/panel-firma.html";
      } else {
        alert("Tylko firmy mogą przeglądać zlecenia 💎");
      }
    });
  }

  // Opcjonalne: przycisk wylogowania
  const logoutBtn = document.querySelector("#logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Czy na pewno chcesz się wylogować?")) {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userType");
        localStorage.removeItem("userEmail");
        alert("Zostałeś wylogowany 💎");
        window.location.href = "/pages/login.html";
      }
    });
  }
});
