import { openModal } from './picture-modal.js';
import { renderPictures } from './picture.js';

const pictureContainer = document.querySelector('.pictures');

const renderBigPicture = (evt, pictures) => {
  const element = evt.target.closest('.picture');
  if (!element) {
    return;
  }
  const picture = pictures.find((item) => item.id === Number(element.dataset.id));
  openModal(picture);
  evt.preventDefault();
};

const getGallery = (pictures) => {
  pictureContainer.addEventListener('click', (evt) => {
    renderBigPicture(evt, pictures);
  });
  renderPictures(pictures);
};

export { getGallery };
