import baseGetnada from './baseGetnada.page';


class getnadaPage extends baseGetnada {

  get addInbox() { return browser.$('//i[@class="icon-plus"]');}

  get userName() { return browser.$('//input[@class="user_name"]');}

  get acceptButton() { return browser.$('//a[@class="button success"]');}

  get activeEmail() { return browser.$('//a[@class=" is-active"]//span');}

  get email() { return browser.$('//li[@class="msg_item"]');}



}
export default new getnadaPage();
