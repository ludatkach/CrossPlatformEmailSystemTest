import BaseGetnada from './BaseGetnada.page';

class GetnadaIframePage extends BaseGetnada {

  get iframe() { return browser.$('//iframe[@id="idIframe"]');}

  get catUrl() { return browser.$('//div[@dir="ltr"]/a');}

  get dogUrl() { return browser.$('(//div[@dir="ltr"]/div/a)[1]');}

  get foxUrl() { return browser.$('(//div[@dir="ltr"]/div/a)[2]');}

  open() {
    super.open('https://getnada.com/');
  }

}
export default  new GetnadaIframePage;
