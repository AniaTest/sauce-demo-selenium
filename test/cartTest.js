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
     * @type {CartPage}
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
        const loginPage = new LoginPage(driver);
        await loginPage.setUsername(STANDARD_USER_LOGIN);
        await loginPage.setPassword(CORRECT_PASSWORD);
        await loginPage.clickLoginButton();
        const productPage = new ProductPage(driver);
        await productPage.addProductByTitle("Sauce Labs Bike Light")
        await productPage.clickCartButton();

        
        cartPage = new CartPage(driver);
    });

    after(async function() {
        
        driver.quit();

    });

    describe('adding products to a cart', function() {

        it('check if product listed in the cart can be opened', async function() {
            await cartPage.clickProductLink();
            const productUrl = await cartPage.getUrl()
            
            assert.equal("https://www.saucedemo.com/inventory-item.html?id=0", productUrl)
        });

        it.only('check if product listed in the cart can be removed', async function() {
            await cartPage.clickRemoveButton();
            const itemNotFoundInCart = await cartPage.itemNotFoundInCart()

            assert(true, itemNotFoundInCart)
        });

    });

    describe('removing products from a cart ', function() {

        
        
    });



});
