const loginPageObjs = require("../../page_objects/login.pageObjects");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");
const setupPageObjs = require("../../page_objects/setup.page");
const testData = require("../../fixtures/rolePermission.json");
const loginPageObjects = require("../../page_objects/login.pageObjects");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const orderPage = require("../../page_objects/order.page");
const assertionPage = require("../../page_objects/assertion.page");
const vendorsPage = require("../../page_objects/vendors.page");
const vendorItemPage = require("../../page_objects/vendorItems.page");
const productPage = require("../../page_objects/product.page");
const menutemPage = require("../../page_objects/menutem.page");
const recipeSetupPage = require("../../page_objects/recipeSetup.page");
const inventoriesRolePage = require("../../page_objects/inventoriesRole.page");
const utilObj = require("../../utils/util_generic");

let createVendorName = testData.vendorName + utilObj.makeId();
let emailID = "test" + utilObj.makeId() + "@gmail.com";

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

beforeEach(() => {
    // open the application and verify elements from Login page
    cy.visit(Cypress.env('host'));
    loginPageObjs.verifyLoginPageElement();
});

after(() => {
    cy.exec('rm -rf cypress/downloads/*', { failOnNonZeroExit: false });
});

describe('Role Permission Verification for Franchasee Accountant', () => {
    it('verify Home page', () => {
        // to make sure Nightly Sales data checkBox is checked so that sales will be visible for Franchaisee Accountant
        // login as admin
        loginPageObjs.loginAs(usernames.adminUN, creds.password);
        // make "Wasabi Tysons" as tenant to get feature  from Key visible
        loginPageObjects.chooseTenant(testData.tenantName);
        // check feature flag checkbox
        setupPageObjs.enableFlag();
        // logout from admin
        loginPageObjs.logout();
        // login as Franchaise Accountant
        loginPageObjs.loginAs(usernames.franchiseAccUN, creds.password);
        // make "Wasabi Tysons" as tenant to get feature  from Key visible
        utilObj.checkRestUnitWO(testData.tenantName);
        // verify elements from Home page
        loginPageObjs.verifyHomePage();
        //logout from app
        loginPageObjs.logout();
    });

    it('verify Order Page', () => {
        // login as FranchaiseAccountant
        loginPageObjs.loginAs(usernames.franchiseAccUN, creds.password);
        // go to order page
        hamburgerMenuPageObj.goToOrders();
        // view order
        orderPage.viewOrder();
        assertionPage.verifyPageSearchFilter();
        // send order
        hamburgerMenuPageObj.goToPlaceOrders();
        orderPage.placeOrder();
        // change status to all
        orderPage.changeStatusToSent();
        // resend order and edit along the process
        orderPage.resendOrder();
        // delete order
        orderPage.deleteOrderInv();
        // save order
        hamburgerMenuPageObj.goToPlaceOrders();
        orderPage.saveOrder();
        orderPage.changeStatusToSaved();
        // delete saved order
        orderPage.deleteOrderInv();
        //logout from app
        loginPageObjs.logout();
    });

    it('verify Performance Page', () => {
        // login as FranchaiseAccountant
        loginPageObjs.loginAs(usernames.franchiseAccUN, creds.password);
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
        // go to perf Sales page and assert sales page
        hamburgerMenuPageObj.goToSales();
        assertionPage.verifyPerfSales();
        // go to perf Price Alert report page and assert price alert page
        hamburgerMenuPageObj.goToPriceAlert();
        assertionPage.verifyPerfPriceAlert();
        // go to perf Price Movers report page and assert movers alert page
        hamburgerMenuPageObj.goToPriceMovers();
        assertionPage.verifyPerfPriceMovers();
        // go to perf Usage report page and assert Usage alert page
        hamburgerMenuPageObj.goToFoodUsage();
        assertionPage.verifyPerfTheorUsage();
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Vendor Page", () => {
        // login as account manager
        loginPageObjs.loginAs(usernames.accountManagerUN, creds.password);
        // go to vendor page
        hamburgerMenuPageObj.goToVendor();
        // check view access
        vendorsPage.viewVendors();
        // create new vendor
        vendorsPage.createVendor(createVendorName, emailID);
        // logout from admin
        loginPageObjs.logout();
        // login as FranchaiseAccountant
        loginPageObjs.loginAs(usernames.franchiseAccUN, creds.password);
        // go to vendor page
        hamburgerMenuPageObj.goToVendor();
        // check view access
        vendorsPage.viewVendors();
        // check add  and configure details access should not be there
        vendorsPage.configureDefaults();
        // check download feature
        vendorsPage.download();
        // select the new vendor
        vendorsPage.selectVendor(createVendorName);
        // delete the newly created vendor
        vendorsPage.deleteVendor(createVendorName);
        // go to vendor page
        vendorsPage.viewVendors();
        vendorsPage.selectVendor("Arrow");
        // click order guide setup
        vendorsPage.configureOrderGuide();
        // click manage Items for all restaurants
        vendorsPage.multiUnitOrderGuideSetup();
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Vendor Items Page", () => {
        // login as FranchaiseAccountant
        loginPageObjs.loginAs(usernames.franchiseAccUN, creds.password);
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
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Product Page", () => {
        // login as FranchaiseAccountant
        loginPageObjs.loginAs(usernames.franchiseAccUN, creds.password);
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
        productPage.element.viewProd().should('be.visible');
        // check export
        productPage.checkExport();
        // go to setup verification and veify
        hamburgerMenuPageObj.goToSetupVerification();
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Recipe Page", () => {
        // login as FranchaiseAccountant
        loginPageObjs.loginAs(usernames.franchiseAccUN, creds.password);
        // view recipe setup page
        hamburgerMenuPageObj.goToRecipeSetup();
        assertionPage.verifyRecipeSetupPage();
        // check edit recipe setup
        recipeSetupPage.checkForEditRecipeSetup();
        // go to Recipe page
        hamburgerMenuPageObj.goToRecipeMenuItems();
        // check view and add feature
        menutemPage.viewListandAdd();
        // check for edit, delete and print
        menutemPage.checkForDeleteEditAndPrint();
        // check for kitchen display page
        hamburgerMenuPageObj.goToKitchenDisplay();
        assertionPage.verifyKitchenDisplayPage();
        recipeSetupPage.goToOpenDisplayKitchenApplicationPage();
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Setup Pages", () => {
        // login as FranchaiseAccountant
        loginPageObjs.loginAs(usernames.franchiseAccUN, creds.password);
        // make "Wasabi Tysons" as tenant to get feature  from Key visible
        utilObj.checkRestUnitWO(testData.tenantName);
        hamburgerMenuPageObj.goToSetup();
        hamburgerMenuPageObj.goToSetupBilling();
        // go to users and veify
        hamburgerMenuPageObj.goToUsersSetup();
        assertionPage.checkContentDisplayed();
        // go to integration and verify
        hamburgerMenuPageObj.goToIntegrationSetup();
        assertionPage.verifyPageTitle();
        // go to POS and veify Usage Report
        hamburgerMenuPageObj.goToSetupPOS();
        hamburgerMenuPageObj.goToUsageReportSetup();
        assertionPage.verifyPageSearchFilter();
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Accounting Pages", () => {
        // login as franchise Accountant
        loginPageObjs.loginAs(usernames.franchiseAccUN, creds.password);
        hamburgerMenuPageObj.goToAccounting();
        // go to export
        hamburgerMenuPageObj.goToExportChildAcc();
        assertionPage.verifyAccountPageChildren();
        // go to sales entries
        hamburgerMenuPageObj.goToSalesEntriesChildAcc();
        assertionPage.verifyAccountPageChildren();
        // go to inventories entries
        hamburgerMenuPageObj.goToInventoryEntriesChildAcc();
        assertionPage.verifyAccountPageChildren();
        // go to Categories
        hamburgerMenuPageObj.goToCategoriesChildAcc();
        assertionPage.verifyAccountPageChildren();
        //go to sales Mapping
        hamburgerMenuPageObj.goToSalesMappingChildAcc();
        assertionPage.verifyPageSearchFilter();
        // go to vendor mapping
        hamburgerMenuPageObj.goToVendorMappingChildAcc();
        assertionPage.verifyAccountPageChildren();
        // go to PMIX mapping
        hamburgerMenuPageObj.goToPMIXMappingChildAcc();
        assertionPage.verifyAccountPageChildren();
        //  go to payment accounts
        hamburgerMenuPageObj.goToPaymentAccountsChildAcc();
        assertionPage.verifyAccountPageChildren();
        // go to close books
        hamburgerMenuPageObj.goToCloseBooksChildAcc();
        assertionPage.verifyAccountPageChildren();
        // go to Budget Setup
        hamburgerMenuPageObj.goToBudgetSetupChildAcc();
        assertionPage.verifyPageSearchFilter();
        //logout from app
        loginPageObjs.logout();
    });
});