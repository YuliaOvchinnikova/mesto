class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // get initial cards from the server
  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  // add new card to the server
  addNewCard(name, link) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, link: link }),
    }).then(this._checkResponse);
  }

  // delete a card on the server
  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  // get user info from the server
  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  // like a card on the server
  likeCard(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  // delete a card on the server
  unlikeCard(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  // change user name and about info on the server
  changeUserInfo(name, about) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  // change user avatar on the server
  changeAvatar(avatar) {
    const body = {
      avatar: avatar,
    };
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }
}

export default Api;
