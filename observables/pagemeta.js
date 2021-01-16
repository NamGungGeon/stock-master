import { makeAutoObservable } from "mobx";

class PageMeta {
  constructor() {
    makeAutoObservable(this);
  }

  title = "ㅇㅇ";
  description = "ㅇㅇㅇ";

  update(title = "Title", description = "desc") {
    this.title = title;
    this.description = description;
  }
}

const pagemeta = new PageMeta();
export default pagemeta;
