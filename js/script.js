const img = document.querySelector('#random-gif');
const meaningContainer = document.querySelector('.meaning-container');
const emojiCells = document.querySelectorAll('.emoji-cell');

const getGif = (keyword) =>
  fetch(`https://api.giphy.com/v1/gifs/translate?api_key=qgD3y8UwPD8uqPX82ko6ybTwtlgO8Efm&s=${keyword}`, {
    mode: 'cors',
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      img.src = response.data.images.original.url;
    })
    .catch(function (error) {
      img.src = 'img/error.gif';
      console.log(error);
    });

emojiCells.forEach((emoji) => {
  emoji.addEventListener('click', () => {
    const emotion = emoji.id;
    const otherActiveMarker = document.querySelector('.active-marker');
    const thisActiveMarker = document.querySelector(`#${emotion} .inactive-marker`);

    if (otherActiveMarker) {
      otherActiveMarker.classList.add('inactive-marker');
      otherActiveMarker.classList.remove('active-marker');
    }

    thisActiveMarker.classList.add('active-marker');
    thisActiveMarker.classList.remove('inactive-marker');
    meaningContainer.textContent = `"${emotion}"`;
    getGif(emotion);
  });
});
