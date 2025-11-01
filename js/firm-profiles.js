/* ============================================
   LUMENA — System profili firm (multi-profile)
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // Klucz w localStorage
  const FIRMS_KEY = "lumena_firms";

  // Pobierz ID firmy z adresu (jeśli istnieje)
  const params = new URLSearchParams(window.location.search);
  const firmId = params.get("id");

  // Pobierz dane z localStorage (wszystkie firmy)
  const firms = JSON.parse(localStorage.getItem(FIRMS_KEY) || "{}");

  /* ------------------------------------------------
     🔹 1. Jeśli nie ma firm — inicjalizujemy przykładową
  --------------------------------------------------- */
  if (Object.keys(firms).length === 0) {
    firms["golden-build"] = {
      name: "Golden Build Sp. z o.o.",
      branch: "Remonty i wykończenia wnętrz",
      location: "Warszawa, mazowieckie",
      about:
        "Specjalizujemy się w kompleksowych remontach mieszkań i domów. Oferujemy malowanie, układanie płytek, montaż mebli, prace hydrauliczne i elektryczne. Zrealizowaliśmy ponad 200 projektów w Warszawie i okolicach.",
      skills: [
        "🎨 Malowanie i tapetowanie",
        "🧱 Układanie płytek",
        "🔌 Instalacje elektryczne",
        "🚿 Remonty łazienek",
        "🪚 Montaż zabudowy meblowej"
      ],
      email: "kontakt@goldenbuild.pl",
      images: [
        "/image/realizacja1.jpg",
        "/image/realizacja2.jpg",
        "/image/realizacja3.jpg"
      ]
    };
    localStorage.setItem(FIRMS_KEY, JSON.stringify(firms));
  }

  /* ------------------------------------------------
     🔹 2. Jeśli nie ma ?id= w URL — używamy profilu edytowalnego
  --------------------------------------------------- */
  if (!firmId) {
    const firmData = JSON.parse(localStorage.getItem("lumena_firm_profile") || "{}");
    if (firmData.name) {
      // Po kliknięciu "Edytuj" zapisujemy też w bazie firm
      const id = firmData.name.toLowerCase().replace(/\s+/g, "-");
      firms[id] = firmData;
      localStorage.setItem(FIRMS_KEY, JSON.stringify(firms));
    }
    return;
  }

  /* ------------------------------------------------
     🔹 3. Tryb publicznego profilu (np. ?id=golden-build)
  --------------------------------------------------- */
  const firm = firms[firmId];
  if (!firm) {
    document.getElementById("firmName").textContent = "Firma nieznana";
    document.getElementById("firmAbout").textContent =
      "Ten profil jest niedostępny lub został usunięty.";
    document.getElementById("firmSkills").innerHTML = "<li>Brak danych</li>";
    return;
  }

  // Wstaw dane firmy
  document.getElementById("firmName").textContent = firm.name;
  document.getElementById("firmBranch").textContent = firm.branch;
  document.getElementById("firmLocation").textContent = firm.location;
  document.getElementById("firmAbout").textContent = firm.about;

  // Specjalizacje
  const skillsList = document.getElementById("firmSkills");
  skillsList.innerHTML = "";
  firm.skills.forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill;
    skillsList.appendChild(li);
  });

  // Jeśli ma e-mail, dodaj przycisk kontaktowy
  const contactBtn = document.querySelector(".cta.small");
  if (contactBtn && firm.email) {
    contactBtn.href = `mailto:${firm.email}`;
    contactBtn.textContent = "Napisz do firmy";
  }

  // Ukryj przycisk "Edytuj profil" dla widoku publicznego
  const editBtn = document.getElementById("editProfileBtn");
  if (editBtn) editBtn.style.display = "none";
});
