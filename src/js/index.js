'use strict'
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";

const form = document.querySelector("form");
const imagesContainer = document.querySelector(".images");


const gallery = new SimpleLightbox(".images .img", {
    closeText: `<svg class="close-btn">
        <use href="./img/close.svg"></use>
</svg>`,
    navText: [`<svg class="arrow-btn">
        <use href="./img/arrow-left.svg"></use>
</svg>`,
        `<svg class="arrow-btn">
        <use href="./img/arrow-right.svg"></use>
</svg>`],
    captionsData: 'alt',
    captionDelay: 250
});

form.addEventListener('submit', event => {
    event.preventDefault();



    const value = event.target.elements.search.value;

    const urlParams = new URLSearchParams({
        key: '41610080-031e2cebad3f84a1c0bee486b',
        q: value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    });


    fetch(`https://pixabay.com/api?${urlParams}`)
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })
        .then(innerImages)
        .catch(showError);

    event.target.elements.search.value = '';

    gallery.refresh();
});



const innerImages = images => {
    imagesContainer.innerHTML = images.hits.reduce((html, { largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => html + `
    <li class="img">
       <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}"></a>
      <ul class="img-info">
        <li class="img-info-item">Likes ${likes}</li>
        <li class="img-info-item">Views ${views}</li>
        <li class="img-info-item">Comments ${comments}</li>
        <li class="img-info-item">Downloads ${downloads}</li>
      </ul>
    </li>`, '');
}

const showError = () => {
    iziToast.show({
        message: `Sorry, there are no images matching your search query. Please try again!`,
        maxWidth: 432,
        iconUrl: './src/images/error-icon.svg',
        iconColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        messageColor: '#FFFFFF',
        position: 'topRight'
    });
}





