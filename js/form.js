import { isEscapeKey } from './util.js';
import { body } from './picture-modal.js';


const MAX_COMMENTS_LENGTH = 140;
const MAX_HASHTAGS_LENGTH = 5;
const REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const ERORHASHTAGS = {
  validCount: 'Превышено количество хэш-тегов',
  validHashtag: 'Введён невалидный хэш-тег',
  nonrepeatingHashtag: 'Хэш-теги повторяются'
};

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');
const imagePreview = uploadForm.querySelector('.img-upload__preview img');


const textHashtags = uploadForm.querySelector('.text__hashtags');
const textDescripton = uploadForm.querySelector('.text__description');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

const validateDescripton = (value) => value.trim().length <= MAX_COMMENTS_LENGTH;
const descriptonError = () => `Длина комментария не больше ${MAX_COMMENTS_LENGTH} символов`;


pristine.addValidator(
  textDescripton, validateDescripton, descriptonError
);

const normalaseHashtags = (string) =>
  string.trim().toLowerCase().split(' ').filter((str) => str !== '');


const validCount = (value) =>
  normalaseHashtags(value).length <= MAX_HASHTAGS_LENGTH;

const validHashtag = (value) => normalaseHashtags(value).every((hashtag) => REGEX.test(hashtag));

const nonrepeatingHashtag = (value) => normalaseHashtags(value).length === new Set(normalaseHashtags(value)).size;


pristine.addValidator(
  textHashtags, validCount, ERORHASHTAGS.validCount
);

pristine.addValidator(
  textHashtags, validHashtag, ERORHASHTAGS.validHashtag
);

pristine.addValidator(
  textHashtags, nonrepeatingHashtag, ERORHASHTAGS.nonrepeatingHashtag
);

const validatePristine = (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
    console.log('Нельзя отправлять');
  } else {
    console.log('Можно отправлять');
  }
};


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement !== textHashtags &&
      document.activeElement !== textDescripton) {
      closeUploadOverlay();
    }
  }
};

const onOverlayClick = (evt) => {
  if (evt.target.matches('.img-upload__overlay') || evt.target.closest('.img-upload__cancel')) {
    closeUploadOverlay();
  }
};

function closeUploadOverlay() {
  uploadForm.reset();
  pristine.reset();
  body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.removeEventListener('click', onOverlayClick);
  uploadForm.removeEventListener('submit', validatePristine);
}

const onOpenReset = () => {
  sliderContainer.classList.add('hidden');
  imagePreview.style.filter = null;
};

const openUploadOverlay = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  onOpenReset();
  uploadForm.addEventListener('click', onOverlayClick);
  uploadForm.addEventListener('submit', validatePristine);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { openUploadOverlay };
