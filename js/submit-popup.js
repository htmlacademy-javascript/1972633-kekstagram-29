import { isEscapeKey } from './util.js';
import { body } from './picture-modal.js';

const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

const onSuccessPopupKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessPopup();
  }
};

const onErrorPopupKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorPopup();
  }
};

const showSuccessPopup = () => {
  body.append(successPopup);
  document.addEventListener('keydown', onSuccessPopupKeydown);
  document.addEventListener('click', onSuccessButtonOverlayClick);
};

function closeSuccessPopup() {
  successPopup.remove();
  document.removeEventListener('keydown', onSuccessPopupKeydown);
  document.removeEventListener('click', onSuccessButtonOverlayClick);
}

function onSuccessButtonOverlayClick(evt) {
  if (!evt.target.closest('.success__inner') || evt.target.closest('.success__button')) {
    closeSuccessPopup();
  }
}

const showErrorPopup = () => {
  body.append(errorPopup);
  document.addEventListener('keydown', onErrorPopupKeydown);
  document.addEventListener('click', onErrorPopupButtonOverlayClick);
};

function closeErrorPopup() {
  errorPopup.remove();
  document.removeEventListener('keydown', onErrorPopupKeydown);
  document.removeEventListener('click', onErrorPopupButtonOverlayClick);
}

function onErrorPopupButtonOverlayClick(evt) {
  if (!evt.target.closest('.error__inner') || evt.target.closest('.error__button')) {
    closeErrorPopup();
  }
}

export { showSuccessPopup, showErrorPopup };
