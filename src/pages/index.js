import './index.css'; // добавьте импорт главного файла стилей
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { initialCards, config } from '../utils/constants.js';
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

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
});

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#place', (item) => {
        popupPhoto.open(item);
      });
      return card.generate();
    },
  },
  '.places'
);
cardList.renderItems();

const editFormValidator = new FormValidator(config, formEdit);
const addFormValidator = new FormValidator(config, formAddPlace);
const popupPhoto = new PopupWithImage('.popup_photo');
popupPhoto.setEventListeners();
const popupEditProfile = new PopupWithForm('.popup_edit', (inputs) => {
  userInfo.setUserInfo(inputs.name, inputs.description);
  popupEditProfile.close();
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_adding', (item) => {
  cardList.addItem(item);
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
  addFormValidator.resetValidation();
  popupAddCard.open();
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();

window.addEventListener('load', () => {
  popups.forEach((popup) => popup.classList.add('popup_transition'));
});
