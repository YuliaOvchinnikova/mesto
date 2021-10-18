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
const closeButtons = document.querySelectorAll('.popup__close-button');

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

// Popup to open photo
const popupOpenPhoto = document.querySelector('.popup_photo');
const openedPhotoName = popupOpenPhoto.querySelector('.popup__figcaption');
const openedPhoto = popupOpenPhoto.querySelector('.popup__opened-image');

// Places elements
const placeTemplate = document.querySelector('#place').content;
const placeContainer = document.querySelector('.places');

const initialCards = [
  {
    name: 'Красноярск',
    link: './images/krasnoyarsk.jpeg',
    alt: 'Склон, на котором растет хвойный хеленый лес в Красноярске',
  },
  {
    name: 'Берген',
    link: './images/bergen.jpeg',
    alt: 'Храм в Бергене на переднем плане, позади холмы и туман',
  },
  {
    name: 'Стокгольм',
    link: './images/stockholm.jpeg',
    alt: 'Станция метро в Стокгольме в скале',
  },
  {
    name: 'Амстердам',
    link: './images/amsterdam.jpeg',
    alt: 'Лодка на канале в Амстердаме',
  },
  {
    name: 'Хельсинки',
    link: './images/helsinki.jpeg',
    alt: 'Памятник Сибелиусу в Хельсинки',
  },
  {
    name: 'Цюрих',
    link: './images/zurich.jpeg',
    alt: 'Вид со смотровой площадки на центр города Цюрих',
  },
];

function creacteCard(name, link, alt) {
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const placeImage = placeElement.querySelector('.place__image');

  placeImage.src = link;
  if (alt) {
    placeImage.alt = alt;
  } else {
    placeImage.alt = name;
  }
  placeElement.querySelector('.place__name').textContent = name;

  placeImage.addEventListener('click', (event) => {
    openedPhotoName.textContent = event.target.alt;
    openedPhoto.src = event.target.src;
    openPopup(popupOpenPhoto);
  });

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

  return placeElement;
}

initialCards.forEach(function (place) {
  placeContainer.append(creacteCard(place.name, place.link, place.alt));
});

function addCard(event) {
  event.preventDefault();

  placeContainer.prepend(
    creacteCard(placeNameInputValue.value, placeLinkInputValue.value, undefined)
  );

  closePopup(popupAddPlace);

  placeNameInputValue.value = '';
  placeLinkInputValue.value = '';
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

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

window.addEventListener('load', () => {
  popups.forEach((popup) => popup.classList.add('popup_transition'));
});
