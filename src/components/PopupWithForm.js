import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, funcSubmit) {
    super(selector);
    this._funcSubmit = funcSubmit;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
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
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
