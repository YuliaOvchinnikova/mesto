const showError = ({ inputErrorClass, errorClass }, form, input) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(inputErrorClass);
  error.classList.add(errorClass);
};

const hideError = ({ inputErrorClass, errorClass }, form, input) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(inputErrorClass);
  error.classList.remove(errorClass);
};

function checkInputValidity(config, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showError(config, formElement, inputElement);
  } else {
    hideError(config, formElement, inputElement);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (
  { inactiveButtonClass },
  inputList,
  buttonElement
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (config, formElement) => {
  const inputList = [...formElement.querySelectorAll(config.inputSelector)];
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(config, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(config, formElement, inputElement);
      toggleButtonState(config, inputList, buttonElement);
    });
  });
};

const enableValidation = (config) => {
  const formList = [...document.querySelectorAll(config.formSelector)];
  formList.forEach((formElement) => {
    setEventListeners(config, formElement);
  });
};
