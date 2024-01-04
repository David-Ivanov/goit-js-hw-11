'use strict'
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";

const form = document.querySelector("form");
const imagesContainer = document.querySelector(".images");


let gallery = new SimpleLightbox(".images a", {
    captionsData: 'alt',
    captionDelay: 250
});

form.addEventListener('submit', event => {
    event.preventDefault();

    imagesContainer.innerHTML = `
    <li>
        <span class="loader"></span>
    </li>`

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
});



const innerImages = images => {
    if (images.hits.length === 0) throw new Error(images.status);
    imagesContainer.innerHTML = images.hits.reduce((html, { largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => html + `
    <li class="img">
       <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}"></a>
      <ul class="img-info">
        <li class="img-info-item"><span>Likes</span> ${likes}</li>
        <li class="img-info-item"><span>Views</span> ${views}</li>
        <li class="img-info-item"><span>Comments</span> ${comments}</li>
        <li class="img-info-item"><span>Downloads</span> ${downloads}</li>
      </ul>
    </li>`, '');

    gallery.refresh();
}

const showError = () => {
    iziToast.show({
        message: `Sorry, there are no images matching your search query. Please try again!`,
        maxWidth: 432,
        iconUrl: './images/error-icon.svg',
        iconColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        messageColor: '#FFFFFF',
        position: 'topRight'
    });
    imagesContainer.innerHTML = '';
}


