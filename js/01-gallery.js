import { galleryItems } from "./gallery-items.js";

const galleryList = document.querySelector(".gallery");
const galleryMarkup = createGalleryCardsMarkup(galleryItems);

galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

function createGalleryCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
    })
    .join("");
}

galleryList.addEventListener("click", onClick);

function onClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const selectedImageUrl = event.target.dataset.source;

  const instance = basicLightbox.create(
    `
    <img src='${selectedImageUrl}' width="800" height="600">
`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", closeImg);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", closeImg);
      },
    }
  );
  instance.show();

  function closeImg(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
}
