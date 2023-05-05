class paymentMapPage {
    element = {
        selctRow: () => cy.xpath(`(//*[@class='ui-grid-cell-contents ng-binding ng-scope'])[2]`),
        selectInternalRow: () => cy.xpath(`//*[@class='ui-select-match-text pull-left']`),
        addTxt: () => cy.xpath(`//*[@aria-label="Select box"]`),
        selectItem: () => cy.xpath(`(//*[@class='ui-select-choices-row-inner'])[1]`),
        saveBtn: () => cy.get(`[ng-click="saveSync()"]`)
    };

    paymentMapping() {
        cy.wait(5000);
        this.element.selctRow().dblclick();
        this.element.selectInternalRow().click();
        this.element.addTxt().type("Suntrust");
        this.element.selectItem().click();
        this.element.saveBtn().click();
        cy.reload();
    }
}
module.exports = new paymentMapPage();