import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const galleryList = document.querySelector(".gallery");
const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
});

export async function imageTemplate(images) {
    const galeryMarkup = images.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
      return `<li class="gallery-item">
            <a class="gallery-link" href ="${largeImageURL}">
                <img loding="lazy"
                class="gallery-image"
                width="1280" height="152"
                src="${webformatURL}"
                data-source="${largeImageURL}"
                alt="${tags}" /></a>
            <ul class="gallery-description">
                <li><h3>Likes</h3><p>${likes}</p></li>
                <li><h3>Views</h3><p>${views}</p></li>
                <li><h3>Comments</h3><p>${comments}</p></li>
                <li><h3>Downloads</h3><p>${downloads}</p></li>
            </ul>
        </li>`})
    .join('');
    galleryList.insertAdjacentHTML('beforeend', galeryMarkup);

    lightbox.refresh();
}