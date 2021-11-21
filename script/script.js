import Card from '../components/Card.js';
import { initialCards } from '../utils/constants.js';
import { openPopup, closePopup } from './popupFunctions.js';

// Profile elements
const editButton = document.querySelector('.profile__edit-button');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__add-button');

// Popup to edit profile elements
const popupEdit = document.querySelector('.popup_edit');
const formEdit = popupEdit.querySelector('.popup__form');
const nameInputValue = formEdit.querySelector('.popup__input_type_name');

const descriptionInputValue = formEdit.querySelector(
  '.popup__input_type_description'
);

const popups = document.querySelectorAll('.popup');

// Popup to add place elements
const popupAddPlace = document.querySelector('.popup_adding');
const formAddPlace = popupAddPlace.querySelector('.popup__form');
const placeNameInputValue = popupAddPlace.querySelector(
  '.popup__input_type_city'
);
const placeLinkInputValue = popupAddPlace.querySelector(
  '.popup__input_type_link'
);

// Places elements
const placeContainer = document.querySelector('.places');

function createCard(name, link, alt) {
  const card = new Card(name, link, alt, '#place');
  const cardElement = card.generate();
  return cardElement;
}

initialCards.forEach(({ name, link, alt }) => {
  const card = createCard(name, link, alt);
  placeContainer.append(card);
});

function addCard() {
  placeContainer.prepend(
    createCard(placeNameInputValue.value, placeLinkInputValue.value, undefined)
  );
  closePopup(popupAddPlace);
  placeNameInputValue.value = '';
  placeLinkInputValue.value = '';
}

function resetValidation(popup) {
  const errorSpans = [...popup.querySelectorAll('.popup__input-error')];
  if (errorSpans) {
    errorSpans.forEach((span) =>
      span.classList.remove('popup__input-error_active')
    );
  }
  const inputs = [...popup.querySelectorAll('.popup__input')];
  if (inputs) {
    inputs.forEach((input) =>
      input.classList.remove('popup__input_type_error')
    );
  }
  const saveButton = popup.querySelector('.popup__save-button');
  if (saveButton) {
    saveButton.classList.add('popup__save-button_disabled');
    saveButton.disabled = true;
  }
}

function saveData() {
  userName.textContent = nameInputValue.value;
  userDescription.textContent = descriptionInputValue.value;
  closePopup(popupEdit);
}

editButton.addEventListener('click', () => {
  nameInputValue.value = userName.textContent;
  descriptionInputValue.value = userDescription.textContent;
  resetValidation(popupEdit);
  openPopup(popupEdit);
});

addButton.addEventListener('click', () => {
  placeNameInputValue.value = '';
  placeLinkInputValue.value = '';
  resetValidation(popupAddPlace);
  openPopup(popupAddPlace);
});

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (
      evt.target.classList.contains('popup__close-button') ||
      evt.target.classList.contains('popup')
    ) {
      closePopup(popup);
    }
  });
});

formEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  saveData();
});

formAddPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard();
});

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

enableValidation(config);

window.addEventListener('load', () => {
  popups.forEach((popup) => popup.classList.add('popup_transition'));
});
