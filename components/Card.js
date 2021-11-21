import { openPopup } from '../script/popupFunctions.js';

// Popup to open photo
const popupOpenPhoto = document.querySelector('.popup_photo');
const openedPhotoName = popupOpenPhoto.querySelector('.popup__figcaption');
const openedPhoto = popupOpenPhoto.querySelector('.popup__opened-image');

export default class Card {
  constructor(name, link, alt, selector) {
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._selector = selector;
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

    placeImage.src = this._link;
    if (this._alt) {
      placeImage.alt = this._alt;
    } else {
      placeImage.alt = this._name;
    }
    placeName.textContent = this._name;

    return this._element;
  }

  _setEventListener() {
    this._element
      .querySelector('.place__image')
      .addEventListener('click', (event) => {
        openedPhotoName.textContent = event.target.alt;
        openedPhoto.src = event.target.src;
        openPopup(popupOpenPhoto);
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
