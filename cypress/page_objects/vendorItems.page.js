const testData = require("../fixtures/rolePermission.json");

class vendorItemPage {
    element = {
        addNewVIBtn: () => cy.xpath(`//*[@ui-sref="vendorProductNew"]`),
        openVendorDD: () => cy.xpath(`//*[@ng-model="vendorProduct.vendor"]`),
        enterVendorName: () => cy.xpath(`//*[@aria-label="Select a vendor"]`),
        viNameTxtFd: () => cy.xpath(`(//*[@name="translated-name"])[2]`),
        viItemCode: () => cy.xpath(`(//*[@name="productCode"])[1]`),
        clickProductFd: () => cy.xpath(`(//*[@ng-model="vendorProduct.product"])[1]`),
        typeProductFd: () => cy.xpath(`(//*[@aria-label="Select a product"])[1]`),
        selectItem: () => cy.get(`.ui-select-choices-row-inner`),
        clickAddPackaging: () => cy.xpath(`//*[@ng-click="addRow()"]`),
        handleRow: () => cy.xpath(`(//*[@class='ui-grid-cell-contents ng-binding ng-scope'])[1]`),
        input1: () => cy.get(`[name="inputForm"]`),
        handleRow2: () => cy.xpath(`(//*[@class='ui-grid-cell-contents ng-binding ng-scope'])[1]`),
        handleRow3: () => cy.xpath(`(//*[@class='ui-grid-cell-contents ng-binding ng-scope'])[3]`),
        handleRow5: () => cy.xpath(`(//*[@class='ui-grid-cell-contents ng-binding ng-scope'])[4]`),
        handleRow6: () => cy.xpath(`(//*[@class='ui-grid-cell-contents ng-binding ng-scope'])[5]`),
        selectAllRow: () => cy.get(`[ng-click='headerButtonClick($event)']`),
        saveBtn: () => cy.get(`#vendorItemSaveBtn`),
        searchValue: () => cy.xpath('//*[@placeholder="Search"]'),
        assertionList: () => cy.xpath('//*[@role="rowgroup"]'),
        viewList: () => cy.get(`[ng-style="colContainer.getViewportStyle()"]`),
        deleteVI: () => cy.get(`[ng-click="delete()"]`),
        editVI: () => cy.contains('Edit Vendor Item'),
        exportBtn: () => cy.get(".btn-group.dropdown"),
        exportAsCSV: () => cy.get(`[ng-click="exportGrid($event, 'csv')"]`),
        exportAsPDF: () => cy.get(`[ng-click="exportGrid($event, 'pdf')"]`),
        selectVI: () => cy.xpath(`(//*[@class='ui-grid-row ng-scope'])[1]`),
        editVIBtn: () => cy.xpath(`//*[@translate='inviosoApp.vendorProduct.home.editLabel']/parent::button`),
        deleteConfrmBtn: () => cy.xpath(`//*[@class='btn btn-danger'][@type='submit']`),
        selectRow2: () => cy.xpath(`(//*[@class="ui-grid-row ng-scope"])[2]`),
        deletePO: () => cy.xpath(`//*[@ng-show="canEditPackagingNames()"]`),
        sortColumn: () => cy.xpath(`(//*[@ng-keydown="handleKeyDown($event)"])[1]`),
        selectOrderGuideOp: () => cy.get(`select[ng-model="row.entity['orderGuide']"]`),
        vendorItemNameText: () => cy.get(`.panel-heading`),
        verifyVendorItemName: (vendorItemName) => cy.xpath(`//*[@data-testid="${vendorItemName}"]`)
    };

    createVI(vendorName, viName, viItemCode, prod, input1, input2, input3) {
        this.element.addNewVIBtn().should('be.visible').click();
        this.element.openVendorDD().should('be.visible').click();
        this.element.enterVendorName().type(vendorName);
        this.element.selectItem().click();
        this.element.viNameTxtFd().type(viName);
        this.element.viItemCode().type(viItemCode);
        this.element.clickProductFd().click();
        this.element.typeProductFd().type(prod);
        this.element.selectItem().click();
        this.element.clickAddPackaging().click();
        this.element.handleRow().click();
        this.element.input1().type(input1);
        this.element.handleRow2().click();
        this.element.input1().type(input2);
        this.element.handleRow3().click();
        this.element.input1().type(input3);
        this.element.selectAllRow().click();
        this.element.saveBtn().should('not.be.disabled').click();
        this.element.addNewVIBtn().should('be.visible');
    }

    viewVI() {
        this.element.viewList().should('be.visible');
    }

    checkAddButton() {
        this.element.addNewVIBtn().should('not.be.visible');
    }

