import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { initialCards } from '../utils/constants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

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

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
});

function createCard(name, link, alt) {
  const card = new Card(name, link, alt, '#place', (link, name, alt) => {
    popupPhoto.open(link, name, alt);
    popupPhoto.setEventListeners();
  });
  const cardElement = card.generate();
  return cardElement;
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: ({ name, link, alt }) => {
      cardList.addItem(createCard(name, link, alt));
    },
  },
  '.places'
);
cardList.renderItems();

const editFormValidator = new FormValidator(config, formEdit);
const addFormValidator = new FormValidator(config, formAddPlace);
const popupPhoto = new PopupWithImage('.popup_photo');
const popupEditProfile = new PopupWithForm('.popup_edit', (inputs) => {
  userInfo.setUserInfo(inputs.name, inputs.description);
  editFormValidator.resetValidation();
  popupEditProfile.close();
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_adding', ({ city, link }) => {
  const card = createCard(city, link, city);
  cardList.addItem(card);
  addFormValidator.resetValidation();
  popupAddCard.close();
});
popupAddCard.setEventListeners();

editButton.addEventListener('click', () => {
  const { name, description } = userInfo.getUserInfo();
  nameInputValue.value = name;
  descriptionInputValue.value = description;
  editFormValidator.resetValidation();
  popupEditProfile.open();
});

addButton.addEventListener('click', () => {
  placeNameInputValue.value = '';
  placeLinkInputValue.value = '';
  addFormValidator.resetValidation();
  popupAddCard.open();
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();

window.addEventListener('load', () => {
  popups.forEach((popup) => popup.classList.add('popup_transition'));
});
