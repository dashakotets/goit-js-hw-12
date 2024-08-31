import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchPhotos } from "./js/pixabay-api";
import { createGalleryCardTemplate } from "./js/render-functions";

const searchForm = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.loader');


const lightbox = new SimpleLightbox('.gallery a', {
                captions: true, 
                captionDelay: 250, 
                captionPosition: 'bottom',
});
            
const onSearchSubmit = event => {
    event.preventDefault();
    const searchedValue = searchForm.elements.user_query.value;


    loaderEl.classList.toggle('is-hidden');
    fetchPhotos(searchedValue)
        .then(data => {
            loaderEl.classList.toggle('is-hidden');
            if (data.hits.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                });

                galleryEl.innerHTML = '';
                

                return;
            };

            const galleryCardsTemplate = data.hits.map(imgDetails => createGalleryCardTemplate(imgDetails)).join('');

            galleryEl.innerHTML = galleryCardsTemplate;

            lightbox.refresh();
        })
        .catch(err => {
            iziToast.error({
                    message: err,
                    position: 'topRight',
                });
        })
        .finally(() => {
            searchForm.reset();
        });
    
};

searchForm.addEventListener('submit', onSearchSubmit);