    editVendorItem(vendorItemName) {
        this.element.searchValue().should('be.visible').type(vendorItemName);
        this.element.selectVI().click();
        this.element.vendorItemNameText().should('include.text', vendorItemName);
        cy.wait(2000);
        this.element.editVIBtn().should('be.visible').click();
        this.element.verifyVendorItemName(vendorItemName).should('be.visible');
        this.element.handleRow().should('be.visible').click();
        this.element.input1().clear().type("Edited Test");
        cy.wait(2000);
        this.element.saveBtn().should('not.be.disabled').click();
        this.element.vendorItemNameText().should('include.text', vendorItemName);
    }

    editVendorItemForUnitAdmin(vendorItemName) {
        this.element.searchValue().should('be.visible').clear().type(vendorItemName);
        this.element.selectVI().click();
        cy.wait(2000);
        this.element.vendorItemNameText().should('include.text', vendorItemName);
        this.element.editVIBtn().should('be.visible').click();
        this.element.handleRow5().click();
        this.element.input1().clear().type("90");
        cy.wait(2000);
        this.element.saveBtn().click();
        this.element.vendorItemNameText().should('include.text', vendorItemName);
    }

    editVendorItemwithPackagingOptions(vendorName, input1, input2, input3, input4) {
        this.element.searchValue().clear();
        this.element.searchValue().type(vendorName);
        this.element.selectVI().click();
        this.element.editVIBtn().click();
        this.element.clickAddPackaging().click();
        this.element.sortColumn().dblclick();
        this.element.handleRow().click();
        this.element.input1().type(input1);
        this.element.handleRow2().click();
        this.element.input1().type(input2);
        this.element.handleRow3().click();
        this.element.input1().type(input3);
        this.element.handleRow5().click();
        this.element.input1().type(input4);
        cy.wait(3000);
        this.element.saveBtn().click({ multiple: true });
    }

    deletePackagingOptions() {
        this.element.editVIBtn().click();
        cy.wait(3000);
        this.element.selectRow2().click();
        this.element.deletePO().click();
    }

    deleteVendorItem(vendorItemName) {
        cy.wait(2000);
        this.element.editVIBtn().should('be.visible').click();
        this.element.verifyVendorItemName(vendorItemName).should('be.visible');
        cy.wait(2000);
        this.element.verifyVendorItemName(vendorItemName).should('be.visible');
        this.element.deleteVI().should('be.visible').click();
        this.element.deleteConfrmBtn().click();
        this.element.addNewVIBtn().should('be.visible');
    }

    deleteVendorItem2() {
        cy.wait(2000);
        this.element.editVIBtn().should('be.visible').click();
        cy.wait(2000);
        this.element.deleteVI().should('be.visible').click();
        this.element.deleteConfrmBtn().click();
    }

    checkEditAndDelete() {
        this.element.selectVI().should('be.visible').click();
        this.element.editVI().should('be.disabled');
        this.element.deleteVI().should('not.exist');
        cy.go('back');
    }

    exportFeature() {
        cy.wait(2000);
        this.element.exportBtn().should('be.visible').click();
        this.element.exportAsCSV().should('be.visible');
        this.element.exportAsPDF().should('be.visible');
    }

    addPackagingData(packaging, orderGuide) {
        this.element.handleRow().click();
        this.element.input1().type(packaging.name);
        this.element.handleRow2().click();
        this.element.input1().type(packaging.quantity);
        this.element.handleRow3().click();
        this.element.input1().type(packaging.price);
        this.element.handleRow5().click();
        this.element.input1().type(packaging.ratio);
        this.element.handleRow6().click();
        this.element.selectOrderGuideOp().select(orderGuide);
    }

    createVIwithMultiplePackaging(vendorName, viName, viItemCode, prod) {
        this.element.addNewVIBtn().should('be.visible').click();
        this.element.openVendorDD().click();
        this.element.enterVendorName().type(vendorName);
        this.element.selectItem().click();
        this.element.viNameTxtFd().type(viName);
        this.element.viItemCode().type(viItemCode);
        this.element.clickProductFd().click();
        this.element.typeProductFd().type(prod);
        this.element.selectItem().click();
        this.element.clickAddPackaging().click();
        // packaging, quantity, price, ratio, orderGuideOption
        this.addPackagingData(testData.package1, "Yes")
        this.element.clickAddPackaging().click();
        this.element.sortColumn().dblclick();
        // packaging, quantity, price, ratio, orderGuideOption
        this.addPackagingData(testData.package2, "Yes")
        this.element.selectAllRow().click();
        this.element.saveBtn().click();
        this.element.addNewVIBtn().should('be.visible');
    }
}
module.exports = new vendorItemPage();