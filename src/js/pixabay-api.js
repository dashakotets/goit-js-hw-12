import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export const fetchPhotos = searchedPhotos => {
    const urlParams = new URLSearchParams({
        key: '45683137-9da9ef345b4290ae910ded200',
        q: searchedPhotos,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    });

    return fetch(`${BASE_URL}?${urlParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            };
            return response.json();
        });
};

//element.classList.toggle(className)