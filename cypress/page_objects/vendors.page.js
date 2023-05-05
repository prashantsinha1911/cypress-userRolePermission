const assertionPage = require("./assertion.page");
const testData = require("../fixtures/rolePermission.json");
const utilObj = require("../utils/util_generic");
class vendorPage {
    element = {
        addNewVendor: () => cy.xpath(`//*[@ui-sref="vendorNew"]`),
        addVendorName: () => cy.xpath(`(//*[@name="name"])[1]`),
        addVendorName2: () => cy.xpath(`(//*[@name="name"])[2]`),
        saveBtn: () => cy.get(`#vendorSaveBtn`),
        filterSearch: () => cy.xpath(`//*[@ng-model="filterValue"]`),
        assertionList: () => cy.get('.ui-grid-row.ng-scope'),
        selectItemFromRow: () => cy.xpath(`(//*[@class='ui-grid-row ng-scope'])[1]`),
        placeNewOrder: () => cy.xpath(`//*[@translate="inviosoApp.vendor.placeNewOrder"]`),
        addQuantity: () => cy.xpath(`(//*[@name="li.quantity"])[1]`),
        sendBtn: () => cy.xpath(`//*[@ng-click="saveAndSend($event)"]`),
        sendBtnConfirm: () => cy.xpath(`//*[@ng-click="doSaveAndSend($event)"]`),
        onlineOrder: () => cy.xpath(`//*[text()='Will you be placing orders via MarginEdge?']`),
        addEmail: () => cy.xpath(`//*[@ng-model="vendor.preferredOrderAddress"]`),
        viewVendorList: () => cy.xpath(`//*[@ng-style="colContainer.getViewportStyle()"]`),
        configureDetailsBtn: () => cy.get(`[href="#/vendor/defaultSettings"]`),
        deleteVendor: () => cy.get(`[ng-click="delete()"]`),
        editVendor: () => cy.contains('Edit Vendor'),
        downloadtoolTip: () => cy.get(`[uib-tooltip="Download order guide"]`),
        orderGuideSetup: () => cy.get(`#orderGuideSetupBtn`),
        multiUnitOrderGuide: () => cy.xpath(`//*[@ng-click='multiTenantOrderGuide($event)']`),
        editVendorBtn: () => cy.xpath(`//button[@class='btn btn-sm btn-primary pull-right']`),
        confirmDeleteBtn: () => cy.xpath(`//*[@ng-disabled='deleteForm.$invalid']`),
        okConfirm: () => cy.xpath(`//*[@class="btn btn-primary bootbox-accept"]`),
        addVI: () => cy.get(`button[ng-click="addVendorItem($event)"]`),
        searchVIinOG: () => cy.get(`div[ng-model="newVendorItem.vendorProduct"]`),
        typeVI: () => cy.get(`input[placeholder="Search for an item code or item name..."]`),
        selectCheck: () => cy.xpath(`(//*[@class='icheckbox_minimal-blue'])[3]`),
        saveBtnOG: () => cy.get(`button[ng-click="handleAddNewVendorItem($event)"]`),
        selectItem: () => cy.get(`.ui-select-choices-row-inner`),
        saveAndLeave: () => cy.get(`button[ng-click="saveSetupAndLeave()"]`),
        invalidEmailTextBar: () => cy.get(`#invalidEmail`),
        onlineOrderCheckBoxLabel: () => cy.get(`#checkBoxLabel >.icheckbox_minimal-blue`),
        decimalQuantitiesCheckBox: () => cy.get(`#allowDecimalQuanties`),
        orderUpdateCheckBox: () => cy.get(`#allowResending`),
        // same id is used in same elements in different pages
        noDueDate: () => cy.get(`#noDueDate`),
        dueDateinDays: () => cy.get(`#dueDateinDays`),
        dueDateinMonths: () => cy.get(`#dueDateinMonths`),
        dueDateField: () => cy.get(`[name='paymentTermDueNumberOfDays']`),
        parCheckBox: () => cy.get(`input[name='includePar']`),
        parCheckBoxLabel: () => cy.get(`#parCheckBox`),
        oneParRadio: () => cy.get(`[ng-change='oneParSelected()']`),
        parInputFields: () => cy.xpath(`(//*[@name='parValue'])[1]`),
        dailyParRadio: () => cy.get(`[ng-change='dailyParSelected()']`),
        parInputFields: () => cy.xpath(`(//*[@name='parValue'])[1]`),
        parValueDefault: () => cy.xpath(`(//*[@name='parValueDefault'])[1]`),
        parValueMonday: () => cy.xpath(`(//*[@name='parValueMon'])[1]`),
        parValueTuesday: () => cy.xpath(`(//*[@name='parValueTue'])[1]`),
        parValueWednesday: () => cy.xpath(`(//*[@name='parValueWed'])[1]`),
        parValueThursday: () => cy.xpath(`(//*[@name='parValueThurs'])[1]`),
        parValueFriday: () => cy.xpath(`(//*[@name='parValueFri'])[1]`),
        parValueSaturday: () => cy.xpath(`(//*[@name='parValueSat'])[1]`),
        parValueSunday: () => cy.xpath(`(//*[@name='parValueSun'])[1]`),
        lastCountChekcBox: () => cy.get(`#lastCountCheckBox`),
        requestEDIInvoiceBtn: () => cy.get(`#requestEDIInvoiceBtn`),
        selectEDIProcessingDD: () => cy.get(`select[name='ediMode']`),
        selectVendorCreditMode: () => cy.get(`select[name='vendorCreditMode']`),
        vendorAccNumber: () => cy.get(`input[name='accountNumber']`),
        ediAccountNumber: () => cy.get(`input[name='myAccountNumber']`),
        ediSalesRepMail: () => cy.get(`input[name='salesRepEmail']`),
        ediRestaurantPermission: () => cy.get(`#ediRestaurantPermission`),
        confirmRequestEDIInvoices: () => cy.get(`#confirmRequestEDIInvoices`),
        noEdiInvoiceLabel: () => cy.get(`#noEdiInvoiceLabel`),
        preRequestEdiInvoiceLabel: () => cy.get(`#preRequestEdiInvoiceLabel`),
        // same locator for both editVendor page and vendor form page
        verifyVendorName: (vendorName) => cy.xpath(`//*[@data-testid='${vendorName}']`)
    };

