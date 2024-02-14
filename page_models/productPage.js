const { By, Select, until, ThenableWebDriver, Actions, Key } = require('selenium-webdriver');
const actions = require('wd/lib/actions');
const { keys, element } = require('wd/lib/commands');
const elementCommands = require('wd/lib/element-commands');



class ProductPage {

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

    async selectSortOptionZA() {
        const selectProductSort = await this.driver.findElement(By.className("product_sort_container"));
        const select = new Select(selectProductSort);
        await select.selectByValue("za");
    }

    async selectSortOptionPriceAsc() {
        const selectProductSort = await this.driver.findElement(By.className("product_sort_container"));
        const select = new Select(selectProductSort);
        await select.selectByValue("lohi");
    }

    async selectSortOptionPriceDsc() {
        const selectProductSort = await this.driver.findElement(By.className("product_sort_container"));
        const select = new Select(selectProductSort);
        await select.selectByValue("hilo");
    }

    async getProductNames() {        
        const productNames = await this.driver.findElements(By.className("inventory_item_name "));

        const productNameTexts = [];
        for(let i = 0; i < productNames.length; i++)
        {
            productNameTexts.push( await productNames[i].getText() );
        }

        return productNameTexts;
    }

    async getProductPrices() {
        const productPricesElements = await this.driver.findElements(By.className("inventory_item_price"));

        const priceStrings = [];
        for(let i = 0; i < productPricesElements.length; i++)
        {
            const getProductsTexts = await productPricesElements[i].getText();
            // Remove $ sign
            const productTextWithoutDollar = getProductsTexts.slice(1);
            priceStrings.push(Number(productTextWithoutDollar));
        }
        
        return priceStrings;
    }

    async getAddButtonText(index) {
        //look for addbutton for all products
        const addButton = await this.driver.findElements(By.className("btn_inventory"));

        return addButton[index].getText();
    }

    async clickAddButton(index) {
        //look for addbutton for all products
        const addButtons = await this.driver.findElements(By.className("btn_inventory"));

        return addButtons[index].click();
    }

    async getShoppingCartBadge() { 
       
        return this.driver.findElement(By.className("shopping_cart_badge"));
    }

    async getCartBadgeExist() { 
        
        return this.driver.findElements(By.className("shopping_cart_badge"))
                          .then(found => !!found.length);
     }

    async getShoppingCartBadgeNumber() {
        
        return this.driver.findElement(By.className("shopping_cart_badge")).getText();
    }

    async clickOnMenuButton() {
    
        return this.driver.findElement(By.id("react-burger-menu-btn")).click();
    }

    async clickCloseMenuButton() {
        const closeMenuButton = this.driver.findElement(By.className("bm-cross-button"));
        await this.driver.wait(until.elementIsVisible(closeMenuButton), 2000);

        return closeMenuButton.click()
    }
    async getMenuWrapperState() {
        const menuStateHidden = await this.driver.findElement(By.css(".bm-menu-wrap")).getAttribute("aria-hidden");
        
        if(menuStateHidden == "true") {
            return true;
        } else {
            return false;
        }
    
    }




}


module.exports = { ProductPage }
