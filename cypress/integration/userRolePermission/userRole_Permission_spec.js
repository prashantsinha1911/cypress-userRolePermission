const loginPageObjs = require("../../page_objects/login.pageObjects");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const assertionPage = require("../../page_objects/assertion.page");
const vendorsPage = require("../../page_objects/vendors.page");
const vendorItemPage = require("../../page_objects/vendorItems.page");
const productPage = require("../../page_objects/product.page");
const menutemPage = require("../../page_objects/menutem.page");
const inventoryPageObj = require("../../page_objects/inventoriesRole.page");

let timeStamp = new Date().toISOString();

export const countSheetName = "Test" + timeStamp;

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

beforeEach(() => {
    // open the application and verify elements from Login page
    cy.visit(Cypress.env('host'));
    loginPageObjs.verifyLoginPageElement();
    // login as admin
    loginPageObjs.loginAs(usernames.userUN, creds.password);
});
describe("Role Permission Verification for User", () => {
    it("Check Home Page", () => {
        // check for tabs on home page
        loginPageObjs.verifyHomePageForUser();
        // logout from application
        loginPageObjs.logout();
    });

    it("Check Performance Page", () => {
        // check for all tabs on perf page
        // go to perf budget page and assert budget page
        hamburgerMenuPageObj.goToPerfBudget();
        assertionPage.verifyPerfBudgetPage();
        // go to perf category report page and assert category report page
        hamburgerMenuPageObj.goToCategoryReport();
        assertionPage.verifyPerfCategoryPage();
        // go to perf Controllable P&L report page and assert Controllable P&L page
        hamburgerMenuPageObj.goToControllabelPL();
        assertionPage.verifyPerfControllablePL();
        // go to perf Food Usage report page and assert Food Usage page
        hamburgerMenuPageObj.goToFoodUsageReport();
        assertionPage.verifyPerfFoodUsage();
        // go to perf Price Alert report page and assert price alert page
        hamburgerMenuPageObj.goToPriceAlert();
        assertionPage.verifyPerfPriceAlert();
        // go to perf Price Movers report page and assert movers alert page
        hamburgerMenuPageObj.goToPriceMovers();
        assertionPage.verifyPerfPriceMovers();
        // go to perf Usage report page and assert Usage alert page
        hamburgerMenuPageObj.goToFoodUsage();
        assertionPage.verifyPerfTheorUsage();
        // logout from application
        loginPageObjs.logout();
    });

    it("Check Vendor Page", () => {
        // go to vendor page
        hamburgerMenuPageObj.goToVendor();
        // check view access
        vendorsPage.viewVendors();
        // check add  and configure details access should not be there
        vendorsPage.checkAddVendorAndConfigureDetails();
        // check download feature
        vendorsPage.download();
        // check edit and delete feature should not be there
        vendorsPage.checkDeleteAndEditVendor();
        // logout from application
        loginPageObjs.logout();
    });

    it("Check Vendor Items Page", () => {
        // go to vendor page
        hamburgerMenuPageObj.goToVendorItems();
        // check view for VI
        vendorItemPage.viewVI();
        // check add new vi is not present
        vendorItemPage.checkAddButton();
        // check edit and delete button
        vendorItemPage.checkEditAndDelete();
        // check export option
        vendorItemPage.exportFeature();
        // logout from application
        loginPageObjs.logout();
    });

    it("Check Product Page", () => {
        // go to Product page
        hamburgerMenuPageObj.goToProduct();
        productPage.element.productTitle().should('be.visible');
        // view product
        productPage.viewProduct();
        // check create prod
        productPage.checkCreateProdButton();
        // check edit and delete button
        productPage.checkEditAndDelete();
        productPage.element.productTitle().should('be.visible');
        // check export
        productPage.checkExport();
        // logout from application
        loginPageObjs.logout();
    });

    it("Check Recipe Page", () => {
        // go to Recipe page
        hamburgerMenuPageObj.goToRecipeMenuItems();
        // check view and edit setup
        hamburgerMenuPageObj.checkForRecipeSetup();
        // check view and add feature
        menutemPage.viewListandAdd();
        // check for edit, delete and print
        menutemPage.checkForDeleteEditAndPrint();
        // check for kitchen display page
        hamburgerMenuPageObj.goToKitchenDisplay();
        assertionPage.verifyKitchenDisplayPage();
        // logout from application
        loginPageObjs.logout();
    });

    it("Check Labour Page", () => {
        hamburgerMenuPageObj.checkLaborMenu();
        // logout from application
        loginPageObjs.logout();
    });

    it("Check Bill Pay Pages", () => {
        hamburgerMenuPageObj.checkBillPayMenu();
        // logout from application
        loginPageObjs.logout();
    });

    it("Check Accounting Pages", () => {
        hamburgerMenuPageObj.checkAccMenu();
        // logout from application
        loginPageObjs.logout();
    });

    it("Check Setup Pages", () => {
        hamburgerMenuPageObj.checkSetupVerification();
        assertionPage.checkContentDisplayed();
        // logout from application
        loginPageObjs.logout();
    });
});