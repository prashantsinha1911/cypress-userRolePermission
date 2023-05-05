const testData = require("../fixtures/rolePermission.json");
class countSheetPage {
    element = {
        addNewCountSheet: () => cy.get(`[ui-sref="inventorySetupNew"]`),
        countSheetName: () => cy.get(`[ng-model="inventorySetup.name"]`),
        selectCheckBoxFood: () => cy.xpath(`(//*[@class="icheckbox_minimal-blue"])[1]`),
        addProduct: () => cy.get(`[ng-click="addProducts($event)"]`),
        clickProductDD: () => cy.get(`[ng-change="newProductSelected()"]`),
        clickProductAdd: () => cy.xpath(`(//*[@aria-label="Select a product"])[1]`),
        selectItem: () => cy.get(`.ui-select-choices-row-inner`),
        saveProduct: () => cy.xpath(`//*[@ng-click="addNewProduct($event)"]`),
        addRecipe: () => cy.get(`[ng-click="addRecipe($event)"]`),
        clickRecipeDD: () => cy.get(`[ng-change="newRecipeSelected()"]`),
        enterRecipe: () => cy.xpath(`//*[@data-testid='selectRecipe']`),
        saveRecipe: () => cy.get(`[ng-click="addNewRecipe($event)"]`),
        saveBtn: () => cy.xpath(`(//*[text()='Save'])[1]`),
        printCountSheet: () => cy.xpath(`//*[text()='Print Count Sheet']`),
        selectFullInventory: () => cy.get(`a[ng-click="print(s, true)"]`),
        selectFullInventory1: () => cy.xpath(`(//a[@ng-click="print(s, true)"])[1]`),
        selectFullInventory2: () => cy.xpath(`(//a[@ng-click="print(s, true)"])[2]`),
        sheetToShelf: () => cy.get(`[ng-model="inventorySetup.setting"]`),
        addSection: () => cy.get(`button[ng-click="addSection($event)"]`),
        typeSectionName: () => cy.get(`input[ng-model="newSection.name"]`),
        addNewSection: () => cy.get(`button[ng-click="addNewSection($event)"]`),
        selectNewCountSheet: (countSheetName) => cy.get(`[title='${countSheetName}']`),
        selectRowItem: (itemName) => cy.get(`[data-testid="itemNameCS-${itemName}"]`).first(),
        deleteRowItem: (itemName) => cy.get(`[data-testid="itemDeleteCS-${itemName}"]`).first(),
        productNameField: () => cy.get(`[ng-model='product.name']`),
        // prodNumCol no varies depending on how many columns are present on the table
        prodNumCol: (nth) => cy.xpath(`(//*[@role='gridcell'])[${nth}]`),
        prodInputField: () => cy.xpath(`//*[@ng-class="'colt' + col.uid"]`),
        okConfirmBtn: () => cy.get(`.btn.btn-primary.bootbox-accept`),
        prodSaveBtn: () => cy.get(`[ng-click='saveNewUnit()']`),
        productPrice: () => cy.get(`[ng-model='product.reportByUnit.price']`),
        productTableHeader: () => cy.get(`.ui-grid-header.ng-scope`),
        assignSectionToProduct: () => cy.get(`[ng-model='newProduct.section']`),
        assignSectionToRecipe: () => cy.get(`[ng-model='newRecipe.section']`),
        modalTitle: () => cy.get(`h5[class='modal-title']`),
        cancelBtn: () => cy.get(`[ng-click='closeNewSectionModal()'][class='btn btn-default']`),
        existingSectionNote: () => cy.get(`#existingSectionNote`),
        productUnitQuantity: () => cy.get(`[ng-model='newProductUnit.quantity']`),
        itemCountByData: (item) => cy.get(`[data-testid='itemCountByCS-${item}']`),
        historyBtn: () => cy.get(`[ng-click='history()']`),
        csModifiedBy: () => cy.get(`[data-testid='csModifiedBy']`).last(),
        csModifiedDate: () => cy.get(`[data-testid='csModifiedDate']`).last(),
        csName: () => cy.get(`[data-testid='csName']`).last(),
        csSettings: () => cy.get(`[data-testid='csSettings']`).last(),
        closeHistoryModal: () => cy.get(`button[class='btn btn-primary'][ng-click='closeModal()']`)
    };

