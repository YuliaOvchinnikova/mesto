let editButton = document.querySelector('.profile__edit-button');
let userName = document.querySelector('.profile__name');
let userDescription = document.querySelector('.profile__description');

let popup = document.querySelector('.popup');
let form = popup.querySelector('.popup__form');
let nameInputValue = form.querySelector('.popup__input_type_name');
let descriptionInputValue = form.querySelector(
  '.popup__input_type_description'
);
let closeButton = document.querySelector('.popup__close-button');

function openPopup() {
  nameInputValue.value = userName.textContent;
  descriptionInputValue.value = userDescription.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function saveData(event) {
  event.preventDefault();
  userName.textContent = nameInputValue.value;
  userDescription.textContent = descriptionInputValue.value;

  closePopup();
}

editButton.addEventListener('click', openPopup);
form.addEventListener('submit', saveData);
closeButton.addEventListener('click', closePopup);