    createVendor(vendorName, email) {
        this.element.addNewVendor().should('be.visible').click();
        this.element.addVendorName().should('be.visible').clear().type(vendorName);
        this.element.onlineOrder().click();
        this.element.addEmail().should('be.visible').clear().type(email);
        this.element.saveBtn().should('not.be.disabled').click();
        cy.wait(2000);
        this.element.addNewVendor().should('be.visible');
    }

    createVendorWithOnlyName(vendorName) {
        this.element.addNewVendor().should('be.visible').click();
        this.element.addVendorName().should('be.visible').type(vendorName);
        this.element.saveBtn().should('be.visible').click();
        this.element.addNewVendor().should('be.visible');
    }

    placeNewOrder() {
        this.element.selectItemFromRow().click();
        cy.wait(3000);
        this.element.placeNewOrder().click();
        cy.wait(3000);
        this.element.addQuantity().type("4");
        cy.wait(3000);
        this.element.sendBtn().click();
        this.element.sendBtnConfirm().click();
        cy.wait(7000);
        cy.reload();
    }

    viewVendors() {
        this.element.viewVendorList().should('be.visible');
    }

    checkAddVendorAndConfigureDetails() {
        this.element.configureDetailsBtn().should('not.be.visible');
        this.element.addNewVendor().should('not.be.visible');
    }

    configureDefaults() {
        this.element.configureDetailsBtn().should('be.visible');
    }

    checkDeleteAndEditVendor() {
        this.element.assertionList().click();
        this.element.deleteVendor().should('not.exist');
        this.element.editVendor().should('be.disabled');
    }

    download() {
        this.element.filterSearch().should('be.visible').clear().type("Arrow");
        this.element.downloadtoolTip().should('be.visible').click();
        cy.readFile('cypress/downloads/orderGuide.pdf').should('exist');
    }

    configureOrderGuide() {
        this.element.orderGuideSetup().should('be.visible').click();
        this.element.addVI().should('be.visible');
    }

    multiUnitOrderGuideSetup() {
        // manage Items for all restaurants is only visible while having at least two units with same company concept
        this.element.multiUnitOrderGuide().then($el => {
            if (!$el.hasClass('ng-hide')) {
                this.element.multiUnitOrderGuide().click();
                cy.wait(2000);
                assertionPage.checkContentDisplayed();
            }
        });
    }

    selectVendor(vendorName) {
        this.element.filterSearch().should('be.visible').clear().type(vendorName, { delay: 0 });
        this.element.selectItemFromRow().should('be.visible').click();
        this.element.verifyVendorName(vendorName).should('be.visible');
    }

