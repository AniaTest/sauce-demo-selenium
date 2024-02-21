import { By, ThenableWebDriver } from "selenium-webdriver";

export class LoginPage {

    constructor(driver) {
        /**
         * @type {ThenableWebDriver}
         */
        this.driver = driver;
    }

    // Elements
    el_productsPageTitle() {
        return this.driver.findElement(By.css(".title"));
    }

    el_usernameInput() {
        return this.driver.findElement(By.id("user-name"));
    }
    
    el_usernameInput() {
        return this.driver.findElement(By.id("user-name"));
    }

    el_passwordInput() {
        return this.driver.findElement(By.id("password"));
    }

    el_loginButton() {
        return this.driver.findElement(By.id("login-button"));
    }

    el_LockedOutUserError() {
        return this.driver.findElement(By.className("error-message-container"));
    }

    el_closeErrorButton() {
        return this.driver.findElement(By.className("error-button"));
    }
    
    // Methods
    async getUrl() {
        return this.driver.getCurrentUrl();
    }

    // function with explicit wait 
    /*async getProductsPageTitle() {
        const productsPageTitle = this.driver.findElement(By.css(".title"));
        this.driver.wait(until.elementIsVisible(productsPageTitle, 2000));
        return productsPageTitle.getText();
    }*/
    
    // function with explicit wait with custom condition 
    async getProductsPageTitle() {
        
        const productsPageTitle = await this.el_productsPageTitle();
        this.driver.wait(function() {
            return productsPageTitle.isDisplayed();
        }, 3000);
        
        return productsPageTitle.getText();
    }

    async setUsername(user) {
        const usernameInput = await this.el_usernameInput();
        
        return usernameInput.sendKeys(user);
    }

    async clearUsernameInput() {
        const usernameInput = await this.el_usernameInput();
        
        return usernameInput.clear();
    }

    async setPassword(password) {
        const passwordInput = await this.el_passwordInput();
        
        return passwordInput.sendKeys(password);
    }

    async clearPasswordInput() {
        const passwordInput = await this.el_passwordInput();
        
        return passwordInput.clear();
    }

    async clickLoginButton() {
        const loginButton = await this.el_loginButton();

        return loginButton.click();
    }
    
    async getLockedOutUserError() {
        const lockedOutUserError = await this.el_LockedOutUserError();

        return lockedOutUserError.getText();
    }
    
    async clickCloseErrorButton() {
        const closeErrorButton = await this.el_closeErrorButton();

        return closeErrorButton.click();
    }
}
