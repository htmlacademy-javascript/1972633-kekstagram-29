
const body = document.querySelector('body');
const ALERT_TIME = 2000;
// const getRandomInteger = (a, b) => {
//   const lower = Math.ceil(Math.min(a, b));
//   const upper = Math.floor(Math.max(a, b));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// };

// const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
// const isEscapeKey = (evt) => evt.key === 'Escape';

// export { getRandomInteger };
// export { getRandomArrayElement };
// export { isEscapeKey };

const isEscapeKey = (evt) => evt.key === 'Escape';

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  element.classList.add(className);

  if (text) {
    element.textContent = text;
  }
  return element;
};

const showAlert = (message) => {
  const alertContainer = createElement('div', 'alert-message', message);
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.right = 0;
  alertContainer.style.top = 0;
  alertContainer.style.padding = '15px 5px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'tomato';
  alertContainer.style.transform = 'scale(1)';

  body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_TIME);
};

export { isEscapeKey };
export { showAlert };
