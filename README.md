## CrossPlatformEmailsTest
###Task
* Open browser and go to https://getnada.com. Generate new email adress and save it.
* Get random API links from [RandomCat](https://getnada.com), [RandomDog](https://random.dog/woof.json), [RandomFox](https://randomfox.ca/floof/) 
* Send email with these three links from gmail account to email from Step1 (getnada.com)
* Wait until letter come to  https://getnada.com  and check if it has  three urls.
* Click on each link in email, make screenshot of each image and save it to some directory.
###Technologies
The project created on Node.js platform with WebDriverIO and Chai assertion library
###Launch
To use this project, perform the following steps:
1. Install [Node.js](https://nodejs.org/en/)
2. Install [WebDriverIO](https://webdriver.io/docs/gettingstarted.html) 
3. Clone repository
4. Run `npm install`

####To run tests:
* Run `npm test`
