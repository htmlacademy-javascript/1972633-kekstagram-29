import { someCreateDescription } from './data.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureItemTemplate = pictureTemplate.querySelector('.picture');
const picturesUser = someCreateDescription();
const picturesListFragment = document.createDocumentFragment();

picturesUser.forEach((picture) => {
  const pictureItem = pictureItemTemplate.cloneNode(true);
  const pictureImg = pictureItem.querySelector('.picture__img');
  pictureImg.src = picture.url;
  pictureImg.alt = picture.description;
  const pictureComments = pictureItem.querySelector('.picture__comments');
  pictureComments.textContent = picture.comments.length;
  const pictureLikes = pictureItem.querySelector('.picture__likes');
  pictureLikes.textContent = picture.likes;
  picturesListFragment.append(pictureItem);
});

picturesList.append(picturesListFragment);
