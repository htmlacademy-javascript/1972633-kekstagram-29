import { sliderContainer, slider } from './form.js';

const FILTERS = {
  'none': {
    min: 0,
    max: 100,
    step: 1,
  },
  'chrome': {
    style: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  'sepia': {
    style: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  'marvin': {
    style: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
  },
  'phobos': {
    style: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
  },
  'heat': {
    style: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
  }
};

const uploadForm = document.querySelector('.img-upload__form');
const imagePreview = uploadForm.querySelector('.img-upload__preview img');
const effectLevel = uploadForm.querySelector('.effect-level__value');

const createSlider = (element) => {
  noUiSlider.create(element, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });
};

let currentEffects = 'none';

const updatedSlider = (filter) => {
  slider.noUiSlider.updateOptions({
    range: {
      min: filter.min,
      max: filter.max,
    },
    step: filter.step,
    start: filter.max,
  });
};

const onEffectsChange = (evt) => {
  currentEffects = evt.target.value;
  if (evt.target.value === 'none') {
    sliderContainer.classList.add('hidden');
    updatedSlider(FILTERS[currentEffects]);
    return;
  }
  sliderContainer.classList.remove('hidden');
  updatedSlider(FILTERS[currentEffects]);
};

const setSliderUpdates = () => {
  slider.noUiSlider.on('update', () => {
    if (currentEffects === 'none') {
      imagePreview.style.filter = null;
      return;
    }
    const sliderPosition = slider.noUiSlider.get();
    effectLevel.value = sliderPosition;
    const { style, unit } = FILTERS[currentEffects];
    imagePreview.style.filter = `${style}(${sliderPosition}${unit})`;
  });
};

export { createSlider, onEffectsChange, setSliderUpdates };
