export default class Card {
  constructor(item, selector, handleCardClick) {
    this._item = item;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector('.place')
      .cloneNode(true);

    return cardElement;
  }

  generate() {
    this._element = this._getTemplate();
    this._setEventListener();

    const placeImage = this._element.querySelector('.place__image');
    const placeName = this._element.querySelector('.place__name');

    const { city, link, alt } = this._item;
    placeImage.src = link;
    if (alt) {
      placeImage.alt = alt;
    } else {
      placeImage.alt = city;
    }
    placeName.textContent = city;

    return this._element;
  }

  _setEventListener() {
    this._element
      .querySelector('.place__image')
      .addEventListener('click', () => {
        this._handleCardClick(this._item);
      });

    this._element
      .querySelector('.place__trash')
      .addEventListener('click', (event) => {
        event.target.closest('.place').remove();
      });

    this._element
      .querySelector('.place__like')
      .addEventListener('click', (event) => {
        event.target.classList.toggle('place__like_active');
      });
  }
}
