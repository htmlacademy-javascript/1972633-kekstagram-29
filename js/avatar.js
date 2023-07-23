const FILE_TYPES = ['gif', 'webp', 'jpeg', 'png', 'avif', 'jpg', 'svg'];

const uploadInput = document.querySelector('.img-upload__input');
const uploadBigPreview = document.querySelector('.img-upload__preview img');
const uploadEffectsPreview = document.querySelectorAll('.effects__preview');

const fileChooser = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    uploadBigPreview.src = URL.createObjectURL(file);
    uploadEffectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url(${uploadBigPreview.src})`;
    });
  }
};

export { fileChooser };
