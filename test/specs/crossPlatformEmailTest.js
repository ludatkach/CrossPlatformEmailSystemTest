const { expect } = require('chai');
import axios from 'axios';
const fs = require('fs');
import GetnadaPage from '../pageobjects/Getnada.page';
import GetnadaIframePage from '../pageobjects/GetnadaIframe.page';
import GmailPage from '../pageobjects/Gmail.page';
import expected from '../data/expectedGetnada';
import expectedGmail from '../data/expectedGmail';
import apiData from '../data/apiData';

let userEmail;
let regExpObj;
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
      method: apiData.methods.get,
      url: apiData.urls.catUrl,
    })
      .then(res => res.data)
      .catch(err => err.response.data);
    catImage = result.file;
    regExpObj = new RegExp(apiData.regex.regexMatch, apiData.regex.regexFlagI);
    expect(result.file).to.match(regExpObj);
  });

  it('should get API dog image url', async () => {
    const result = await axios({
      method: apiData.methods.get,
      url: apiData.urls.dogUrl,
    })
      .then(res => res.data)
      .catch(err => err.response.data);
    dogImage = result.url;
    regExpObj = new RegExp(apiData.regex.regexMatch, apiData.regex.regexFlagI);
    expect(result.url).to.match(regExpObj);
  });

  it('should get API fox image url', async () => {
    const result = await axios({
      method: apiData.methods.get,
      url: apiData.urls.foxUrl,
    })
      .then(res => res.data)
      .catch(err => err.response.data);
    foxImage = result.image;
    regExpObj = new RegExp(apiData.regex.regexMatch, apiData.regex.regexFlagI);
    expect(result.image).to.match(regExpObj);
  });

  it('should login in gmail', () => {
    let gmailUserName = process.env.GMAILUSERNAME;
    let gmailUserPassword = process.env.GMAILUSERPASSWORD;
    browser.newWindow(expectedGmail.path);
    browser.maximizeWindow();

    GmailPage.gmailUserName.setValue(gmailUserName);
    GmailPage.emailNextButton.click();
    browser.waitUntil(() => GmailPage.gmailUserPassword.isDisplayed());
    GmailPage.gmailUserPassword.setValue(gmailUserPassword);
    GmailPage.passwordNextButton.click();
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
    browser.switchWindow( expected.path);
    browser.waitUntil(() => GetnadaPage.email.isClickable(), {
      timeout: 120000,
    });
    GetnadaPage.email.click();
    browser.waitUntil(() => GetnadaIframePage.iframe.isDisplayed());
    const emailFrame = GetnadaIframePage.iframe;
    browser.switchToFrame(emailFrame);
    browser.waitUntil(() => browser.$(expected.urlParts.urlBegin + catImage + expected.urlParts.urlEnd).isDisplayed());
    browser.waitUntil(() => browser.$(expected.urlParts.urlBegin + dogImage + expected.urlParts.urlEnd).isDisplayed());
    browser.waitUntil(() => browser.$(expected.urlParts.urlBegin + foxImage + expected.urlParts.urlEnd).isDisplayed());
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
