const orderPage = require("./order.page");

class priorityReport {
    element = {
        search: () => cy.get(`[ng-model="filterValue"]`),
        clickIRBtn: () => cy.get(`[ng-click="startTasks('INITIAL_REVIEW')"]`),
        clickReconcialltionBtn: () => cy.get(`[ng-click="startTasks('PENDING_RECONCILIATION')"]`),
        clickFRBtn: () => cy.xpath(`//*[@ng-click="startTasks('FINAL_REVIEW')"]`),
        okBtn: () => cy.get(`[ng-click="howManyBulkModalOk()"]`),
        selectRow: () => cy.get(`[ng-model="row.isSelected"]`).first(),
        recWarning: () =>cy.xpath(`//*[@class='modal-title'][contains(.,'No work left to do for this team')]`),
        okBtnWarning: () =>cy.xpath(`//button[contains(text(),'OK')]`),
        sortByWaitTime: ()=>cy.xpath(`//span[text()='Wait Time']`)
    };

    startIR(tenantName) {
        this.element.search().should('be.visible').clear().type(tenantName);
        this.element.sortByWaitTime().should('be.visible').click();
        cy.wait(1000);
        this.element.selectRow().click();
        this.element.clickIRBtn().click();
        this.element.okBtn().should('be.visible').click();
        cy.wait(8000);
        orderPage.element.clickVendor().should('be.visible');
    }

    startReconcillations(tenantName) {
        this.element.search().should('be.visible').clear().type(tenantName);
        this.element.sortByWaitTime().should('be.visible').click();
        cy.wait(1000);
        this.element.selectRow().click();
        this.element.clickReconcialltionBtn().click();
        this.element.okBtn().click();
        cy.wait(8000);
    }

    startFR(tenantName) {
        this.element.search().type(tenantName);
        this.element.selectRow().click();
        this.element.clickFRBtn().click();
        this.element.okBtn().click();
        cy.wait(8000);
    }

    verifyStartReconcillationsAnalyst(tenantName) {
        this.element.search().should('be.visible').clear().type(tenantName);
        this.element.sortByWaitTime().should('be.visible').click();
        cy.wait(1000);
        this.element.selectRow().click();
        this.element.clickReconcialltionBtn().click();
    }

    noWorkLeftWarningForAnalyst(){
        this.element.recWarning().should('be.visible');
        this.element.okBtnWarning().should('be.visible').click();
    }
}
module.exports = new priorityReport();