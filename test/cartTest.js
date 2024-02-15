import { before, beforeEach, after } from "mocha";
import { Builder, ThenableWebDriver, until } from "selenium-webdriver";
import { assert } from "chai";
import { LoginPage } from "../page_models/loginPage.js";
import { ProductPage } from "../page_models/productPage.js";
import { CartPage } from "../page_models/cartPage.js";

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
