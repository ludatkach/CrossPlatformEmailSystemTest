class BaseGmail {

  open (path) {
    return browser.url(path);
  }
}

export default new BaseGmail;