    editAndDeleteVendor(vendorName) {
        let editedVendorName = "Edited" + vendorName;
        this.element.editVendorBtn().should('not.be.disabled').click();
        cy.wait(2000);
        this.element.verifyVendorName(vendorName).should('be.visible');
        cy.wait(1000);
        this.element.addVendorName2().clear().type(editedVendorName);
        this.element.saveBtn().should('be.visible').click();
        this.element.okConfirm().should('be.visible').click();
        cy.wait(1000);
        this.deleteVendor(editedVendorName);
    }

    deleteVendor(vendorName) {
        this.element.editVendorBtn().should('not.be.disabled').click();
        this.element.verifyVendorName(vendorName).should('be.visible');
        this.element.deleteVendor().scrollIntoView().should('be.visible').click();
        this.element.confirmDeleteBtn().should('be.visible').click();
        cy.wait(2000);
        assertionPage.verifyPageSearchFilter();
    }

    editVendor(vendorName, editedVendorName) {
        this.element.editVendorBtn().should('not.be.disabled').click();
        this.element.verifyVendorName(vendorName).should('be.visible');
        cy.wait(1000);
        this.element.addVendorName2().should('be.visible').clear().type(editedVendorName);
        this.element.saveBtn().should('not.be.disabled').click();
        this.element.okConfirm().should('be.visible').click();
        this.element.editVendorBtn().should('not.be.disabled');
    }

    addVIinOrderGuide(vi) {
        this.element.addVI().click();
        this.element.searchVIinOG().click();
        this.element.typeVI().type(vi);
        this.element.selectItem().click();
        this.element.selectCheck().click();
        this.element.saveBtnOG().click();
        cy.wait(2000);
        this.element.saveAndLeave().click();
    }

    verifyVendorMail() {
        this.element.editVendor().should('not.be.disabled').click();
        this.element.addEmail().clear().type("edge.testlab@gmail.com", { delay: 0 });
        this.element.invalidEmailTextBar().should('not.be.visible');
    }

    uncheckOnlineOrder(vendorName) {
        this.selectVendor(vendorName);
        this.element.editVendorBtn().should('not.be.disabled').click();
        this.element.verifyVendorName(vendorName).should('be.visible');
        cy.wait(2000);
        this.element.onlineOrderCheckBoxLabel().should('be.visible').then($el => {
            if ($el.hasClass('checked')) {
                this.element.onlineOrder().should('be.visible').click();
            }
        })
        this.element.addEmail().should('not.be.visible');
        this.element.saveBtn().should('not.be.disabled').click();
        this.element.editVendorBtn().should('not.be.disabled');
    }

    createVednorWithUncheckingUpdates(vendorName, email) {
        this.element.addNewVendor().should('be.visible').click();
        this.element.addVendorName().should('be.visible').clear().type(vendorName);
        this.element.onlineOrder().click();
        this.element.addEmail().should('be.visible').clear().type(email);
        // unchecking checkboxes
        this.element.decimalQuantitiesCheckBox().click();
        this.element.orderUpdateCheckBox().click();
        this.addDuedate(5);
        this.element.saveBtn().should('not.be.disabled').click();
        this.element.addNewVendor().should('be.visible');
    }

    addDuedate(noOfDays) {
        this.element.dueDateinDays().should('be.visible').click();
        this.element.dueDateField().should('be.visible').scrollIntoView().clear().type(noOfDays);
    }

    verifyVendorPaymentTerms(noOfDays) {
        this.element.editVendorBtn().should('not.be.disabled').click();
        this.element.dueDateField().should('have.value', noOfDays);
    }

    selectOnePar() {
        this.element.editVendorBtn().should('not.be.disabled');
        this.element.orderGuideSetup().should('be.visible').click();
        this.element.saveAndLeave().should('be.visible');
        cy.get(`[name='includeLastCount']`).then($el => {
            if ($el.hasClass('ng-empty')) {
                this.element.lastCountChekcBox().should('be.visible').click();
            }
        })
        this.element.parCheckBox().then($el => {
            if ($el.hasClass('ng-empty')) {
                this.element.parCheckBoxLabel().should('be.visible').click();
            }
        });
        // one par is selected by default
        this.element.oneParRadio().click();
        this.element.parInputFields().should('be.visible').scrollIntoView().clear().type(testData.parDefaultValue);
        this.element.saveAndLeave().should('be.visible').click();
        this.element.editVendorBtn().should('not.be.disabled');
    }

