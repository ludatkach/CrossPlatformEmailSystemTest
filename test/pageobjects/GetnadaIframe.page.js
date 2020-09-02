import BasePage from './Base.page';

class GetnadaIframePage extends BasePage {

  get iframe() { return browser.$('//iframe[@id="idIframe"]');}

  get catUrl() { return browser.$('//div[@dir="ltr"]/a');}

  get dogUrl() { return browser.$('(//div[@dir="ltr"]/div/a)[1]');}

  get foxUrl() { return browser.$('(//div[@dir="ltr"]/div/a)[2]');}

  open() {
    super.open('https://getnada.com/');
  }

}
export default  new GetnadaIframePage;
