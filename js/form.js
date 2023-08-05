import { isEscapeKey } from './util.js';
import { onScaleClick, resetScale } from './scale.js';
import { createSlider, onEffectsChange, setSliderUpdates } from './filters.js';
import { selectedFile } from './avatar.js';

const MAX_COMMENTS_LENGTH = 140;
const MAX_HASHTAGS_LENGTH = 5;
const REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const ERORHASHTAGS = {
  VALIDCOUNT: 'Превышено количество хэш-тегов',
  VALIDHASHTAG: 'Введён невалидный хэш-тег',
  NONREPEATINGHASHTAG: 'Хэш-теги повторяются'
};

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadScale = document.querySelector('.img-upload__scale ');
const slider = uploadForm.querySelector('.effect-level__slider');
const effects = uploadForm.querySelector('.effects__list');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');
const imagePreview = uploadForm.querySelector('.img-upload__preview img');
// const effectLevel = uploadForm.querySelector('.effect-level__value');
const uploadImg = document.querySelector('.img-upload__preview img');

const textHashtags = uploadForm.querySelector('.text__hashtags');
const textDescripton = uploadForm.querySelector('.text__description');

const submitButton = document.querySelector('.img-upload__submit');
const SubmitButtonText = {
  DEFAULT: 'Опубликовать',
  SENDING: 'Публикую...'
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

const hasValidDescripton = (value) => value.trim().length <= MAX_COMMENTS_LENGTH;
const descriptonError = () => `Длина комментария не больше ${MAX_COMMENTS_LENGTH} символов`;

pristine.addValidator(
  textDescripton, hasValidDescripton, descriptonError
);

const normaliseHashtags = (string) =>
  string.trim().toLowerCase().split(' ').filter((str) => str !== '');

const hasValidCount = (value) =>
  normaliseHashtags(value).length <= MAX_HASHTAGS_LENGTH;

const hasValidHashtag = (value) => normaliseHashtags(value).every((hashtag) => REGEX.test(hashtag));

const hasNonrepeatingHashtag = (value) => normaliseHashtags(value).length === new Set(normaliseHashtags(value)).size;

pristine.addValidator(
  textHashtags, hasValidCount, ERORHASHTAGS.VALIDCOUNT
);

pristine.addValidator(
  textHashtags, hasValidHashtag, ERORHASHTAGS.VALIDHASHTAG
);

pristine.addValidator(
  textHashtags, hasNonrepeatingHashtag, ERORHASHTAGS.NONREPEATINGHASHTAG
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.DEFAULT;
};

const getSendForm = (cb) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      await cb(formData);
      unblockSubmitButton();
    }
  });
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
  resetScale();
  slider.noUiSlider.destroy();
  body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.removeEventListener('click', onOverlayClick);
  uploadScale.removeEventListener('click', onScaleClick);
  effects.removeEventListener('change', onEffectsChange);
}

const onOpenReset = () => {
  sliderContainer.classList.add('hidden');
  imagePreview.style.filter = null;
};

const openUploadOverlay = () => {
  uploadImg.style.transform = 'scale(1)';
  selectedFile();
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  createSlider(slider);
  setSliderUpdates();
  onOpenReset();
  uploadForm.addEventListener('click', onOverlayClick);
  uploadScale.addEventListener('click', onScaleClick);
  document.addEventListener('keydown', onDocumentKeydown);
  effects.addEventListener('change', onEffectsChange);
};

export { openUploadOverlay, closeUploadOverlay, uploadScale, sliderContainer, slider, getSendForm, onDocumentKeydown };
