import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import { config } from '../utils/constants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api';

// Profile elements
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const userAvatarContainer = document.querySelector('.profile__photo-container');

// Popup to edit profile elements
const popupEdit = document.querySelector('.popup_edit');
const formEdit = popupEdit.querySelector('.popup__form');
const nameInputValue = formEdit.querySelector('.popup__input_type_name');
const aboutInputValue = formEdit.querySelector('.popup__input_type_about');

const popups = document.querySelectorAll('.popup');

// Popup to add place elements
const popupAddPlace = document.querySelector('.popup_adding');
const formAddPlace = popupAddPlace.querySelector('.popup__form');

// Popup to change avatar
const popupChange = document.querySelector('.popup_change');
const formChangeAvatar = popupChange.querySelector('.popup__form');

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__photo',
});

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-32',
  token: '6ab3ffcb-8b7e-4953-95c8-2915e9d79fac',
});

const popupDeleteConfirmation = new PopupWithConfirmation(
  '.popup_delete',
  (item, event) => {
    api.deleteCard(item._id).then(() => {
      event.target.closest('.place').remove();
      popupDeleteConfirmation.close();
    });
  }
);
popupDeleteConfirmation.setEventListeners();

const cardList = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = new Card(
        item,
        '#place',
        userInfo.getUserInfo().id,
        api,
        (item) => {
          popupPhoto.open(item);
        },
        (item, event) => {
          popupDeleteConfirmation.open(item, event);
        }
      );

      let addTrashButton = false;
      if (item.owner.name === userInfo.getUserInfo().name) {
        addTrashButton = true;
      }

      return card.generate(addTrashButton);
    },
  },
  '.places'
);
cardList.renderItems();

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar, res._id);
    api
      .getInitialCards()
      .then((res) => {
        res.forEach((card) => {
          cardList.addItem(card);
        });
      })
      .catch((err) => console.log('Error: ' + err));
  })
  .catch((err) => console.log('Error: ' + err));

const editFormValidator = new FormValidator(config, formEdit);
const addFormValidator = new FormValidator(config, formAddPlace);
const changeAvatarFormValidator = new FormValidator(config, formChangeAvatar);

const popupChangeAvatar = new PopupWithForm('.popup_change', (inputs) => {
  api
    .changeAvatar(inputs.avatar)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar, res.id);
      popupChangeAvatar.close();
    })
    .catch((err) => console.log('Error: ' + err));
});
popupChangeAvatar.setEventListeners();

userAvatarContainer.addEventListener('click', () => {
  changeAvatarFormValidator.resetValidation();
  popupChangeAvatar.open();
});

const popupPhoto = new PopupWithImage('.popup_photo');
popupPhoto.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_edit', (inputs) => {
  api
    .changeUserInfo(inputs.username, inputs.about)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      popupEditProfile.close();
    })
    .catch((err) => console.log('Error: ' + err));
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_adding', (item) => {
  api
    .addNewCard(item.name, item.link)
    .then((item) => {
      cardList.addItem(item);
      popupAddCard.close();
    })
    .catch((err) => console.log('Error: ' + err));
});
popupAddCard.setEventListeners();

editButton.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();

  nameInputValue.value = name;
  aboutInputValue.value = about;
  editFormValidator.resetValidation();
  popupEditProfile.open();
});

addButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  popupAddCard.open();
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();

window.addEventListener('load', () => {
  popups.forEach((popup) => popup.classList.add('popup_transition'));
});
