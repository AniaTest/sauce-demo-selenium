import { By, Select, ThenableWebDriver } from "selenium-webdriver";

export class CartPage {

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

