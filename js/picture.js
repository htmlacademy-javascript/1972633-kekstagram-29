import { someCreateDescription } from './data.js';

const picturesArrey = someCreateDescription();
const pictureTemplate = document.querySelector('#picture').content;
const picturesListFragment = document.createDocumentFragment();

picturesArrey.forEach((picture) => {
  const pictureItemTemplate = pictureTemplate.querySelector('.picture');
  const pictureItem = pictureItemTemplate.cloneNode(true);
  const pictureImg = pictureItem.querySelector('.picture__img');
  const pictureComments = pictureItem.querySelector('.picture__comments');
  const pictureLikes = pictureItem.querySelector('.picture__likes');

  pictureImg.src = picture.url;
  pictureImg.alt = picture.description;
  pictureComments.textContent = picture.comments.length;
  pictureLikes.textContent = picture.likes;
  picturesListFragment.append(pictureItem);
});
export { picturesListFragment };
