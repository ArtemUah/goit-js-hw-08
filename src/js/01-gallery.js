// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
import "simplelightbox/dist/simple-lightbox.min.css";
import "simplelightbox/dist/simple-lightbox.js";
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector(".gallery");


const galleryMarkup = galleryItems
  .map((item) => {
    return `
  <a class="gallery__item" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      alt="${item.description}"
    />
  </a>
    `;
  })
  .join("");

gallery.innerHTML = galleryMarkup;

new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
  widthRatio: 0.5,
  heightRatio: 0.5,
  overlayOpacity: 0.5,
  showCounter: false,
});
