import { By, Select, until, ThenableWebDriver } from "selenium-webdriver";

export class ProductPage {

    constructor(driver) {
        /**
         * @type {ThenableWebDriver}
         */
        this.driver = driver;
    }
    
    // Elements
    el_productSortSelect() {
        return this.driver.findElement(By.className("product_sort_container"));
    }

    el_productNames() {
        return this.driver.findElements(By.className("inventory_item_name "));
    }

    el_productPrices() {
        return this.driver.findElements(By.className("inventory_item_price"));
    }

    el_addButtons() {
        return this.driver.findElements(By.className("btn_inventory"));
    }

    el_shoppingCartBadge() { 
       return this.driver.findElement(By.className("shopping_cart_badge"));
    }

     el_shoppingCartBadgeElements() { 
       return this.driver.findElements(By.className("shopping_cart_badge"));
    }

    el_menuButton() {
        return this.driver.findElement(By.id("react-burger-menu-btn"));
    }

    el_closeMenuButton() {
        return this.driver.findElement(By.className("bm-cross-button"));
    }

    el_menuDrawer() {
        return this.driver.findElement(By.css(".bm-menu-wrap"));

    }

    // Methods 
    async selectSortOption(sortOption) {
        const productSortSelect = await this.el_productSortSelect();
        const select = new Select(productSortSelect);
        await select.selectByValue(sortOption);
    }

    async selectSortOptionAZ() {
        await this.selectSortOption("az");
    }

    async selectSortOptionZA() {
        await this.selectSortOption("za");
    }

    async selectSortOptionPriceAsc() {
        await this.selectSortOption("lohi");
    }

    async selectSortOptionPriceDsc() {
        await this.selectSortOption("hilo");
    }

    async getProductNames() {        
        const productNames = await this.el_productNames();

        const productNameTexts = [];
        for(let i = 0; i < productNames.length; i++)
        {
            productNameTexts.push( await productNames[i].getText() );
        }

        return productNameTexts;
    }

    async getProductPrices() {
        const productPricesElements = await this.el_productPrices()

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
        const addButtons = await this.el_addButtons();

        return addButtons[index].click();
    }

    async getCartBadgeExist() { 
        const shoppingCartBadgeElements = await this.el_shoppingCartBadgeElements();

        return !!shoppingCartBadgeElements.length ;
    }

    async getShoppingCartBadgeNumber() {
        const shoppingCartBadge = await this.el_shoppingCartBadge();
        
        return shoppingCartBadge.getText();
    }

    async clickOnMenuButton() {
        const menuButton = await this.el_menuButton();
        return menuButton.click();
    }

    async clickCloseMenuButton() {
        const closeMenuButton = await this.el_closeMenuButton();
        await this.driver.wait(until.elementIsVisible(closeMenuButton), 2000);

        return closeMenuButton.click()
    }
    async getMenuWrapperState() {
        const menuStateHidden = await this.el_menuDrawer().getAttribute("aria-hidden");
        
        if(menuStateHidden == "true") {
            return true;
        } else {
            return false;
        }
    
    }




}
