
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImages} from './js/pixabay-api';
import { imageTemplate } from './js/render-functions';

export const imgGallery = document.querySelector('.gallery');
export const formEl = document.querySelector('.form');

const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.load-btn');

export let startPage = 1;
let query;
let totalPages;
export let limitPage = 15;

function showLoader() {
    loader.classList.remove('is-hidden');
}

function hideLoader() {
    loader.classList.add('is-hidden');
}

//---------------------

formEl.addEventListener('submit', inputValue);
async function inputValue(e) {
    e.preventDefault();
    imgGallery.innerHTML = '';
    startPage = 1;
    query = e.currentTarget.elements.image.value.trim();
    showLoader();
    if (query === '') {
        iziToast.warning({
                maxWidth: '432px',
                height: '48px',
                color: 'yellow',
                position: 'topRight',
                message: 'Please fill in the field for search!',
        })
        return;
    }
    try {
        const data = await getImages(query, startPage)
        if (data.hits.length === 0) {
           iziToast.error({
                maxWidth: '432px',
                height: '48px',
                color: 'red',
                position: 'topRight',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            }) 
        }
        totalPages = Math.ceil(data.totalHits / limitPage);
        imageTemplate(data.hits);
        e.target.reset();
    } catch (error) {
        console.log(error);
            iziToast.error({
                maxWidth: '432px',
                height: '48px',
                color: 'red',
                position: 'topRight',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            })
    }
    btnLoadMore();
    hideLoader();
    e.target.reset();
}
    
//---------------------Load More btn

function removeLoadBtn() {
    loadBtn.classList.remove("is-hidden");
}

function addLoadBtn() {
    loadBtn.classList.add("is-hidden");
}

function btnLoadMore() {
    if (startPage >= totalPages) {
        addLoadBtn();
    } else {
        removeLoadBtn();
    }
}

function scroll() {
    const position = imgGallery.firstElementChild.getBoundingClientRect().height;
    scrollBy({
        top: position,
        behavior: 'smooth',
    });
}

//---------------------

loadBtn.addEventListener('click', clickRequest);

async function clickRequest() {
    startPage += 1;
    showLoader();
    try {
        const data = await getImages(query, startPage);
        imageTemplate(data.hits);
        if (startPage >= totalPages) {
            addLoadBtn();
            iziToast.info({
                title: 'Info',
                position: 'topRight',
                message: 'We are sorry, but you have reached the end of search results.',
            })
        }
    } catch (error) {
        console.log(error);
        iziToast.info({
                title: 'Info',
                position: 'topRight',
                message: 'We are sorry, but you have reached the end of search results.',
            })
    }
    scroll();
    btnLoadMore();
    hideLoader();
}




