import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchPhotos } from "./js/pixabay-api";
import { createGalleryCardTemplate } from "./js/render-functions";

const searchForm = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.js-load-more');


let currentPage = 1;

const lightbox = new SimpleLightbox('.gallery a', {
                captions: true, 
                captionDelay: 250, 
                captionPosition: 'bottom',
});
            
const onSearchSubmit = async event => {
    try {
    event.preventDefault();
    const searchedValue = searchForm.elements.user_query.value;

    currentPage = 1;
        
    loaderEl.classList.toggle('is-hidden');
        const response = await fetchPhotos(searchedValue, currentPage);
        console.log(response);
    loaderEl.classList.toggle('is-hidden');
        
    if (response.data.hits.length === 0) {
        iziToast.error({
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
            });

        galleryEl.innerHTML = '';
        searchForm.reset();
        return;
    };

    const galleryCardsTemplate = response.data.hits.map(imgDetails => createGalleryCardTemplate(imgDetails)).join('');

    galleryEl.innerHTML = galleryCardsTemplate;

    lightbox.refresh();
    loadMoreBtn.classList.remove('is-hidden');
    } catch (err){
        iziToast.error({
                message: err,
                position: 'topRight',
            });
    };
    
};

const onAddMoreBtn = async event => {
    try {
        currentPage++;
    
        loaderEl.classList.toggle('is-hidden');
        const response = await fetchPhotos(searchedValue, currentPage);
        loaderEl.classList.toggle('is-hidden');

        const galleryCardsTemplate = response.data.hits.map(imgDetails => createGalleryCardTemplate(imgDetails)).join('');
        
        galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate);

        if (currentPage === response.data.totalHits) {
            loadMoreBtn.classList.add('is-hidden');
        }

    } catch (err) {
        iziToast.error({
                message: err,
                position: 'topRight',
            });
    }
};

searchForm.addEventListener('submit', onSearchSubmit);
loadMoreBtn.addEventListener('click', onAddMoreBtn);