    selectDailyPar() {
        this.element.editVendorBtn().should('not.be.disabled');
        this.element.orderGuideSetup().should('be.visible').click();
        this.element.saveAndLeave().should('be.visible');
        this.element.parCheckBox().then($el => {
            if ($el.hasClass('ng-empty')) {
                this.element.parCheckBox().should('be.visible').click();
            }
        });
        this.element.dailyParRadio().should('be.visible').click();
        this.element.parValueDefault().should('be.visible').scrollIntoView().clear().type(testData.parDefaultValue);
        this.setWeeklyParData();
        this.element.saveAndLeave().should('be.visible').click();
        this.element.editVendorBtn().should('not.be.disabled');
    }

    setWeeklyParData() {
        const weeklyParData = testData.weeklyParData;
        // set weekly par values
        this.element.parValueMonday().clear().type(weeklyParData[0]);
        this.element.parValueTuesday().clear().type(weeklyParData[1]);
        this.element.parValueWednesday().clear().type(weeklyParData[2]);
        this.element.parValueThursday().clear().type(weeklyParData[3]);
        this.element.parValueFriday().clear().type(weeklyParData[4]);
        this.element.parValueSaturday().clear().type(weeklyParData[5]);
        this.element.parValueSunday().clear().type(weeklyParData[6]);
    }

    selectEDIProcessing(vendorName, ediProcessOption, creditMode) {
        this.selectVendor(vendorName);
        this.element.editVendorBtn().should('not.be.disabled').click();
        this.element.vendorAccNumber().should('be.visible').clear().type('99999');
        this.element.selectEDIProcessingDD().should('be.visible').select(ediProcessOption);
        cy.wait(500);
        this.element.selectVendorCreditMode().should('be.visible').then($el => {
            if (ediProcessOption == 'OFF' || ediProcessOption == 'DEFAULT') {
                this.element.selectVendorCreditMode().select(creditMode);
            }
            else {
                this.element.selectVendorCreditMode().should('be.disabled').and('have.value', creditMode);
            }
        });
        this.element.saveBtn().should('not.be.disabled').click();
        this.element.editVendorBtn().should('not.be.disabled');
    }

    verifyEDIProcessing(vendorName, ediProcessOption, creditMode) {
        this.selectVendor(vendorName);
        this.element.editVendorBtn().should('not.be.disabled').click();
        this.element.selectEDIProcessingDD().should('have.value', ediProcessOption);
        this.element.selectVendorCreditMode().should('have.value', creditMode);
        this.element.saveBtn().should('not.be.disabled').click();
        this.element.editVendorBtn().should('not.be.disabled');
    }

    verifyNoEDIProcessing(vendorName) {
        this.selectVendor(vendorName);
        this.element.editVendorBtn().should('not.be.disabled').click();
        this.element.noEdiInvoiceLabel().should('include.text', EDIData.EDI_Processing_Label.No_EDI_Processing);
        this.element.selectVendorCreditMode().should('have.value', 'COMBINED');
        this.element.saveBtn().should('not.be.disabled').click();
        this.element.editVendorBtn().should('not.be.disabled');
    }

    verifyPreRequestEDIProcessing(vendorName) {
        this.selectVendor(vendorName);
        this.element.editVendorBtn().should('not.be.disabled').click();
        this.element.preRequestEdiInvoiceLabel().should('include.text', EDIData.EDI_Processing_Label.Pre_EDI_REQUEST);
        this.element.selectVendorCreditMode().should('have.value', 'COMBINED');
        this.element.saveBtn().should('not.be.disabled').click();
        this.element.editVendorBtn().should('not.be.disabled');
    }

    requestEDIEnrollment(vendorName) {
        this.element.editVendorBtn().should('not.be.disabled');
        this.element.requestEDIInvoiceBtn().should('not.be.disabled').click();
        this.element.ediSalesRepMail().should('be.visible').clear().type('test@gmail.com');
        this.element.ediAccountNumber().should('be.visible').clear().type('12345');
        this.element.ediRestaurantPermission().should('be.visible').find('.icheckbox_minimal-blue').then($el => {
            if (!$el.hasClass('checked')) {
                this.element.ediRestaurantPermission().click();
            }
        });
        this.element.confirmRequestEDIInvoices().should('not.be.disabled').click();
        this.element.okConfirm().should('be.visible').click();
    }
}

module.exports = new vendorPage();