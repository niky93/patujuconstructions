const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const closeButton = document.querySelector(".lightbox-close");
const previousButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");
const lightboxCounter = document.querySelector(".lightbox-counter");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");

document.body.classList.add("js-ready");

function syncHeader() {
  if (!siteHeader) return;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 18);
}

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

if (siteHeader && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    siteHeader.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      siteHeader.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    });
  });
}

const revealItems = document.querySelectorAll(
  ".hero-content, .hero-panel, .house-hero-content, .house-summary, .reveal-row, .reveal-card"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (lightbox && lightboxImage) {
  const galleryCards = Array.from(document.querySelectorAll(".gallery-card"));
  let currentImageIndex = 0;
  let lastFocusedCard = null;

  function showImage(index) {
    currentImageIndex = (index + galleryCards.length) % galleryCards.length;
    const card = galleryCards[currentImageIndex];
    const image = card.dataset.full;
    const alt = card.querySelector("img").alt;
    lightboxImage.src = image;
    lightboxImage.alt = alt;
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryCards.length}`;
    }
  }

  galleryCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      lastFocusedCard = card;
      showImage(index);
      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");
      closeButton?.focus();
    });
  });

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImage.src = "";
    document.body.classList.remove("lightbox-open");
    lastFocusedCard?.focus();
  }

  closeButton?.addEventListener("click", closeLightbox);
  previousButton?.addEventListener("click", () => showImage(currentImageIndex - 1));
  nextButton?.addEventListener("click", () => showImage(currentImageIndex + 1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
    if (event.key === "ArrowLeft" && !lightbox.hidden) {
      showImage(currentImageIndex - 1);
    }
    if (event.key === "ArrowRight" && !lightbox.hidden) {
      showImage(currentImageIndex + 1);
    }
  });
}

const whatsappForm = document.querySelector("#whatsapp-form");

if (whatsappForm) {
  whatsappForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(whatsappForm);
    const message = [
      "Hola, quiero recibir informacion sobre Yvaga Homes.",
      "",
      `Nombre: ${formData.get("name") || ""}`,
      `Telefono: ${formData.get("phone") || ""}`,
      `Correo: ${formData.get("email") || ""}`,
      `Ciudad o zona: ${formData.get("location") || ""}`,
      `Lote: ${formData.get("lot") || ""}`,
      `Presupuesto: ${formData.get("budget") || ""}`,
      `Mensaje: ${formData.get("message") || ""}`
    ].join("\n");

    const whatsappUrl = `https://wa.me/59168681141?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}