    createCountSheet(countSheetName, prodName, recipeName) {
        this.element.addNewCountSheet().should('be.visible').click();
        this.element.countSheetName().should('be.visible').type(countSheetName);
        this.element.selectCheckBoxFood().click();
        this.addProductToCountSheet(prodName);
        this.addRecipeToCountSheet(recipeName);
        this.element.saveBtn().should('not.be.disabled').click();
        this.element.addNewCountSheet().should('be.visible');
        this.element.selectNewCountSheet(countSheetName).should('be.visible');
    }

    addProductToCountSheet(prodName) {
        this.element.addProduct().should('be.visible').click();
        this.element.clickProductDD().should('be.visible').click();
        this.element.clickProductAdd().clear().type(prodName);
        cy.wait(500);
        this.element.selectItem().should('be.visible').click();
        this.element.saveProduct().should('not.be.disabled').click();
    }

    addRecipeToCountSheet(recipeName) {
        this.element.addRecipe().should('be.visible').click();
        this.element.clickRecipeDD().should('be.visible').click();
        this.element.enterRecipe().clear().type(recipeName);
        cy.wait(500);
        this.element.selectItem().should('be.visible').click();
        this.element.saveRecipe().should('not.be.disabled').click();
    }

    createCountSheetSheetToShelf(sectionName, countSheetName, prodName, recipeName) {
        this.element.addNewCountSheet().click();
        this.element.countSheetName().type(countSheetName);
        this.element.sheetToShelf().select('Sheet to Shelf');
        this.element.addSection().click();
        this.element.typeSectionName().type(sectionName);
        this.element.addNewSection().click();
        cy.wait(1000);
        this.element.addProduct().click();
        this.element.clickProductDD().click();
        this.element.clickProductAdd().type(prodName);
        this.element.selectItem().click();
        this.element.saveProduct().click();
        this.element.addRecipe().click();
        this.element.clickRecipeDD().click();
        this.element.enterRecipe().type(recipeName);
        this.element.selectItem().click();
        this.element.saveRecipe().click();
        this.element.saveBtn().click();
    }

    createCountWithMultipleSection(sectionName, sectionName2, countSheetName, prodName, recipeName) {
        this.element.addNewCountSheet().should('be.visible').click();
        this.element.countSheetName().should('be.visible').type(countSheetName);
        this.element.countSheetOrganize().select('Sheet to Shelf');
        this.addSection(sectionName);
        this.addSection(sectionName2);
        this.addProduct(prodName);
        this.addRecipe(recipeName);
        this.addSection(sectionName2);
        this.element.saveBtn().should('not.be.disabled').click();
        this.element.addNewCountSheet().should('be.visible');
    }

    createCountSheetRole(countSheetName) {
        this.element.addNewCountSheet().click();
        this.element.countSheetName().type(countSheetName);
        this.element.selectCheckBoxFood().click();
        this.element.saveBtn().click();
    }

    print() {
        this.element.printCountSheet().click();
        this.element.selectFullInventory1().click();
    }

    printCountSheet() {
        this.element.printCountSheet().click();
        cy.wait(3000);
        this.element.selectFullInventory1().click();
        this.element.printCountSheet().click();
        cy.wait(3000);
        this.element.selectFullInventory2().click();
    }

    editProdFromCS(countSheetName, productName, recipeName) {
        this.element.selectNewCountSheet(countSheetName).should('be.visible').click();
        this.element.selectRowItem(productName).should('be.visible').click();
        cy.wait(3000);
        // restaurant column will not be visible depending on the avilability of the vendor item on the units
        this.element.productTableHeader().should('be.visible').then($el => {
            if ($el.text().includes('Restaurants')) {
                this.element.prodNumCol(7).should('be.visible').dblclick();
            }
            else {
                this.element.prodNumCol(6).should('be.visible').dblclick();
            }
        })
        this.element.prodInputField().clear().type(testData.productData.UnitAmount);
        // redundant click to get the save button enabled
        this.element.productNameField().click();
        // verify updated price
        //  updatedPrice = testData.productData.packagingPriceInVI / testData.productData.UnitAmount
        this.element.productPrice().should('include.value', testData.productData.updatedPrice);
        this.element.prodSaveBtn().scrollIntoView().should('be.visible').click();
        // delete recipe
        this.deleteRecipeFromCS(recipeName);
        this.element.saveBtn().should('be.visible').click();
        this.element.selectNewCountSheet(countSheetName).should('be.visible');
    }

