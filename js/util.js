const body = document.querySelector('body');
const ALERT_TIME = 2000;

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

// const debounce = (callback, timeoutDelay = 500) => {
//   let timeoutId;

//   return (...rest) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
//   };
// };

export { isEscapeKey, showAlert };
