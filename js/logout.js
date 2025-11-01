// logout.js
// Wylogowanie użytkownika — ZLECAJ z LUMENA
// Autor: LUMENA Creative / Arek 💎

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.querySelector("#logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Usuń dane logowania
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userType");

      // Potwierdzenie i przekierowanie
      alert("Zostałeś wylogowany.");
      window.location.href = "/pages/login.html";
    });
  }
});
