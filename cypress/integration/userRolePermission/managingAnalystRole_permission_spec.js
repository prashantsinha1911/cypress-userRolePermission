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
const performancePage = require("../../page_objects/performance.page");


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

describe('Role Permission Verification for Managing Analyst', () => {
    it('verify Home page', () => {
        // to make sure Nightly Sales data checkBox is checked so that sales will be visible for manager
        // login as admin
        loginPageObjs.loginAs(usernames.adminUN, creds.password);
        // make "Wasabi Tysons" as tenant to get feature  from Key visible
        utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
        // check feature flag checkbox
        setupPageObjs.enableFlag();
        // logout from admin
        loginPageObjs.logout();
        // login as managing Analyst
        loginPageObjs.loginAs(usernames.managinganalystUN, creds.password);
        // make "Wasabi Tysons" as tenant to get feature  from Key visible
        utilObj.checkRestUnitWO(testData.tenantName);
        // verify elements from Home page
        loginPageObjs.verifyHomePage();
        // logout from application
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
        // logout from admin
        loginPageObjs.logout();
        // login as managing Analyst
        loginPageObjs.loginAs(usernames.managinganalystUN, creds.password);
        utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
        // go to order page
        hamburgerMenuPageObj.goToOrders();
        // view order
        orderPage.viewOrder();
        //export
        orderPage.exportOrder();
        orderPage.changeStatusToSaved();
        // delete saved order
        orderPage.deleteOrderInv();
        // change status to all
        orderPage.changeStatusToSent();
        // delete order
        orderPage.deleteOrderInv();
        // view inbox
        orderPage.viewInbox();
        assertionPage.verifyPageSearchFilter();
        // logout from managing analyst
        loginPageObjs.logout();
    });

    it("Complete initial review", () => {
        // login as managing Analyst
        loginPageObjs.loginAs(usernames.managinganalystUN, creds.password);
        utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
        // go to order page
        hamburgerMenuPageObj.goToOrders();
        // attach and upload invoice
        orderPage.attachInvoice();
        // end preprocessing
        orderPage.endPreProcessing();
        //go to Priority Report
        hamburgerMenuPageObj.goToPriorityReport();
        cy.wait(10000);
        //start the bulk IR
        priorityReportPage.startIR(testData.tenantName);
        // complete initial Review
        orderPage.irProcessWithTenantCheck(testData.tenantName, newInvoiceNum, newCustomerName);
        //logout from app
        loginPageObjs.logout();
    });

    it("Complete the Reconciallations", () => {
        // login as managing Analyst
        loginPageObjs.loginAs(usernames.managinganalystUN, creds.password);
        utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
        hamburgerMenuPageObj.goToOrders();
        // reconcile order
        orderPage.changeStatusToInReconciliation(newInvoiceNum);
        orderPage.ReconcialltionProcessWithTenantCheck(testData.tenantName, newInvoiceNum, newCustomerName);
        //logout from app
        loginPageObjs.logout();
    });

    it("Complete the Final Review", () => {
        // login as managing Analyst
        loginPageObjs.loginAs(usernames.managinganalystUN, creds.password);
        utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
        hamburgerMenuPageObj.goToOrders();
        orderPage.changeStatusToFinalReview(newInvoiceNum);
        // delete pending Reconciliation
        orderPage.deletePendingReconciliation();
        // goto retired order
        orderPage.changeStatusToRetiredOrder();
        // undelete Order
        orderPage.undeleteOrder(newInvoiceNum);
        orderPage.changeStatusToFinalReview(newInvoiceNum);
        // add line item in the final Review
        let newVendorItem = testData.vendorItem + utilObj.makeId();
        let newVendorItemCode = testData.vendorItemCode + utilObj.makeId();
        orderPage.finalReviewProcess(newVendorItemCode, newVendorItem, "2oz Souffle Cup Lid");
        // logout from managing analyst
        loginPageObjs.logout();
        // login as admin
        loginPageObjs.loginAs(usernames.adminUN, creds.password);
        utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
        hamburgerMenuPageObj.goToOrders();
        orderPage.changeStatusToAccountManagerReview();
        // solve questions regarding vendor item
        orderPage.resolveQuestionsInAMReview();
        //logout from app
        loginPageObjs.logout();
    });

    it("Close the order", () => {
        // login as managing Analyst
        loginPageObjs.loginAs(usernames.managinganalystUN, creds.password);
        utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
        hamburgerMenuPageObj.goToOrders();
        orderPage.changeStatusToClosed();
        // reopen the closed order and then again close the order
        orderPage.reOpenOrder(newInvoiceNum);
        // delete closed order
        orderPage.changeStatusToClosed();
        orderPage.deleteClosedOrder(newInvoiceNum);
        //logout from app
        loginPageObjs.logout();
    });

    it('verify Performance Page', () => {
        // login as managing Analyst
        loginPageObjs.loginAs(usernames.managinganalystUN, creds.password);
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
        // login as managing Analyst
        loginPageObjs.loginAs(usernames.managinganalystUN, creds.password);
        // go to vendor page
        hamburgerMenuPageObj.goToVendor();
        // check view access
        vendorsPage.viewVendors();
        // check download feature
        vendorsPage.download();
        // create new vendor
        vendorsPage.createVendorWithOnlyName(createVendorName);
        // select the new vendor
        vendorsPage.selectVendor(createVendorName);
        // edit and delete the newly created vendor
        vendorsPage.editAndDeleteVendor(createVendorName);
        vendorsPage.selectVendor("Arrow");
        // click order guide setup
        vendorsPage.configureOrderGuide();
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Vendor Items Page", () => {
        // login as managing Analyst
        loginPageObjs.loginAs(usernames.managinganalystUN, creds.password);
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
        vendorItemPage.editVendorItem(newVendorItem);
        // delete vendor Item
        vendorItemPage.deleteVendorItem(newVendorItem);
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Product Page", () => {
        // login as managing Analyst
        loginPageObjs.loginAs(usernames.managinganalystUN, creds.password);
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
        //logout from app
        // go to setup verification and veify
        hamburgerMenuPageObj.goToSetupVerification();
        loginPageObjs.logout();
    });

    it("Check Recipe Page", () => {
        // login as managing Analyst
        loginPageObjs.loginAs(usernames.managinganalystUN, creds.password);
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
        // login as managing Analyst
        loginPageObjs.loginAs(usernames.managinganalystUN, creds.password);
        // make "Wasabi Tysons" as tenant to get feature  from Key visible
        utilObj.checkRestUnitWO(testData.tenantName);
        hamburgerMenuPageObj.goToSetup();
        // go to users and veify
        hamburgerMenuPageObj.goToUsersSetup();
        assertionPage.checkContentDisplayed();
        // go to usage Report and veify
        hamburgerMenuPageObj.goToUsageReportSetup();
        assertionPage.verifyPageSearchFilter();
        // go to lead priority report and veify
        hamburgerMenuPageObj.goToLeadPriorityReport();
        assertionPage.checkContentDisplayed();
        // go to CS Report 2.0 and veify
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
        // login as managing Analyst
        loginPageObjs.loginAs(usernames.managinganalystUN, creds.password);
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