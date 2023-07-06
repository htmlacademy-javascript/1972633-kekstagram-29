import { picturesListFragment } from './picture.js';
import { onPictureOpen } from './picture-modal.js';

const picturesList = document.querySelector('.pictures');
picturesList.append(picturesListFragment);
document.addEventListener('click', onPictureOpen);
