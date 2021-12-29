import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(selector, funcSubmit) {
    super(selector);
    this._funcSubmit = funcSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._saveBtn = this._form.querySelector('.popup__save-button');
  }

  setEventListeners() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();

      this._funcSubmit(this._item, this._event);
      // change button text while pending going
      this._saveBtn.textContent = 'Сохранение...';
    });
    super.setEventListeners();
  }

  open(item, event) {
    this._item = item;
    this._event = event;

    super.open();
  }

  close() {
    super.close();
    this._saveBtn.textContent = 'Да';
    this._form.reset();
  }
}