    deleteRecipeFromCS(recipeName) {
        this.element.deleteRowItem(recipeName).should('be.visible').click();
        this.element.okConfirmBtn().should('be.visible').click();
    }

    addSection(sectionName) {
        this.element.addSection().should('be.visible').click();
        this.element.typeSectionName().clear().type(sectionName);
        this.element.addNewSection().click();
        cy.wait(1000);
    }

    addProductWithSection(prodName, sectionName) {
        this.element.addProduct().should('be.visible').click();
        this.element.clickProductDD().should('be.visible').click();
        this.element.clickProductAdd().clear().type(prodName);
        cy.wait(500);
        this.element.selectItem().should('be.visible').click();
        this.element.assignSectionToProduct().should('be.visible').click();
        this.element.assignSectionToProduct().find('input[type="search"]').should('be.visible').clear().type(sectionName);
        this.element.selectItem().should('be.visible').click();
        this.element.saveProduct().should('not.be.disabled').click();
    }

    addRecipeWithSection(recipeName, sectionName) {
        this.element.addRecipe().should('be.visible').click();
        this.element.clickRecipeDD().should('be.visible').click();
        this.element.enterRecipe().clear().type(recipeName);
        cy.wait(500);
        this.element.selectItem().should('be.visible').click();
        this.element.assignSectionToRecipe().should('be.visible').click();
        this.element.assignSectionToRecipe().find('input[type="search"]').should('be.visible').clear().type(sectionName);
        this.element.selectItem().should('be.visible').click();
        this.element.saveRecipe().should('not.be.disabled').click();
    }

    createCSwithMultipleSection(sectionName, sectionName2, countSheetName, prodName, recipeName) {
        this.element.addNewCountSheet().should('be.visible').click();
        this.element.countSheetName().should('be.visible').type(countSheetName);
        this.element.sheetToShelf().select('Sheet to Shelf');
        this.addSection(sectionName);
        // duplicate section with same name is not allowed
        this.addSectionWithSameName(sectionName);
        this.addSection(sectionName2);
        this.addProductWithSection(prodName, sectionName);
        this.addSameProductInMultipleSection(prodName, sectionName, sectionName2);
        this.changeItemCount(prodName, 10);
        // same product in both section contain 10 unit
        this.element.itemCountByData(prodName).should('include.text', '10');
        this.addRecipeWithSection(recipeName, sectionName);
        this.element.saveBtn().should('not.be.disabled').click();
        this.element.addNewCountSheet().should('be.visible');
    }

    changeItemCount(itemName, countNo) {
        this.element.selectRowItem(itemName).should('be.visible').click();
        cy.wait(3000);
        this.element.productUnitQuantity().should('be.visible').clear().type(countNo);
        this.element.productNameField().should('be.visible').click();
        this.element.prodSaveBtn().should('be.visible').click();
    }

    addSectionWithSameName(sectionName) {
        this.element.addSection().should('be.visible').click();
        this.element.typeSectionName().type(sectionName);
        this.element.addNewSection().click();
        this.element.modalTitle().should('have.text', 'Sections must have unique name');
        cy.wait(2000);
        this.element.okConfirmBtn().should('be.visible').click();
        this.element.cancelBtn().should('be.visible').click();
    }

    addSameProductInMultipleSection(prodName, sectionName, sectionName2) {
        this.element.addProduct().should('be.visible').click();
        this.element.clickProductDD().should('be.visible').click();
        this.element.clickProductAdd().clear().type(prodName);
        cy.wait(500);
        this.element.selectItem().should('be.visible').click();
        this.element.assignSectionToProduct().should('be.visible').click();
        this.element.assignSectionToProduct().find('input[type="search"]').should('be.visible').clear().type(sectionName2);
        this.element.selectItem().should('be.visible').click();
        this.element.existingSectionNote().should('have.text', `Product already exists in the following sections: ${sectionName}`)
        this.element.saveProduct().should('not.be.disabled').click();
    }

    verifyCSHistory(user, date, countSheetName, settings) {
        this.element.selectNewCountSheet(countSheetName).should('be.visible').click();
        this.element.historyBtn().should('be.visible').click();
        this.element.csModifiedBy().should('include.text', user);
        this.element.csModifiedDate().should('include.text', date);
        this.element.csName().should('include.text', countSheetName);
        this.element.csSettings().should('include.text', settings);
        this.element.closeHistoryModal().should('be.visible').click();
    }
}
module.exports = new countSheetPage();