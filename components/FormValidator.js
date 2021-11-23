export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this._errorSpans = [
      ...this._formElement.querySelectorAll('.popup__input-error'),
    ];
    this._inputs = [...this._formElement.querySelectorAll('.popup__input')];
    this._saveButton = this._formElement.querySelector('.popup__save-button');
    this._inputList = [
      ...this._formElement.querySelectorAll(this._config.inputSelector),
    ];
  }

  resetValidation() {
    if (this._errorSpans) {
      this._errorSpans.forEach((span) =>
        span.classList.remove('popup__input-error_active')
      );
    }
    if (this._inputs) {
      this._inputs.forEach((input) =>
        input.classList.remove('popup__input_type_error')
      );
    }
    if (this._saveButton) {
      this._saveButton.classList.add('popup__save-button_disabled');
      this._saveButton.disabled = true;
    }
  }

  _showError = (input) => {
    input.classList.add(this._config.inputErrorClass);
    const error = this._formElement.querySelector(`.${input.id}-error`);
    error.classList.add(this._config.errorClass);
  };

  _hideError = (input) => {
    input.classList.remove(this._config.inputErrorClass);
    const error = this._formElement.querySelector(`.${input.id}-error`);
    error.classList.remove(this._config.errorClass);
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement);
    } else {
      this._hideError(inputElement);
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        console.log(inputElement);
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };
}
