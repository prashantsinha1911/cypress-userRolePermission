class priceAlertPage {
    element = {
        priceAlertBtn: () => cy.get(`button[href="#/priceAlert/new"]`),
        clickVendorDD: () => cy.get(`div[ng-change="selectVendor()"]`),
        categories: () => cy.xpath(`//*[@href="#/productType"]//*[@role="button"]`),
        selectItemFromDD: () => cy.xpath(`(//*[@class="ui-select-choices-row-inner"])[1]`),
        clickVIDD: () => cy.get(`div[ng-model="alert.centralVendorProduct"]`),
        clickPODD: () => cy.get(`div[ng-model="alert.centralVendorProductUnit"]`),
        applyRule: () => cy.get(`input[ng-model="alert.effectiveDate"]`),
        clickToday: () => cy.get(`button[ng-click="select('today', $event)"]`),
        enterPrice: () => cy.get(`input[ng-model="alert.price"]`),
        saveBtn: () => cy.get(`button[ng-if="hasAccessToWholeCompanyConcept"]`)
     };

     createPriceAlert() {
        this.element.priceAlertBtn().click();
        cy.wait(2000);
        this.element.clickVendorDD().click();
        this.element.selectItemFromDD().click();
        this.element.clickVIDD().click();
        this.element.selectItemFromDD().click();
        this.element.clickPODD().click();
        this.element.selectItemFromDD().click();
        this.element.applyRule().click();
        this.element.clickToday().click();
        this.element.enterPrice().type("10");
        this.element.saveBtn().click();
     }

};
module.exports = new priceAlertPage();
