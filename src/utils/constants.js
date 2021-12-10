const krasnoyarskImg = new URL('../images/krasnoyarsk.jpeg', import.meta.url);
const bergenImg = new URL('../images/bergen.jpeg', import.meta.url);
const stockholmImg = new URL('../images/stockholm.jpeg', import.meta.url);

const amsterdamImg = new URL('../images/amsterdam.jpeg', import.meta.url);
const helsinkiImg = new URL('../images/helsinki.jpeg', import.meta.url);
const zurichImg = new URL('../images/zurich.jpeg', import.meta.url);

export const initialCards = [
  {
    city: 'Красноярск',
    link: krasnoyarskImg,
    alt: 'Склон, на котором растет хвойный хеленый лес в Красноярске',
  },
  {
    city: 'Берген',
    link: bergenImg,
    alt: 'Храм в Бергене на переднем плане, позади холмы и туман',
  },
  {
    city: 'Стокгольм',
    link: stockholmImg,
    alt: 'Станция метро в Стокгольме в скале',
  },
  {
    city: 'Амстердам',
    link: amsterdamImg,
    alt: 'Лодка на канале в Амстердаме',
  },
  {
    city: 'Хельсинки',
    link: helsinkiImg,
    alt: 'Памятник Сибелиусу в Хельсинки',
  },
  {
    city: 'Цюрих',
    link: zurichImg,
    alt: 'Вид со смотровой площадки на центр города Цюрих',
  },
];

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};
