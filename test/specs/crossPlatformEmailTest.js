const { expect } = require('chai');
import axios from 'axios';
const fs = require('fs');
import GetnadaPage from '../pageobjects/Getnada.page';
import GetnadaIframePage from '../pageobjects/GetnadaIframe.page';
import GmailPage from '../pageobjects/Gmail.page';
import expected from '../data/expectedGetnada';
import expectedGmail from '../data/expectedGmail';

let userEmail;
let catImage;
let dogImage;
let foxImage;
let catUrl;
let dogUrl;
let foxUrl;
let fileName;

describe('TEST TASK', () => {
  before('go to getnada.com', () => {
    GetnadaPage.open();
    browser.maximizeWindow();
  });

  it('should have a right title ', () => {
    expect(browser.getTitle()).eq(expected.title);
  });

  it('should create an email', () => {
    GetnadaPage.addInbox.click();
    let userName = GetnadaPage.userName.getValue();
    let d = new Date();
    userName = userName + d.getTime();
    userEmail = userName + expected.domainName;
    GetnadaPage.userName.click();
    GetnadaPage.userName.keys([expected.keys.control, expected.keys.letterA]);
    GetnadaPage.userName.keys(expected.keys.delete);
    GetnadaPage.userName.setValue(userName);

    GetnadaPage.acceptButton.click();
    expect(GetnadaPage.activeEmail.getText()).eq(userEmail);
  });

  it('should get API cat image url', async () => {
    const result = await axios({
      method: 'get',
      url: 'http://aws.random.cat/meow',
    })
      .then(res => res.data)
      .catch(err => err.response.data);
    catImage = result.file;
    expect(result.file).to.match(/\.(jpe?g|png|mp4|gif|webm|webp|tiff?)$/i);
  });

  it('should get API dog image url', async () => {
    const result = await axios({
      method: 'get',
      url: 'http://random.dog/woof.json',
    })
      .then(res => res.data)
      .catch(err => err.response.data);
    dogImage = result.url;
    expect(result.url).to.match(/\.(jpe?g|png|mp4|gif|webm|webp|tiff?)$/i);
  });

  it('should get API fox image url', async () => {
    const result = await axios({
      method: 'get',
      url: 'http://randomfox.ca/floof/',
    })
      .then(res => res.data)
      .catch(err => err.response.data);
    foxImage = result.image;
    expect(result.image).to.match(/\.(jpe?g|png|mp4|gif|webm|webp|tiff?)$/i);
  });

  it('should login in gmail', () => {
    let gmailUserName = process.env.GMAILUSERNAME;
    let gmailUserPassword = process.env.GMAILUSERPASSWORD;
    browser.newWindow(expectedGmail.path);
    browser.maximizeWindow();
    GmailPage.gmailUserName.setValue(gmailUserName);
    GmailPage.NextButton.click();
    browser.waitUntil(() => GmailPage.gmailUserPassword.isDisplayed());
    GmailPage.gmailUserPassword.setValue(gmailUserPassword);
    GmailPage.NextButton.click();
    browser.waitUntil(() => GmailPage.logoGmail.isDisplayed());
    expect(GmailPage.addCompose.isClickable()).eq(true);
  });

  it('should create letter in gmail account and send it to getnada email account', () => {
    GmailPage.addCompose.click();
    GmailPage.userEmailAnotherDomain.setValue(userEmail);
    GmailPage.subjectMessage.setValue(expectedGmail.subject);
    GmailPage.mailArea.setValue(catImage + '\n' + dogImage + '\n' + foxImage);
    GmailPage.sendButton.click();
    browser.waitUntil(() => GmailPage.confirmMessage.isDisplayed());
    expect(GmailPage.confirmMessageBox.isDisplayed()).eq(true);
  });

  it('should check email with 3 url in getnada email box', () => {
    browser.switchWindow( expected.path);                       //'https://getnada.com/');
    browser.waitUntil(() => GetnadaPage.email.isClickable(), {
      timeout: 120000,
    });
    GetnadaPage.email.click();
    browser.waitUntil(() => GetnadaIframePage.iframe.isDisplayed());
    const emailFrame = GetnadaIframePage.iframe;
    browser.switchToFrame(emailFrame);
    browser.waitUntil(() => browser.$('//a[text()="' + catImage + '"]').isDisplayed());
    browser.waitUntil(() => browser.$('//a[text()="' + dogImage + '"]').isDisplayed());
    browser.waitUntil(() => browser.$('//a[text()="' + foxImage + '"]').isDisplayed());
    catUrl = GetnadaIframePage.catUrl.getAttribute(expected.hrefAttr);
    dogUrl = GetnadaIframePage.dogUrl.getAttribute(expected.hrefAttr);
    foxUrl = GetnadaIframePage.foxUrl.getAttribute(expected.hrefAttr);
    expect(catUrl).eq(catImage);
    expect(dogUrl).eq(dogImage);
    expect(foxUrl).eq(foxImage);
  });

  it('should create img directory', () => {
    if (!fs.existsSync(expected.imgDirPath)) {
      fs.mkdirSync(expected.imgDirPath);
    }
    expect(fs.existsSync(expected.imgDirPath)).eq(true);
  });

  it('should take screenshot of cat image and save to a file', () => {
    fileName = expected.fileNameCat;
    browser.url(catUrl);
    browser.saveScreenshot(fileName);
    expect(fs.existsSync(fileName)).eq(true);
  });

  it('should take screenshot of dog image and save to a file', () => {
    fileName = expected.fileNameDog;
    browser.url(dogUrl);
    browser.saveScreenshot(fileName);
    expect(fs.existsSync(fileName)).eq(true);
  });

  it('should take screenshot of fox image and save to a file', () => {
    fileName = expected.fileNameFox;
    browser.url(foxUrl);
    browser.saveScreenshot(fileName);
    expect(fs.existsSync(fileName)).eq(true);
  });
});
