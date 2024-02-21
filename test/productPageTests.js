import { before, beforeEach, after } from "mocha";
import { Builder, ThenableWebDriver } from "selenium-webdriver";
import { assert } from "chai";
import { LoginPage } from "../page_models/loginPage.js";
import { ProductPage } from "../page_models/productPage.js";
import { STANDARD_USER_LOGIN, CORRECT_PASSWORD } from "./constants.js";
import { isHidden } from "wd/lib/asserters.js";

describe("Product page scenarios", function(){

    this.timeout(5000);
    /**
     * @type {ThenableWebDriver}
     */
    let driver;
    /**
     * @type {ProductPage}
     */
    let productPage;


    before(async function() {
        driver = await new Builder().forBrowser("chrome").build();
        // uncomment when you want to use an implicit wait for this driver session
        //await driver.manage().setTimeouts({ implicit: 1000 }); 
    });

    beforeEach(async function() {
        // setup
        await driver.get("https://www.saucedemo.com/");
        await driver.executeScript("localStorage.clear()");

        const loginPage = new LoginPage(driver)
        await loginPage.setUsername(STANDARD_USER_LOGIN);
        await loginPage.setPassword(CORRECT_PASSWORD);
        await loginPage.clickLoginButton();
        
        productPage = new ProductPage(driver);
    });

    after(async function() {
        driver.quit();
    });

    describe("sorting products", function() {

        it("sorts products by name from a-z", async function() {
            await productPage.selectSortOptionAZ();
            const productItems = await productPage.getProductNames();

            const copyOfProductItems = [...productItems];
            copyOfProductItems.sort();

            assert.sameOrderedMembers(productItems, copyOfProductItems);
        });

        it("sorts products by name from z-a", async function() {
            await productPage.selectSortOptionZA();
            const productItems = await productPage.getProductNames();

            const copyOfProductItems = [...productItems];
            copyOfProductItems.sort().reverse();

            assert.sameOrderedMembers(productItems, copyOfProductItems);
        });

        it("sorts products by price from ascending", async function() {
            await productPage.selectSortOptionPriceAsc();
            const productPrices = await productPage.getProductPrices();
            
            const copyOfProductPrices = [...productPrices];
            // sort ascending
            copyOfProductPrices.sort((a, b) => a - b);

            assert.sameOrderedMembers(productPrices, copyOfProductPrices);
        });

        it("sorts products by price from descending", async function() {
            await productPage.selectSortOptionPriceDsc();
            const productPrices = await productPage.getProductPrices();
            
            const copyOfProductPrices = [...productPrices];
            // sort descending
            copyOfProductPrices.sort((a, b) => b - a);

            assert.sameOrderedMembers(productPrices, copyOfProductPrices);
        });
    });

    describe("adding products to a cart ", function() {

        it("add product to a cart and check if the add button changes to remove", async function() {
            const productTitle = "Sauce Labs Bike Light";

            let buttonText = await productPage.getAddRemoveButtonText(productTitle);
            assert.equal("Add to cart", buttonText);

            await productPage.addProductByTitle(productTitle);
            // check if button text changed to remove
            buttonText = await productPage.getAddRemoveButtonText(productTitle);
            assert.equal("Remove", buttonText);

            // check if button text changed to add
            await productPage.addProductByTitle(productTitle);
            
            buttonText = await productPage.getAddRemoveButtonText(productTitle);
            assert.equal("Add to cart", buttonText);
        });

        it("check if cart badge is diplayed and hidden when product added and removed", async function() {
            // check badge not exist
            const badge = await productPage.getCartBadgeExist();
            assert.equal(badge, false);

            // add to cart
            await productPage.clickAddButton(1);
            const badgeText = await productPage.getShoppingCartBadgeNumber();

            // check badge exists
            assert.equal(badgeText, "1");

            // remove from cart
            await productPage.clickAddButton(1);
            await productPage.getCartBadgeExist();

            // check badge not exist
            assert.equal(badge, false);
        });
        
        it("add more than one product to the cart and check if number on cart badge changes", async function() {
            const badge = await productPage.getCartBadgeExist();
            assert.equal(badge, false);
            
            await productPage.clickAddButton(1);

            const badgeText = await productPage.getShoppingCartBadgeNumber();
            assert.equal(badgeText, "1");

            await productPage.clickAddButton(2);

            const badgeTextAddOne = await productPage.getShoppingCartBadgeNumber();
            assert.equal(badgeTextAddOne, "2");

            await productPage.clickAddButton(2);

            const badgeTextminusOne = await productPage.getShoppingCartBadgeNumber();
            assert.equal(badgeTextminusOne, "1");
        });
    });

    describe("open menu", function() {

        it.only("click on menu and check if it opens and closes", async function() {
            let isHidden = await productPage.isMenuHidden()
            
            assert.equal(isHidden, true);
            
            //click on "menu" button and check it is opened
            await productPage.clickOnMenuButton();
            const isDisplayed = await productPage.isMenuDisplayed()
            
            assert.equal(isDisplayed, true);
            
            //click on "close menu" button and check it is closed
            await productPage.clickCloseMenuButton();
            isHidden = await productPage.isMenuHidden();
            
            assert.equal(isHidden, true);
        });

    });

});
