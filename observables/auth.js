import { makeAutoObservable, toJS } from "mobx";

class Auth {
  constructor() {
    makeAutoObservable(this);
  }

  access = null;
  refresh = null;
  isLogined = false;

  set(access, refresh) {
    this.access = access;
    this.refresh = refresh;
    this.isLogined = this.access && this.refresh;
  }
}

const auth = new Auth();
export default auth;
