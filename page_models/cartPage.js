const { By, Select, until, ThenableWebDriver, Actions, Key } = require('selenium-webdriver');
const actions = require('wd/lib/actions');
const { keys, element } = require('wd/lib/commands');
const elementCommands = require('wd/lib/element-commands');



class CartPage {

    constructor(driver) {
        /**
         * @type {ThenableWebDriver}
         */
        this.driver = driver;
    }
    
    async getUrl() {
       return this.driver.getCurrentUrl();
    } 

    async selectSortOptionAZ() {
        const selectProductSort = await this.driver.findElement(By.className("product_sort_container"));
        const select = new Select(selectProductSort);
        await select.selectByValue("az");
    }



}


module.exports = { CartPage }
