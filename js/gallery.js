import { openModal } from './picture-modal.js';
import { renderPictures } from './picture.js';

const pictureContainer = document.querySelector('.pictures');
let picturesList = [];

const renderBigPicture = (evt) => {
  const element = evt.target.closest('.picture');
  if (!element) {
    return;
  }
  const picture = picturesList.find((item) => item.id === Number(element.dataset.id));
  openModal(picture);
  evt.preventDefault();
};

const getGallery = (pictures) => {
  picturesList = pictures;
  pictureContainer.querySelectorAll('.picture').forEach((element) => element.remove());
  pictureContainer.addEventListener('click',renderBigPicture);
  renderPictures(pictures);
};

export { getGallery };
