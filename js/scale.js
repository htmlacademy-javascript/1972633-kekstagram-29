const controlValue = document.querySelector('.scale__control--value');
const uploadImg = document.querySelector('.img-upload__preview img');

const STEP_SCALE = 25;
const MAX_VALUE = 100;
const MIN_VALUE = 25;
let currentValue = parseInt(controlValue.value, 10);

const increaseImage = () => {
  currentValue += STEP_SCALE;
  if (currentValue > MAX_VALUE) {
    currentValue = MAX_VALUE;
  }
  uploadImg.style.transform = `scale(${currentValue / 100})`;
  controlValue.value = `${currentValue}%`;
};

const decreaseImage = () => {
  currentValue -= STEP_SCALE;
  if (currentValue < MIN_VALUE) {
    currentValue = MIN_VALUE;
  }
  uploadImg.style.transform = `scale(${currentValue / 100})`;
  controlValue.value = `${currentValue}%`;
};

const onScaleClick = (evt) => {
  if (evt.target.closest('.scale__control--bigger')) {
    increaseImage();
  }
  if (evt.target.closest('.scale__control--smaller')) {
    decreaseImage();
  }
};

export { onScaleClick };
