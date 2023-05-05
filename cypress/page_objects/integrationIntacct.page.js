class integrationPage {
    element = {
        selectAccSysDD: () => cy.get(`[ng-model="mockForm.accountingIntegrationToAdd"]`),
        selectDDItem: () => cy.get(`.ui-select-choices-row-inner`),
        connectToAccSysBtn: () => cy.get(`[ng-click="connectAccounting()"]`),
        connectToIntacct: () => cy.get(`[ng-click="connect($event)"]`),
        intacctCompanyID: () => cy.get(`#companyId`),
        userID: () => cy.get(`#userId`),
        password: () => cy.get(`#password`),
        salesJHistoryCode: () => cy.get(`#salesEntryJournal`),
        salesJTitle: () => cy.get(`#salesEntryJournalTitle`),
        saveBtn: () => cy.xpath(`(//*[text()='Save'])[1]`),
        okBtn: () => cy.get(`.btn.btn-primary.bootbox-accept`),
        locationForInvoice: () => cy.get(`[name="invoiceLocationRefId"]`).select('Texas #10'),
        deptForInvoices: () => cy.get(`[name="invoiceDepartmentRefId"]`).select('Sales'),
        typeAccName: () => cy.xpath(`(//*[@aria-label="Select an Accounting System"])[1]`)
    };

    connectToIntacct() {
        this.element.selectAccSysDD().click();
        this.element.typeAccName().type("Intacct");
        this.element.selectDDItem().click();
        cy.wait(1000);
        this.element.connectToAccSysBtn().click();
        this.element.connectToIntacct().click();
        this.element.intacctCompanyID().type('MarginEdgeMPP-DEV');
        this.element.userID().type('Guest');
        this.element.password().type('M@rginEdge1!');
        this.element.salesJHistoryCode().type("GJ");
        this.element.salesJTitle().type("GJ");
        this.element.saveBtn().click();
        this.element.okBtn().click();
        //reload the page to open the dd
        cy.reload();
        cy.wait(5000);
        cy.reload();
        cy.wait(10000);
        cy.reload();
        cy.wait(10000);
        this.element.locationForInvoice({force: true});
        this.element.deptForInvoices({force: true});
        this.element.saveBtn().click();
        this.element.okBtn().click();
    }
}
module.exports = new integrationPage();