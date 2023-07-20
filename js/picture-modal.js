import { isEscapeKey } from './util.js';


import { getData } from './api.js';
import { showAlert } from './util.js';
// import { picturesArray } from './picture.js';
const COMMENTS_AMOUNT = 5;
const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const userImg = bigPicture.querySelector('.big-picture__img img');
const userCommentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const likeCount = document.querySelector('.likes-count');

const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let commentsShowArray = [];

const createPictureComments = (comments) => {
  comments.forEach((comment) => {
    const element = document.createElement('li');
    const img = document.createElement('img');
    const text = document.createElement('p');
    element.classList.add('social__comment');
    img.classList.add('social__picture');
    text.classList.add('social__text');
    img.src = comment.avatar;
    img.alt = comment.name;
    text.textContent = comment.message;
    element.append(img);
    element.append(text);
    socialComments.append(element);
  });
};

const renderComments = (comments) => {
  const showFirstComments = comments.slice(0, COMMENTS_AMOUNT);
  createPictureComments(showFirstComments);
  socialCommentCount.textContent = `${showFirstComments.length} из ${comments.length} комментариев`;
  if (showFirstComments.length >= comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const clearComments = () => {
  socialComments.innerHTML = '';
};

const onCommentsLoaderClick = () => {
  if (!commentsShowArray.length) {
    return;
  }
  const addedComments = commentsShowArray.slice(socialComments.children.length, socialComments.children.length + COMMENTS_AMOUNT);
  createPictureComments(addedComments);
  socialCommentCount.textContent =
    `${socialComments.children.length} из ${commentsShowArray.length} комментариев`;

  if (commentsShowArray.length <= socialComments.children.length) {
    commentsLoader.classList.add('hidden');
  }
};

const openModal = (picture) => {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  likeCount.textContent = picture.likes;
  userImg.src = picture.url;
  userCommentsCount.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;
  clearComments();
  commentsShowArray = picture.comments;
  renderComments(picture.comments);
  document.addEventListener('keydown', onDocumentKeydown);
  bigPicture.addEventListener('click', onPictureClose);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

const onPictureOpen = (evt) => {
  const element = evt.target.closest('.picture');
  if (element) {
    const numberId = Number(element.dataset.id);
    getData()
      .then((data) => {
        data.forEach((dat, index) => {
          if (dat.id === numberId) {
            openModal(data[index]);
          }
          evt.preventDefault();
        });
      }).catch((error) => {
        showAlert(error.message);
      });
  }
  // const element = evt.target.closest('.picture');
  // if (element) {
  //   const numberId = Number(element.dataset.id);
  //   picturesArray.forEach((data, index) => {
  //     if (data.id === numberId) {
  //       openModal(picturesArray[index]);
  //     }
  //     evt.preventDefault();
  //   });
  // }
};

function closeUserModal() {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPicture.removeEventListener('click', onPictureClose);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

function onPictureClose(evt) {
  const target = evt.target.closest('.big-picture__preview');
  if (evt.target.matches('button[type="reset"]') || !target) {
    closeUserModal();
  }
}

export { onPictureOpen };
export { body };
