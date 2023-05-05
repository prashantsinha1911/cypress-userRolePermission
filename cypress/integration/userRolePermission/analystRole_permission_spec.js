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
const priorityReportPage = require("../../page_objects/priorityReport.page");
const vendorItemPage = require("../../page_objects/vendorItems.page");
const productPage = require("../../page_objects/product.page");
const menutemPage = require("../../page_objects/menutem.page");
const recipeSetupPage = require("../../page_objects/recipeSetup.page");
const inventoriesRolePage = require("../../page_objects/inventoriesRole.page");
const utilObj = require("../../utils/util_generic");
const restaurantPage = require("../../page_objects/restaurant.page");
const menuItemPageObj = require("../../page_objects/menutem.page");
const performancePageObj = require("../../page_objects/performance.page");

let timeStamp = new Date().toISOString();
let createVendorName = testData.vendorName + utilObj.makeId();
let newVIName = testData.vendorItemName + timeStamp;
let newProductName = testData.testProductName;
let newInvoiceNum = testData.invoiceNum + utilObj.makeId();
let newCustomerName = testData.customerName;
let newRecipeTypeName = testData.testRecipeTypeName + timeStamp;
let newRecipeName = testData.testRecipeName + timeStamp;
const createRestName = testData.restaurant + utilObj.makeId();
let emailID = "test" + utilObj.makeId() + "@gmail.com";
let loginID = "test" + utilObj.makeId().toLowerCase();
let firstName = "Bruce" + utilObj.makeId().toLowerCase();
let lastName = "Wayne" + utilObj.makeId().toLowerCase();

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

