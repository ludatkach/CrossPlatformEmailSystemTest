import BasePage from './Base.page';


class GetnadaPage extends BasePage {

  get addInbox() { return browser.$('//li[@class="items-center"]//button');} // '//i[@class="icon-plus"]');}

  get userName() { return browser.$('//input[@id="grid-first-name"]');} // //input[@class="user_name"]');}

  get acceptButton() { return browser.$('//form/button[@type="button"]');}    // //a[@class="button success"]');}

  get activeEmail() { return browser.$('//a[@class=" is-active"]//span');}

  get email() { return browser.$('//li[@class="msg_item"]');}

  open() {
    super.open('https://getnada.com');
  }
}
export default new GetnadaPage();
