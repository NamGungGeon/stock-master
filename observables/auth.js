import { makeAutoObservable } from "mobx";

class Auth {
  constructor() {
    makeAutoObservable(this);
  }

  access = null;
  refresh = null;

  set(access, refresh) {
    this.access = access;
    this.refresh = refresh;
  }
}

const auth = new Auth();
export default auth;
