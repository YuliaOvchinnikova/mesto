export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    const userInfo = {};
    userInfo['name'] = this._name.textContent;
    userInfo['about'] = this._about.textContent;
    userInfo['id'] = this._id;
    return userInfo;
  }

  setUserInfo(name, about, avatar, id) {
    this._name.textContent = name;
    this._about.textContent = about;
    if (avatar) {
      this._avatar.src = avatar;
    }
    this._id = id;
  }
}
