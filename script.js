let editButton = document.querySelector('.profile__edit-button');
let userName = document.querySelector('.profile__name');
let userDescription = document.querySelector('.profile__description');

let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__form');
let popupName = document.querySelector('.popup__input_type_name');
let popupDescription = document.querySelector('.popup__input_type_description');
let closeButton = document.querySelector('.popup__closebtn');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function saveData(event) {
  event.preventDefault();
  if (popupName.value !== '') {
    userName.textContent = popupName.value;
  }
  if (popupDescription.value !== '') {
    userDescription.textContent = popupDescription.value;
  }

  closePopup();
}

editButton.addEventListener('click', openPopup);
form.addEventListener('submit', saveData);
closeButton.addEventListener('click', closePopup);
