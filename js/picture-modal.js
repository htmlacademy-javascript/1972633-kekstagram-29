import { isEscapeKey } from './util.js';
import { picturesArray } from './picture.js';
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

let commentsShow = 0;

const createComment = (comment) => {
  const commentItem = document.createElement('li');
  const commenImg = document.createElement('img');
  const commenText = document.createElement('p');
  commentItem.classList.add('social__comment');
  commenImg.classList.add('social__picture');
  commenImg.src = comment.avatar;
  commenImg.alt = comment.name;
  commenText.textContent = comment.message;
  commentItem.appendChild(commenImg);
  commentItem.appendChild(commenText);
  socialComments.append(commentItem);
};

const renderComments = (comments) =>
  () => {
    commentsShow += COMMENTS_AMOUNT;
    socialCommentCount.textContent = `${commentsShow} из ${comments.length} комментариев`;
    socialCommentCount.hidden = true;
    commentsLoader.hidden = true;

    if (comments.length <= COMMENTS_AMOUNT) {
      for (let i = 0; i < comments.length; i++) {
        createComment(comments[i]);
      }
      return;
    }

    if (comments.length > commentsShow) {
      socialCommentCount.hidden = false;
      commentsLoader.hidden = false;
      for (let i = commentsShow - 5; i < commentsShow; i++) {
        createComment(comments[i]);
      }
    }

    if (comments.length <= commentsShow) {
      socialCommentCount.textContent = `${comments.length} из ${comments.length} комментариев`;
      socialCommentCount.hidden = true;
      commentsLoader.hidden = true;
      for (let i = commentsShow - 5; i < comments.length; i++) {
        createComment(comments[i]);
      }
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
  commentsShow = 0;
};

let totalComments = () => { };

function onCommentsLoaderClick() {
  totalComments();
}

const openModal = (picture) => {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  likeCount.textContent = picture.likes;
  userImg.src = picture.url;
  userCommentsCount.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;
  clearComments();
  totalComments = renderComments(picture.comments);
  totalComments();
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onPictureClose);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

function onPictureOpen(evt) {
  const element = evt.target.closest('.picture');
  if (element) {
    const numberId = Number(element.dataset.id);
    picturesArray.forEach((data, index) => {
      if (data.id === numberId) {
        openModal(picturesArray[index]);
      }
    });
  }
}


function closeUserModal() {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onPictureClose);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

function onPictureClose(evt) {
  const target = evt.target.closest('.big-picture__preview');
  if (evt.target.matches('button[type="reset"]') || !target) {
    closeUserModal();
  }
  // const target = evt.target;
  // if(!target.closest('.big-picture__preview') || target.closest('.cansel')){
  //   body.classList.remove('modal-open');
  //   bigPicture.classList.add('hidden');
  //   document.removeEventListener('click', onPictureClose);
  // }
}

export { onPictureOpen };
