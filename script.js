let editButton = document.querySelector(".profile__edit-button");
let userName = document.querySelector(".profile__name");
let userSubname = document.querySelector(".profile__subname");

let popup = document.querySelector(".popup");
let form = document.querySelector(".popup__form");
let popupName = document.querySelector(".popup__name");
let popupSubname = document.querySelector(".popup__subname");
let closeButton = document.querySelector(".popup__closebtn");

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function editProfile() {
  openPopup();
}

function saveData(event) {
  event.preventDefault();
  if (popupName.value !== "") {
    userName.textContent = popupName.value;
  }
  if (popupSubname.value !== "") {
    userSubname.textContent = popupSubname.value;
  }

  closePopup();
}

editButton.addEventListener("click", editProfile);
form.addEventListener("submit", saveData);
closeButton.addEventListener("click", closePopup);
