const selectRef = document.querySelector('.breed-select');
const catContainer = document.querySelector('.cat-info');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');

selectRef.addEventListener('change', onSelectChange);

function onSelectChange(evt) {
  const breedId = evt.target.value;

  selectRef.classList.add('invisible');
  loaderRef.classList.remove('invisible');
  catContainer.innerHTML = '';

  fetchCatByBreed(breedId).then(data => {
    renderCatMarkup(data);
    selectRef.classList.remove('invisible');
    loaderRef.classList.add('invisible');
  });
}

fetchBreedsApi()
  .then(data => {
    selectRef.innerHTML = addOptionsMarkup(data);
    selectRef.classList.remove('invisible');
  })
  .catch(error => {
    errorRef.classList.remove('invisible');
  });

function fetchCatByBreed(id) {
  const API_KEY =
    'live_0nkiSG0Gw9kWB2rUfG8C3GrtCQBJQWhdc3yoMMZLod5gohPCRjgVNshBQsCOZ4zE';
  const BASE_URL = `https://api.thecatapi.com/v1/images/search?breed_ids=${id}&api_key=${API_KEY}`;

  return fetch(BASE_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(e => {
      console.log(e);
      errorRef.classList.remove('invisible');
    });
}

function fetchBreedsApi() {
  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
  const API_KEY =
    'live_0nkiSG0Gw9kWB2rUfG8C3GrtCQBJQWhdc3yoMMZLod5gohPCRjgVNshBQsCOZ4zE';

  return fetch(BASE_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(e => console.log(e));
}

function addOptionsMarkup(arr) {
  return arr
    .map(item => {
      return `<option value="${item.id}">${item.name}</option>`;
    })
    .join('');
  console.log(a);
}

function renderCatMarkup([data]) {
  return (catContainer.innerHTML = `<div class="cat-info-picture">
          <img src="${data.url}" alt="" width="450"></img>
        </div>
        <div class="cat-info-desc">
          <h2>${data.breeds[0].name}</h2>
          <p><h3>Temperaments:</h3> ${data.breeds[0].temperament}</p>
          <p><h3>Description:</h3>${data.breeds[0].description}</p>
        </div>`);
}
