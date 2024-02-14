const { before, beforeEach, after } = require('mocha');
const { LoginPage } = require('../page_models/loginPage');
const { ProductPage } = require('../page_models/productPage');
const { Builder, ThenableWebDriver, until } = require('selenium-webdriver');
const { assert } = require('chai');
const { CartPage } = require('../page_models/cartPage');

const STANDARD_USER_LOGIN = 'standard_user';
const CORRECT_PASSWORD = 'secret_sauce';

describe('Cart page scenarios', function(){

    this.timeout(5000);
    /**
     * @type {ThenableWebDriver}
     */
    let driver;
    /**
     * @type {ProductPage}
     */
    let cartPage;


    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        // uncomment when you want to use an implicit wait for this driver session
        //await driver.manage().setTimeouts({ implicit: 1000 }); 
    });

    beforeEach(async function() {
        //setup
        await driver.get('https://www.saucedemo.com/');
        await driver.executeScript("localStorage.clear()");
        const loginPage = new LoginPage(driver)
        await loginPage.setUsername(STANDARD_USER_LOGIN);
        await loginPage.setPassword(CORRECT_PASSWORD);
        await loginPage.clickLoginButton();
        
        cartPage = new CartPage(driver);
    });

    after(async function() {
        
        driver.quit();

    });

    describe('add product to a cart and check if it is displayed in the cart page', function() {


    });

    describe('adding products to a cart ', function() {


        
        
    });



});
