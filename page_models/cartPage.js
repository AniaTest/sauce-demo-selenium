import { By, Select, ThenableWebDriver } from "selenium-webdriver";

export class CartPage {


    constructor(driver) {
        /**
         * @type {ThenableWebDriver}
         */
        this.driver = driver;
    }
    // Elements

    el_linktoProductFromCart() {
        //currently only for "Sauce Labs Bike Light"
        return this.driver.findElement(By.id("item_0_title_link"));
    }

    el_removeProductFromCartButton() {
        return this.driver.findElement(By.id("remove-sauce-labs-bike-light"));
    }

    el_productListedInCart() {
        return this.driver.findElements(By.className("cart_item_label"));
    }

    // Methods
    async clickProductLink() {
        const cartItemLink = await this.el_linktoProductFromCart();
        //await driver.wait(until.elementIsVisible(cartItemLink), 3000);

        return cartItemLink.click();
    }

    async getUrl() {
        return this.driver.getCurrentUrl();
    }

    async clickRemoveButton() {
        const removeProductFromCartButton = this.el_removeProductFromCartButton();

        return removeProductFromCartButton.click();
    }

    async itemNotFoundInCart() {
        const productListedInCart = await this.el_productListedInCart();

        return !!productListedInCart.length;
    }



}

