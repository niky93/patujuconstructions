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
