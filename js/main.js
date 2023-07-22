import { openUploadOverlay } from './form.js';
import { showAlert } from './util.js';
import { getData } from './api.js';
import { getGallery } from './gallery.js';

const uploadInput = document.querySelector('.img-upload__input');

try {
  const data = await getData();
  getGallery(data);
  // const debouncedRenderGallery = debounce(renderGallery);
  // showSort(data, debouncedRenderGallery);
  // getGallery(sortImages());
} catch (err) {
  showAlert(err.message);
}

uploadInput.addEventListener('change', openUploadOverlay);
