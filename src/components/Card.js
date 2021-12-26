export default class Card {
  constructor(item, selector, userId, api, handleCardClick, handleCardDelete) {
    this._card = item;
    this._selector = selector;
    this._userId = userId;
    this._api = api;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector('.place')
      .cloneNode(true);

    return cardElement;
  }

  generate(addTrashButton) {
    this._element = this._getTemplate();
    this._setEventListener();

    const like = this._element.querySelector('.place__like');

    const placeImage = this._element.querySelector('.place__image');
    const placeName = this._element.querySelector('.place__name');

    const { name, link, alt } = this._card;
    placeImage.src = link;
    if (alt) {
      placeImage.alt = alt;
    } else {
      placeImage.alt = name;
    }
    placeName.textContent = name;

    if (!addTrashButton) {
      this._element.querySelector('.place__trash').remove();
    }

    if (this._card.likes.map((like) => like._id).includes(this._userId)) {
      like.classList.add('place__like_active');
    }

    return this._element;
  }

  _setEventListener() {
    this._element
      .querySelector('.place__image')
      .addEventListener('click', () => {
        this._handleCardClick(this._card);
      });

    this._element
      .querySelector('.place__trash')
      .addEventListener('click', (event) => {
        this._handleCardDelete(this._card, event);
      });

    this._element
      .querySelector('.place__like')
      .addEventListener('click', (event) => {
        event.target.classList.toggle('place__like_active');

        let likes = parseInt(
          this._element.querySelector('.place__counter').textContent
        );
        if (this._card.likes.map((like) => like._id).includes(this._userId)) {
          this._api
            .unlikeCard(this._card._id)
            .then((res) => {
              this._card = res;
              likes -= 1;
              this._element.querySelector('.place__counter').textContent =
                likes;
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this._api
            .likeCard(this._card._id)
            .then((res) => {
              this._card = res;
              likes += 1;
              this._element.querySelector('.place__counter').textContent =
                likes;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });

    this._element.querySelector('.place__counter').textContent =
      this._card.likes.length;
  }
}