describe('Role Permission Verification for Analyst', () => {
    it('verify Home page', () => {
        // to make sure Nightly Sales data checkBox is checked so that sales will be visible for Analyst
        // login as admin
        loginPageObjs.loginAs(usernames.adminUN, creds.password);
        // make "Wasabi Tysons" as tenant to get feature  from Key visible
        utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
        // check feature flag checkbox
        setupPageObjs.enableFlag();
        // logout from admin
        loginPageObjs.logout();
        // login as analyst
        loginPageObjs.loginAs(usernames.analystUN, creds.password);
        // make "Wasabi Tysons" as tenant to get feature  from Key visible
        utilObj.checkRestUnitWO(testData.tenantName);
        // verify elements from Home page
        loginPageObjs.verifyHomePage();
        //logout from app
        loginPageObjs.logout();
    });

    it('verify Order Page', () => {
        // login as admin
        loginPageObjs.loginAs(usernames.adminUN, creds.password);
        utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
        // save order
        hamburgerMenuPageObj.goToPlaceOrders();
        orderPage.saveOrder();
        // send order
        hamburgerMenuPageObj.goToPlaceOrders();
        orderPage.placeOrder();
        // change status to all
        orderPage.changeStatusToSent();
        loginPageObjs.logout();
        // login as admin
        loginPageObjs.loginAs(usernames.analystUN, creds.password);
        utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
        // go to order page
        hamburgerMenuPageObj.goToOrders();
        orderPage.changeStatusToSaved();
        // delete saved order
        orderPage.deleteOrderInv();
        // change status to sent
        orderPage.changeStatusToSent();
        // delete order
        orderPage.deleteOrderInv();
        // view order
        orderPage.viewOrder();
        //export
        orderPage.exportOrder();
        // view inbox
        orderPage.viewInbox();
        assertionPage.verifyPageSearchFilter();
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Performance Page", () => {
        // login as Analyst
        loginPageObjs.loginAs(usernames.analystUN, creds.password);
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
        // check for all tabs on Vendor page
        // login as account manager
        loginPageObjs.loginAs(usernames.accountManagerUN, creds.password);
        // go to vendor page
        hamburgerMenuPageObj.goToVendor();
        // check view access
        vendorsPage.viewVendors();
        // create new vendor
        vendorsPage.createVendor(createVendorName, emailID);
        // logout from account manager
        loginPageObjs.logout();
        // login as analyst
        loginPageObjs.loginAs(usernames.analystUN, creds.password);
        // go to vendor page
        hamburgerMenuPageObj.goToVendor();
        // check view access
        vendorsPage.viewVendors();
        // check add  and configure details access should not be there
        vendorsPage.checkAddVendorAndConfigureDetails();
        // check download feature
        vendorsPage.download();
        // select the new vendor
        vendorsPage.selectVendor(createVendorName);
        // edit and delete the newly created vendor
        vendorsPage.editAndDeleteVendor(createVendorName);
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
        // login as Analyst
        loginPageObjs.loginAs(usernames.analystUN, creds.password);
        // go to vendor page
        hamburgerMenuPageObj.goToVendorItems();
        // check view for VI
        vendorItemPage.viewVI();
        // export vendor item
        vendorItemPage.exportFeature();
        // add new vendor Item
        let newVendorItem = testData.vendorItem + utilObj.makeId();
        let newVendorItemCode = testData.vendorItemCode + utilObj.makeId();
        vendorItemPage.createVI(testData.existingVendor, newVendorItem, newVendorItemCode, testData.productName, "Test", "4", "40");
        // edit vendor Item
        vendorItemPage.editVendorItemForUnitAdmin(newVendorItem);
        // delete vendor Item
        vendorItemPage.deleteVendorItem(newVendorItem);
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Product Page", () => {
        // login as Analyst
        loginPageObjs.loginAs(usernames.analystUN, creds.password);
        // go to Product page
        hamburgerMenuPageObj.goToProduct();
        // view product
        productPage.viewProduct();
        // check export
        productPage.checkExport();
        // check create prod
        productPage.createProduct(newProductName);
        // check edit and delete product
        productPage.editCreatedProduct(newProductName);
        productPage.deleteProduct();
        // go to setup Verification and veify
        hamburgerMenuPageObj.goToSetupVerification();
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Recipe Page", () => {
        // login as Analyst
        loginPageObjs.loginAs(usernames.analystUN, creds.password);
        // view recipe setup
        hamburgerMenuPageObj.goToRecipeSetup();
        assertionPage.verifyRecipeSetupPage();
        // create menu type
        recipeSetupPage.createMenuTypes(newRecipeTypeName);
        hamburgerMenuPageObj.goToMenuItems();
        // view recipe items
        menuItemPageObj.viewRecipes();
        // create recipe with image
        menuItemPageObj.createRecipeItemAndUploadImage(newRecipeName, newRecipeTypeName);
        // edit recipe
        menuItemPageObj.searchAndEditRecipe(newRecipeName, newRecipeTypeName);
        // print and delete recipe
        menuItemPageObj.printAndDeleteRecipeItem();
        // kitchen display
        hamburgerMenuPageObj.goToKitchenDisplay();
        assertionPage.verifyKitchenDisplayPage();
        recipeSetupPage.goToOpenDisplayKitchenApplicationPage();
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Setup Pages", () => {
        // login as Analyst
        loginPageObjs.loginAs(usernames.analystUN, creds.password);
        // make "Wasabi Tysons" as tenant to get feature  from Key visible
        utilObj.checkRestUnitWO(testData.tenantName);
        hamburgerMenuPageObj.goToSetup();
        // go to setup usage Report and veify
        hamburgerMenuPageObj.goToUsageReportSetup();
        assertionPage.verifyPageSearchFilter();
        // go to setup Lead Priority Report and veify
        hamburgerMenuPageObj.goToLeadPriorityReport();
        assertionPage.checkContentDisplayed();
        // go to setup CS Report 2.0 and veify
        hamburgerMenuPageObj.goToCssReport2();
        assertionPage.checkContentDisplayed();
        // go to setup Reconciliation Report and veify
        hamburgerMenuPageObj.goToReconciliationReportSetup();
        assertionPage.checkContentDisplayed();
        // go to setup notifications and veify
        hamburgerMenuPageObj.goToNotification();
        assertionPage.verifyNotificationsPage();
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Accounting Pages", () => {
        // login as Analyst
        loginPageObjs.loginAs(usernames.analystUN, creds.password);
        hamburgerMenuPageObj.goToAccounting();
        //verify Categories
        hamburgerMenuPageObj.goToCategoriesChildAcc();
        assertionPage.verifyAccountPageChildren();
        // verify Budget Setup for analyst
        hamburgerMenuPageObj.goToBudgetSetupChildAcc();
        assertionPage.verifyPageSearchFilter();
        //logout from app
        loginPageObjs.logout();
    });
});