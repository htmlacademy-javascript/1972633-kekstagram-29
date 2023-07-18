import { picturesListFragment } from './picture.js';
import { onPictureOpen } from './picture-modal.js';
import { openUploadOverlay } from './form.js';

const picturesList = document.querySelector('.pictures');
const uploadInput = document.querySelector('.img-upload__input');
picturesList.append(picturesListFragment);
document.addEventListener('click', onPictureOpen);
uploadInput.addEventListener('change', openUploadOverlay);
