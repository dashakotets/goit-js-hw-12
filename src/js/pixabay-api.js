import axios from 'axios';

// axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchPhotos = (searchedPhotos, page) => {
    const axiosOptions = {
        params: {key: '45683137-9da9ef345b4290ae910ded200',
        q: searchedPhotos,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
        },
        
    };

    return axios.get(`https://pixabay.com/api/`, axiosOptions);
};

