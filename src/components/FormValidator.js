export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._saveButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this._inputList = [
      ...this._formElement.querySelectorAll(this._config.inputSelector),
    ];
  }

  resetValidation() {
    this._toggleButtonState();
    if (this._inputList) {
      this._inputList.forEach((input) => this._hideError(input));
    }
  }

  _showError = (input, errorMessage) => {
    input.classList.add(this._config.inputErrorClass);
    const error = this._formElement.querySelector(`.${input.id}-error`);
    error.textContent = errorMessage;
    error.classList.add(this._config.errorClass);
  };

  _hideError = (input) => {
    input.classList.remove(this._config.inputErrorClass);
    const error = this._formElement.querySelector(`.${input.id}-error`);
    error.classList.remove(this._config.errorClass);
    error.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._saveButton.classList.add(this._config.inactiveButtonClass);
      this._saveButton.disabled = true;
    } else {
      this._saveButton.classList.remove(this._config.inactiveButtonClass);
      this._saveButton.disabled = false;
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };
}
