const { By, Select, until, ThenableWebDriver, Actions, Key } = require('selenium-webdriver');
const actions = require('wd/lib/actions');
const { keys } = require('wd/lib/commands');
const elementCommands = require('wd/lib/element-commands');
const { doubleClick } = require('wd/lib/element-commands');
// import { By, Select, until } from 'selenium-webdriver';



class LoginPage {

    constructor(driver) {
        /**
         * @type {ThenableWebDriver}
         */
        this.driver = driver;
    }
    
    async getUrl() {
       return this.driver.getCurrentUrl();
    }

    //funkcja z uzyciem explicit wait 
    /*async getProductsPageTitle() {
        const productsPageTitle = this.driver.findElement(By.css(".title"));
        this.driver.wait(until.elementIsVisible(productsPageTitle,2000));
        return productsPageTitle.getText();
    }*/
    
    //funkcja z uzyciem explicit wait z custom condition
    async getProductsPageTitle() {
        const productsPageTitle = this.driver.findElement(By.css(".title"));
        
        this.driver.wait(function() {
            return productsPageTitle.isDisplayed
        }, 3000);
        
        return productsPageTitle.getText();
    }

    async setUsername(user) {
        const usernameInput = await this.driver.findElement(By.id("user-name"));
        
        return usernameInput.sendKeys(user);
    }

    async clearUsernameInput() {
        const usernameInput = await this.driver.findElement(By.id("user-name"));
        
        return usernameInput.clear();
    }

    async setPassword(password) {
        const passwordInput = await this.driver.findElement(By.id("password"));
        
        return passwordInput.sendKeys(password);
    }
    
    async clearPasswordInput() {
        const passwordInput = await this.driver.findElement(By.id("password"));
        
        return passwordInput.clear();
    }

    async clickLoginButton() {
        
        return this.driver.findElement(By.id("login-button")).click();
    }
    
    async getLockedOutUserError() {
        
        return this.driver.findElement(By.className("error-message-container")).getText();
    }
    
    async clickCloseErrorButton() {
        
        return this.driver.findElement(By.className("error-button")).click();
    }
}

module.exports = { LoginPage }
