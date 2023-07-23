import { openUploadOverlay, getSendForm, closeUploadOverlay } from './form.js';
import { showAlert } from './util.js';
import { getData, sendData } from './api.js';
import { getGallery } from './gallery.js';
// import { sortImages, showSort } from './sort.js';
// import { debounce } from './util.js';
import { showSuccessPopup, showErrorPopup } from './submit-popup.js';

const uploadInput = document.querySelector('.img-upload__input');

getSendForm(async (data) => {
  try {
    await sendData(data);
    closeUploadOverlay();
    showSuccessPopup();
  } catch (err) {
    showErrorPopup();
    showAlert(err.message);
  }
});


try {
  const data = await getData();
  getGallery(data);
  // const debouncedRenderGallery = debounce(getGallery);
  // showSort(data, debouncedRenderGallery);
  // getGallery(sortImages());
} catch (err) {
  showAlert(err.message);
}

uploadInput.addEventListener('change', openUploadOverlay);
