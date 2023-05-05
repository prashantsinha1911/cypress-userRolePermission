const hamburgerMenuPageObj = require("./hamburgerMenu.pageObj");
class setupPage {
    element = {
        features: () => cy.xpath(`//*[@role='table']//*[@role='cell'][.='FEATURES']`),
        nightlySalesCheckBox: () => cy.contains('label', 'NIGHTLY_SALES_DATA'), // cy.xpath(`//div[contains(@class,'icheckbox_minimal-blue')]/parent::label[contains(.,'NIGHTLY_SALES_DATA')]//input`),
        customReportsCheckBox: () => cy.contains('label', 'CUSTOM_REPORTS'), // cy.xpath(`//div[contains(@class,'icheckbox_minimal-blue')]/parent::label[contains(.,'CUSTOM_REPORTS')]//input`), // cy.contains('CUSTOM_REPORTS')
        saveButton: () => cy.get(`button.btn.btn-primary`)
    };

    enableFlag() {
        // go to setup > unitSettings >features >check nightlySalesData,custom reports
        hamburgerMenuPageObj.goToUnitSettings();
        this.element.features().should('be.visible').click();
        this.element.saveButton().should('not.be.disabled');
        // checkbox has class with hidden property display:none
        this.element.nightlySalesCheckBox().children('.icheckbox_minimal-blue').children('input').then($el => {
            if (!$el.prop('checked')) {
                this.element.nightlySalesCheckBox().click({ force: true });
            }
        });

        this.element.customReportsCheckBox().children('.icheckbox_minimal-blue').children('input').then($el => {
            if (!$el.prop('checked')) {
                this.element.customReportsCheckBox().click({ force: true });
            }
        });
        this.element.saveButton().click();
        this.element.features().should('be.visible');
        cy.wait(1000);
    }
}
module.exports = new setupPage();