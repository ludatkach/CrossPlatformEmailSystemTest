import BasePage from './Base.page';


class GetnadaPage extends BasePage {

  get addInbox() { return browser.$('//li[@class="items-center"]//button');}
  get userName() { return browser.$('//input[@id="grid-first-name"]');}

  get domain() { return browser.$('//select');}

  get acceptButton() { return browser.$('//form/button[@type="button"]');}

  get activeEmail() { return browser.$('//p[@class="p-3"]');}

  get email() { return browser.$('//li[@class="msg_item"]');}

  open() {
    super.open('https://getnada.com');
  }
}
export default new GetnadaPage();
