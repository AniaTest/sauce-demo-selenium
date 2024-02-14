const { before, beforeEach, after } = require('mocha');
const { Builder, ThenableWebDriver, until } = require('selenium-webdriver');
const expect = require('chai').expect;
const { LoginPage } = require('../page_models/loginPage');
const { assert } = require('chai');
const { waitFor } = require('wd/lib/commands');
const { elementIsVisible } = require('selenium-webdriver/lib/until');

const STANDARD_USER_LOGIN = 'standard_user';
const lockedOutUserLogin = 'locked_out_user';
const CORRECT_PASSWORD = 'secret_sauce';
const loginErrorMessage = "Epic sadface: Username and password do not match any user in this service";
const urlAfterLogin = "https://www.saucedemo.com/inventory.html";

describe('login to the app', function() {

    this.timeout(5000);
    /**
     * @type {ThenableWebDriver}
     */
    let driver;
    /**
     * @type {LoginPage}
     */
    let loginPage;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        // uncomment when you want to use an implicit wait for this driver session
        //await driver.manage().setTimeouts({ implicit: 1000 }); 
    });
 
    beforeEach(async function() {
        //setup
        await driver.get('https://www.saucedemo.com/');

        loginPage = new LoginPage(driver);
    
    });

    after(async function() {
        //teardown
        //await driver.quit();
    });

    describe('login to the page', function() {
        it('login with standard user', async function() {
            await loginPage.setUsername(STANDARD_USER_LOGIN);
            await loginPage.setPassword(CORRECT_PASSWORD);
            await loginPage.clickLoginButton();
            const url = await loginPage.getUrl();
            
            assert.equal(url,urlAfterLogin);
        });
        
        it('try to login locked out user', async function() {
            await loginPage.setUsername(lockedOutUserLogin);
            await loginPage.setPassword(CORRECT_PASSWORD);
            await loginPage.clickLoginButton();
            const errorMessage = await loginPage.getLockedOutUserError()
            
            assert.equal(errorMessage,"Epic sadface: Sorry, this user has been locked out.");
        });

        it('try to login with incorrect password', async function() {
            await loginPage.setUsername(STANDARD_USER_LOGIN);
            await loginPage.setPassword("jihioh");
            await loginPage.clickLoginButton();
            const errorMessage = await loginPage.getLockedOutUserError()
            
            assert.equal(errorMessage,loginErrorMessage);
        });

        it('try to login with incorrect username', async function() {
            await loginPage.setUsername("hjdskhkjdsh");
            await loginPage.setPassword(CORRECT_PASSWORD);
            await loginPage.clickLoginButton();
            const errorMessage = await loginPage.getLockedOutUserError()
            
            assert.equal(errorMessage,loginErrorMessage);
        });

        it('try to login with incorrect password, dismiss error and login correctly', async function() {
            await loginPage.setUsername(STANDARD_USER_LOGIN);
            await loginPage.setPassword("sdjcdscn");
            await loginPage.clickLoginButton();

            await loginPage.clickCloseErrorButton();
            
            await loginPage.clearUsernameInput();
            await loginPage.setUsername(STANDARD_USER_LOGIN);
            
            await loginPage.clearPasswordInput();
            await loginPage.setPassword(CORRECT_PASSWORD);
            
            await loginPage.clickLoginButton();

            const productsPageTitle = await loginPage.getProductsPageTitle();
            
            assert.equal(productsPageTitle, "Products");
        });


    });
});
