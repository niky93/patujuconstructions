const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const closeButton = document.querySelector(".lightbox-close");

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
