const QUANTITY_IMAGES = 10;

const Sorts = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterImg = document.querySelector('.img-filters');
let currentFilter = Sorts.DEFAULT;
let pictures = [];

const randomSort = () => Math.random() - 0.5;

const discussSort = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const sortImages = () => {
  switch (currentFilter) {
    case Sorts.RANDOM:
      return [...pictures].sort(randomSort).slice(0, QUANTITY_IMAGES);
    case Sorts.DISCUSSED:
      return [...pictures].sort(discussSort);
    default:
      return [...pictures];
  }
};

const clickedSort = (cb) => {
  filterImg.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button') && evt.target.id !== currentFilter) {
      const clickBtn = evt.target;
      filterImg.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      clickBtn.classList.add('img-filters__button--active');
      currentFilter = clickBtn.id;
      cb(sortImages());
    }
  });
};

const showSort = (data, cb) => {
  filterImg.classList.remove('img-filters--inactive');
  pictures = [...data];
  clickedSort(cb);
};

export { sortImages, showSort };
