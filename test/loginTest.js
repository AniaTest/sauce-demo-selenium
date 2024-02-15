import { before, beforeEach, after } from "mocha";
import { Builder, ThenableWebDriver } from "selenium-webdriver";
import { assert } from "chai";
import { LoginPage } from "../page_models/loginPage.js";
import { STANDARD_USER_LOGIN, CORRECT_PASSWORD } from "./constants.js";
const LOCKED_OUT_USER_LOGIN = 'locked_out_user';
const LOGIN_ERROR_MESSAGE = "Epic sadface: Username and password do not match any user in this service";
const URL_AFTER_LOGIN = "https://www.saucedemo.com/inventory.html";

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

    });
 
    beforeEach(async function() {
        //setup
        await driver.get("https://www.saucedemo.com/");

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

            assert.equal(url, URL_AFTER_LOGIN);
        });

        it('try to login locked out user', async function() {
            await loginPage.setUsername(LOCKED_OUT_USER_LOGIN);
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
            
            assert.equal(errorMessage, LOGIN_ERROR_MESSAGE);
        });

        it('try to login with incorrect username', async function() {
            await loginPage.setUsername("hjdskhkjdsh");
            await loginPage.setPassword(CORRECT_PASSWORD);
            await loginPage.clickLoginButton();
            const errorMessage = await loginPage.getLockedOutUserError()
            
            assert.equal(errorMessage, LOGIN_ERROR_MESSAGE);
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
