import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._figcaption = this._popup.querySelector('.popup__figcaption');
    this._image = this._popup.querySelector('.popup__opened-image');
  }

  open({ link, city, alt }) {
    super.open();
    this._image.src = link;
    this._figcaption.textContent = city;
    this._image.alt = alt;
  }
}
