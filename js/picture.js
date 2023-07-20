// import { someCreateDescription } from './data.js';

import { getData } from './api.js';
import { showAlert } from './util.js';


// const picturesArray = someCreateDescription();
const pictureTemplate = document.querySelector('#picture').content;
const picturesListFragment = document.createDocumentFragment();

const createItem = (item) =>{
  const pictureItemTemplate = pictureTemplate.querySelector('.picture');
  const pictureItem = pictureItemTemplate.cloneNode(true);
  const pictureImg = pictureItem.querySelector('.picture__img');
  const pictureComments = pictureItem.querySelector('.picture__comments');
  const pictureLikes = pictureItem.querySelector('.picture__likes');

  pictureImg.src = item.url;
  pictureImg.alt = item.description;
  pictureComments.textContent = item.comments.length;
  pictureLikes.textContent = item.likes;
  pictureItem.dataset.id = item.id;
  return pictureItem;
};

// picturesArray.forEach((picture) => {
//   picturesListFragment.append(createItem(picture));
// });

// export { picturesListFragment };
// export { picturesArray };
const renderPictures = () => {
  getData()
    .then((data) => {
      data.forEach((picture) => {
        picturesListFragment.append(createItem(picture));
      });
      const picturesList = document.querySelector('.pictures');
      picturesList.append(picturesListFragment);
    }).catch((error) => {
      showAlert(error.message);
    });
};

export { picturesListFragment };
export { renderPictures };
