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


// const usersPhoto = document.querySelectorAll('.picture');
// const picturesListFragment = document.createDocumentFragment();
// const socialComment = bigPicture.querySelectorAll('.social__comment');
// const socialPicture = socialComments.querySelector('.social__picture');
// const socialText = socialComments.querySelector('.social__text');
// const ArrayComments = picturesUser.map((item) => item.comments);
// console.log(ArrayComments);

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
    console.log(commentsShow);
    socialCommentCount.hidden = true;
    commentsLoader.hidden = true;

    if (comments.length > COMMENTS_AMOUNT) {
      socialCommentCount.hidden = false;
      commentsLoader.hidden = false;
    }
    console.log(comments);
    for (let i = commentsShow - 5; i < commentsShow; i++) {
      createComment(comments[i]);
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

const openModal = (picture) => {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  likeCount.textContent = picture.likes;
  userImg.src = picture.url;
  userCommentsCount.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;
  clearComments();
  const comments = renderComments(picture.comments);
  comments();
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onPictureClose);
  // commentsLoader.addEventListener('click',
  //   comments()
  // );
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
document.addEventListener('click', onPictureOpen);


function closeUserModal() {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onPictureClose);
}

function onPictureClose(evt) {
  body.classList.remove('modal-open');
  if (evt.target.matches('button[type="reset"]')) {
    bigPicture.classList.add('hidden');
  }
  const target = evt.target.closest('.picture');
  if (!target) {
    bigPicture.classList.add('hidden');
  }
}

document.addEventListener('click', onPictureClose);
