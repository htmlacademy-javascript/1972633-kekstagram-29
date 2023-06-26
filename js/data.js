import { getRandomInteger } from './util.js';
import { getRandomArrayElement } from './util.js';

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];
const DESCRIPTION = [
  'Портрет женщины с таинственной улыбкой',
  'Фреска на потолке Сикстинской капеллы',
  'Гибель города Помпеи от извержения вулкана Везувий',
  'Огромные волны',
  'Таинственный лес',
  'Звездное небо над городом',
  'Портрет художницы',
  'Званный обед',
  'Группа мужчин',
  'Пабло Пикассо',
  'Дом на фоне закатного неба',
  'Статуя богини любви Афродиты',
  'Яблони в саду',
  'Круги на воде',
  'Мадонна Рафаэля',
  'Полет времени',
  'Три грации',
  'Абстрактная картина',
  'Цветущие сады',
  'Мост через реку',
  'Скульптура, созданная из стекла',
  'Картина, символизирующая свободу',
  'Портрет женщины',
  'Различные геометрические фигуры',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const COUNT = 25;

function createRandomIdFromRangeGenerator(min, max) {
  const previousValue = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValue.length >= (max - min + 1)) {
      console.log.error(`Перебраны все числа из диапозона от ${min}до${max}`);
      return null;
    }
    while (previousValue.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValue.push(currentValue);
    return currentValue;
  };
}
const generatorPhotoId = createRandomIdFromRangeGenerator(1, 25);
const generatorUrlId = createRandomIdFromRangeGenerator(1, 25);
const generatorCommentId = createRandomIdFromRangeGenerator(1, 500);

const getRandomMessage = () => {
  if (getRandomInteger(1, 2) === 1) {
    return getRandomArrayElement(MESSAGES);
  } return `${getRandomArrayElement(MESSAGES)} ${getRandomArrayElement(MESSAGES)}`;
};

const createComment = () => ({
  id: generatorCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAMES),
});


const createDescription = () => ({
  id: generatorPhotoId(),
  url: `photos/${generatorUrlId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, 30) }, createComment),
});

const someCreateDescription = () => Array.from({ length: COUNT }, createDescription);
export { someCreateDescription };
