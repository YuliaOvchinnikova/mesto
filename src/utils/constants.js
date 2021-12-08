const krasnoyarskImg = new URL('../images/krasnoyarsk.jpeg', import.meta.url);
const bergenImg = new URL('../images/bergen.jpeg', import.meta.url);
const stockholmImg = new URL('../images/stockholm.jpeg', import.meta.url);

const amsterdamImg = new URL('../images/amsterdam.jpeg', import.meta.url);
const helsinkiImg = new URL('../images/helsinki.jpeg', import.meta.url);
const zurichImg = new URL('../images/zurich.jpeg', import.meta.url);

export const initialCards = [
  {
    name: 'Красноярск',
    link: krasnoyarskImg,
    alt: 'Склон, на котором растет хвойный хеленый лес в Красноярске',
  },
  {
    name: 'Берген',
    link: bergenImg,
    alt: 'Храм в Бергене на переднем плане, позади холмы и туман',
  },
  {
    name: 'Стокгольм',
    link: stockholmImg,
    alt: 'Станция метро в Стокгольме в скале',
  },
  {
    name: 'Амстердам',
    link: amsterdamImg,
    alt: 'Лодка на канале в Амстердаме',
  },
  {
    name: 'Хельсинки',
    link: helsinkiImg,
    alt: 'Памятник Сибелиусу в Хельсинки',
  },
  {
    name: 'Цюрих',
    link: zurichImg,
    alt: 'Вид со смотровой площадки на центр города Цюрих',
  },
];
