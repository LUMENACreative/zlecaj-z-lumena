/* ============================================
   LUMENA — ZLECAJ z LUMENA
   main.js — interakcje i animacje
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------
     1. Animacja licznika statystyk
  --------------------------------*/
  const counters = document.querySelectorAll('.number');
  const speed = 80; // większa liczba = wolniejsza animacja

  const animateCounters = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          const updateCount = () => {
            const target = +counter.getAttribute('data-target') || +counter.innerText;
            const count = +counter.innerText;
            const increment = Math.ceil(target / speed);

            if (count < target) {
              counter.innerText = count + increment;
              setTimeout(updateCount, 30);
            } else {
              counter.innerText = target.toLocaleString('pl-PL');
            }
          };
          updateCount();
        });
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(animateCounters, { threshold: 0.4 });
  const statsSection = document.querySelector('.stats');
  if (statsSection) observer.observe(statsSection);


  /* -------------------------------
     2. Efekt fade-in przy przewijaniu
  --------------------------------*/
  const fadeElements = document.querySelectorAll('section, .step, .cat-card');

  const fadeInOnScroll = (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  };

  const fadeObserver = new IntersectionObserver(fadeInOnScroll, {
    threshold: 0.2
  });

  fadeElements.forEach(el => {
    el.classList.add('fade');
    fadeObserver.observe(el);
  });


  /* -------------------------------
     3. Płynne przewijanie dla linków (#)
  --------------------------------*/
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});


/* ============================================
   LUMENA — dynamiczne dodawanie ofert + scroll
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  const offerForm = document.querySelector(".offer-form");
  const offersList = document.querySelector(".offers-list");

  if (!offerForm || !offersList) return;

  offerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Pobierz dane z formularza
    const firma = offerForm.querySelector("#firma").value.trim();
    const kwota = offerForm.querySelector("#kwota").value.trim();
    const opis = offerForm.querySelector("#opis").value.trim();

    if (!firma || !kwota || !opis) {
      alert("Uzupełnij wszystkie pola, aby złożyć ofertę 💎");
      return;
    }

    // Utwórz nowy element oferty
    const newOffer = document.createElement("div");
    newOffer.classList.add("offer-card", "fade", "highlight");
    newOffer.innerHTML = `
      <h3>${firma}</h3>
      <p><strong>Kwota:</strong> ${kwota} PLN</p>
      <p>${opis}</p>
      <a href="/pages/profil-firmy.html" class="cta small">Zobacz profil firmy</a>
    `;

    // Dodaj ofertę NA GÓRĘ listy
    offersList.prepend(newOffer);

    // Efekt fade-in
    setTimeout(() => {
      newOffer.classList.add("visible");
    }, 100);

    // Płynne przewinięcie do nowej oferty (centrum ekranu)
    setTimeout(() => {
      newOffer.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 600);

    // Efekt złotego podświetlenia (zniknie po 2,5 sek.)
    setTimeout(() => {
      newOffer.classList.remove("highlight");
    }, 2500);

    // Wyczyść formularz
    offerForm.reset();

    // Potwierdzenie (bez dźwięków)
    alert("Twoja oferta została dodana ✨");
  });
});
