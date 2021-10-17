// Profile elements
let editButton = document.querySelector('.profile__edit-button');
let userName = document.querySelector('.profile__name');
let userDescription = document.querySelector('.profile__description');
let addButton = document.querySelector('.profile__add-button');

// Popup to edit profile elements
let popupEdit = document.querySelector('.popup_edit');
let formEdit = popupEdit.querySelector('.popup__form');
let nameInputValue = formEdit.querySelector('.popup__input_type_name');
let descriptionInputValue = formEdit.querySelector(
  '.popup__input_type_description'
);
let closeButtons = document.querySelectorAll('.popup__close-button');

// Popup to add place elements
let popupAddPlace = document.querySelector('.popup_adding');
let formAddPlace = popupAddPlace.querySelector('.popup__form');
let placeNameInputValue = popupAddPlace.querySelector(
  '.popup__input_type_city'
);
let placeLinkInputValue = popupAddPlace.querySelector(
  '.popup__input_type_link'
);

// Popup to open photo
let popupOpenPhoto = document.querySelector('.popup_photo');
let openedPhotoName = popupOpenPhoto.querySelector('.popup__figcaption');
let openedPhoto = popupOpenPhoto.querySelector('.popup__opened-image');

// Places elements
const placeTemplate = document.querySelector('#place').content;
let placeContainer = document.querySelector('.places');

const initialCards = [
  {
    name: 'Красноярск',
    link: './images/krasnoyarsk.jpeg',
  },
  {
    name: 'Берген',
    link: './images/bergen.jpeg',
  },
  {
    name: 'Стокгольм',
    link: './images/stockholm.jpeg',
  },
  {
    name: 'Амстердам',
    link: './images/amsterdam.jpeg',
  },
  {
    name: 'Хельсинки',
    link: './images/helsinki.jpeg',
  },
  {
    name: 'Цюрих',
    link: './images/zurich.jpeg',
  },
];

function creacteCard(name, link) {
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  placeElement.querySelector('.place__image').src = link;
  placeElement.querySelector('.place__image').alt = name;
  placeElement.querySelector('.place__name').textContent = name;

  placeElement
    .querySelector('.place__like')
    .addEventListener('click', (event) => {
      event.target.classList.toggle('place__like_active');
    });

  placeElement
    .querySelector('.place__trash')
    .addEventListener('click', (event) => {
      event.target.closest('.place').remove();
    });

  placeElement
    .querySelector('.place__image')
    .addEventListener('click', (event) => {
      openedPhotoName.textContent = event.target.alt;
      openedPhoto.src = event.target.src;
      openPopup(popupOpenPhoto);
    });

  return placeElement;
}

initialCards.forEach(function (place) {
  placeContainer.append(creacteCard(place.name, place.link));
});

function addCard(event) {
  event.preventDefault();

  placeContainer.prepend(
    creacteCard(placeNameInputValue.value, placeLinkInputValue.value)
  );

  closePopup(popupAddPlace);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function saveData(event) {
  event.preventDefault();
  userName.textContent = nameInputValue.value;
  userDescription.textContent = descriptionInputValue.value;

  closePopup(popupEdit);
}

editButton.addEventListener('click', () => {
  nameInputValue.value = userName.textContent;
  descriptionInputValue.value = userDescription.textContent;
  openPopup(popupEdit);
});

addButton.addEventListener('click', () => {
  openPopup(popupAddPlace);
});

formEdit.addEventListener('submit', saveData);

formAddPlace.addEventListener('submit', addCard);

Array.from(closeButtons).forEach(function (closeButton) {
  closeButton.addEventListener('click', (evt) => {
    if (evt.target.closest('.popup_edit')) {
      closePopup(popupEdit);
    } else if (evt.target.closest('.popup_photo')) {
      closePopup(popupOpenPhoto);
    } else {
      closePopup(popupAddPlace);
    }
  });
});

window.addEventListener('load', () => {
  document
    .querySelectorAll('.popup')
    .forEach((popup) => popup.classList.add('popup_transition'));
});
