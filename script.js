const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const closeButton = document.querySelector(".lightbox-close");

document.body.classList.add("js-ready");

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

document.querySelectorAll(".gallery-card").forEach((card) => {
  card.addEventListener("click", () => {
    const image = card.dataset.full;
    const alt = card.querySelector("img").alt;
    lightboxImage.src = image;
    lightboxImage.alt = alt;
    lightbox.hidden = false;
  });
});

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
}

closeButton.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});

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
