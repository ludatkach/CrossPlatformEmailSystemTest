import  BasePage from './Base.page';

class GmailPage  extends BasePage{

  get gmailUserName() { return browser.$('//input[@id="identifierId"]');}

  get NextButton() { return browser.$('//div[@class="VfPpkd-RLmnJb"]');}

  get gmailUserPassword() { return browser.$('//input[@class="whsOnd zHQkBf"]');}

  get logoGmail() { return browser.$('//img[@class="gb_va"]');}

  get addCompose() { return browser.$('//div[@class="T-I T-I-KE L3"]');}

  get userEmailAnotherDomain() { return browser.$('//textarea[@class="vO"]');}

  get subjectMessage() { return browser.$('//input[@name="subjectbox"]');}

  get mailArea() { return browser.$('//div[@class="Am Al editable LW-avf tS-tW"]');}

  get sendButton() { return browser.$('//div[text()="Send"]');}

  get confirmMessage() { return browser.$('//span[text()="Message sent."]');}

  get confirmMessageBox() { return browser.$('//div[@class="vh"]//span[@class="aT"]');}

  open() {
    super.open('https://mail.google.com');
  }

}

export default new GmailPage();
