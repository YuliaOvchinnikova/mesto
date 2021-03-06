import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, funcSubmit) {
    super(selector);
    this._funcSubmit = funcSubmit;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
    this._saveBtn = this._form.querySelector('.popup__save-button');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();

      const inputs = this._getInputValues();
      this._funcSubmit(inputs);
      // change button text while pending going
      this._saveBtn.textContent = 'Сохранение...';
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._saveBtn.textContent = 'Сохранить';
    this._form.reset();
  }
}
