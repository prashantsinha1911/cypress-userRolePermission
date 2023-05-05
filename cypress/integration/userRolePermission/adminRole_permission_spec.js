const loginPageObjs = require("../../page_objects/login.pageObjects");
const setupPageObjs = require("../../page_objects/setup.page");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");
const testData = require("../../fixtures/rolePermission.json");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const assertionPage = require("../../page_objects/assertion.page");
const performancePage = require("../../page_objects/performance.page");
const vendorsPage = require("../../page_objects/vendors.page");
const vendorItemPage = require("../../page_objects/vendorItems.page");
const orderPage = require("../../page_objects/order.page");
const priorityReportPage = require("../../page_objects/priorityReport.page");
const productPage = require("../../page_objects/product.page");
const recipeSetupPage = require("../../page_objects/recipeSetup.page");
const menuItemPageObj = require("../../page_objects/menutem.page");
const inventoriesRolePage = require("../../page_objects/inventoriesRole.page");
const restaurantPage = require("../../page_objects/restaurant.page");
const utilObj = require("../../utils/util_generic");
const util_generic = require("../../utils/util_generic");

let timeStamp = new Date().toISOString();
let createVendorName = testData.vendorName + utilObj.makeId();
let newVIName = testData.vendorItemName + timeStamp;
let newProductName = testData.testProductName + utilObj.makeId();
let newInvoiceNum = testData.invoiceNum + utilObj.makeId();
let newCustomerName = testData.customerName;
let newRecipeTypeName = testData.testRecipeTypeName + utilObj.makeId();
let newRecipeName = testData.testRecipeName + utilObj.makeId();
let createRestName = testData.restaurant + utilObj.makeId();
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
    // login as admin
    loginPageObjs.loginAs(usernames.adminUN, creds.password);
});

after(() => {
    cy.exec('rm -rf cypress/downloads/*', { failOnNonZeroExit: false });
});

describe('Role Permission Verification for Admin', () => {
    it('verify Home page', () => {
        util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
        // check feature flag checkbox
        setupPageObjs.enableFlag();
        // check settings and password change
        loginPageObjs.checkPasswordChangeAndSettings();
        // go to home
        hamburgerMenuPageObj.goToHome();
        // verify elements from Home page
        loginPageObjs.verifyHomePage();
        //logout from app
        loginPageObjs.logout();
    });

    it('verify Order Page', () => {
        util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
        // go to order page
        hamburgerMenuPageObj.goToOrders();
        // view order
        orderPage.viewOrder();
        orderPage.exportOrder();
        // view inbox
        orderPage.viewInbox();
        assertionPage.verifyPageSearchFilter();
        // send order
        hamburgerMenuPageObj.goToPlaceOrders();
        orderPage.placeOrder();
        // change status to all
        orderPage.changeStatusToSent();
        orderPage.viewOrder();
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

    it("check invoice approval,transfer, setup under Order", () => {
        hamburgerMenuPageObj.goToCentral();
        hamburgerMenuPageObj.goToRestaurant();
        // created a restaurant with the same company-concept as Wasabi Tyson to make transfer under order visible
        restaurantPage.createRestaurant("Wasabi", "Wasabi Sushi Co", createRestName, emailID, loginID, firstName, lastName);
        cy.reload();
        hamburgerMenuPageObj.goToOrderParent();
        // verify transfer order
        hamburgerMenuPageObj.goToTransferOrder();
        assertionPage.verifyPageTitle();
        // verify invoice approval
        hamburgerMenuPageObj.goToInvoiceApproval();
        assertionPage.verifyPageTitle();
        // verify order setup
        hamburgerMenuPageObj.goToOrderSetup();
        assertionPage.verifyPageTitle();
        //logout from app
        loginPageObjs.logout();
    });

    it("Complete initial review", () => {
        util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
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
        util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
        hamburgerMenuPageObj.goToOrders();
        // reconcile order
        orderPage.changeStatusToInReconciliation(newInvoiceNum);
        orderPage.ReconcialltionProcessWithTenantCheck(testData.tenantName, newInvoiceNum, newCustomerName);
        //logout from app
        loginPageObjs.logout();
    });

    it("Complete the Final Review", () => {
        util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
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
        orderPage.finalReviewProcess(newVendorItemCode, newVendorItem, testData.productName);
        orderPage.changeStatusToAccountManagerReview();
        // solve questions regarding vendor item
        orderPage.resolveQuestionsInAMReview();
        //logout from app
        loginPageObjs.logout();
    });

    it("Close the order", () => {
        util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
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

    // check for all tabs on perf page
    it("Check Performance Budget Page", () => {
        // go to perf budget page and assert budget page
        hamburgerMenuPageObj.goToPerfBudget();
        assertionPage.verifyPerfBudgetPage();
        //logout from app
        loginPageObjs.logout();
    });

    it('check performance category page', () => {
        // go to perf category report page and assert category report page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToCategoryReport();
        assertionPage.verifyPerfCategoryPage();
        performancePage.export('categoryReport');
        //logout from app
        loginPageObjs.logout();
    });

    it('check performance controllable P&L', () => {
        // go to perf Controllable P&L report page and assert Controllable P&L page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToControllabelPL();
        assertionPage.verifyPerfControllablePL();
        //logout from app
        loginPageObjs.logout();
    });

    it('check performance custom report', () => {
        // go to perf custom reports page and assert custom report page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToPerfCustomReports();
        assertionPage.verifyPerfCustomReports();
        //logout from app
        loginPageObjs.logout();
    });

    it('check performance food usage report', () => {
        // go to perf Food Usage report page and assert Food Usage page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToFoodUsageReport();
        assertionPage.verifyPerfFoodUsage();
        performancePage.export('foodUsageReport');
        //logout from app
        loginPageObjs.logout();
    });

    it('check performance sales ', () => {
        // go to perf Sales page and assert sales page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToSales();
        assertionPage.verifyPerfSales();
        //logout from app
        loginPageObjs.logout();
    });

    it('check performance price alert', () => {
        // go to perf Price Alert report page and assert price alert page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToPriceAlert();
        assertionPage.verifyPerfPriceAlert();
        performancePage.export('alerts');
        //logout from app
        loginPageObjs.logout();
    });

    it('check performance price movers', () => {
        // go to perf Price Movers report page and assert movers alert page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToPriceMovers();
        assertionPage.verifyPerfPriceMovers();
        performancePage.export('priceMovers');
        //logout from app
        loginPageObjs.logout();
    });

    it('check performance theoretical food usage report', () => {
        // go to perf Usage report page and assert Usage alert page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToFoodUsage();
        assertionPage.verifyPerfTheorUsage();
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Vendor Page", () => {
        // go to vendor page
        hamburgerMenuPageObj.goToVendor();
        // check view access
        vendorsPage.viewVendors();
        // check configure defaults
        vendorsPage.configureDefaults();
        // check download feature
        vendorsPage.download();
        // create new vendor
        vendorsPage.createVendor(createVendorName, emailID);
        // select the new vendor
        vendorsPage.selectVendor(createVendorName);
        // edit and delete the newly created vendor
        vendorsPage.editAndDeleteVendor(createVendorName);
        vendorsPage.selectVendor(testData.existingVendor);
        // click order guide setup
        vendorsPage.configureOrderGuide();
        // click manage Items for all restaurants
        vendorsPage.multiUnitOrderGuideSetup();
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Vendor Items Page", () => {
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
        loginPageObjs.logout();
    });

    it("Check Recipe Page", () => {
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

    // check for all tabs on setup page
    it("check setup unit settings", () => {
        hamburgerMenuPageObj.goToUnitSettings();
        assertionPage.verifyPageSearchFilter();
        //logout from app
        loginPageObjs.logout();
    });

    it("check setup Integrarion", () => {
        hamburgerMenuPageObj.goToSetup();
        hamburgerMenuPageObj.goToIntegrationSetup();
        assertionPage.verifyPageTitle();
        //logout from app
        loginPageObjs.logout();
    });

    it("check setup point of sales", () => {
        hamburgerMenuPageObj.goToSetup();
        hamburgerMenuPageObj.goToPointOfSales();
        assertionPage.verifyPointOfSalePage();
        //logout from app
        loginPageObjs.logout();
    });

    it("check setup usage report", () => {
        hamburgerMenuPageObj.goToSetup();
        hamburgerMenuPageObj.goToUsageReportSetup();
        assertionPage.verifyPageSearchFilter();
        //logout from app
        loginPageObjs.logout();
    });

    it("check css report 2", () => {
        hamburgerMenuPageObj.goToSetup();
        hamburgerMenuPageObj.goToCssReport2();
        assertionPage.checkContentDisplayed();
        //logout from app
        loginPageObjs.logout();
    });

    it("check setup verification under product", () => {
        hamburgerMenuPageObj.goToProduct();
        hamburgerMenuPageObj.goToSetupVerification();
        //logout from app
        loginPageObjs.logout();
    });

    it("check setup reconciliation report", () => {
        hamburgerMenuPageObj.goToSetup();
        hamburgerMenuPageObj.goToReconciliationReportSetup();
        assertionPage.checkContentDisplayed();
        //logout from app
        loginPageObjs.logout();
    });

    it("check setup notification", () => {
        hamburgerMenuPageObj.goToSetup();
        hamburgerMenuPageObj.goToNotification();
        assertionPage.verifyNotificationsPage();
        //logout from app
        loginPageObjs.logout();
    });

    it("check setup users", () => {
        hamburgerMenuPageObj.goToSetup();
        hamburgerMenuPageObj.goToUsersSetup();
        assertionPage.checkContentDisplayed();
        //logout from app
        loginPageObjs.logout();
    });

    // check for all tabs on central page
    it("check Central Concept Page", () => {
        // go to concept
        hamburgerMenuPageObj.goToConcept();
        assertionPage.checkContentDisplayed();
        //logout from app
        loginPageObjs.logout();
    });

    it("check Central Companies Page", () => {
        hamburgerMenuPageObj.goToCentral();
        // go to Companies
        hamburgerMenuPageObj.goToCompanies();
        assertionPage.checkContentDisplayed();
        //logout from app
        loginPageObjs.logout();
    });

    it("check Central Restaurant Page", () => {
        hamburgerMenuPageObj.goToCentral();
        // go to Restaurant
        hamburgerMenuPageObj.goToRestaurant();
        assertionPage.verifyPageSearchFilter();
        //logout from app
        loginPageObjs.logout();
    });

    it("check Central Users Page", () => {
        hamburgerMenuPageObj.goToCentral();
        // go to Users
        hamburgerMenuPageObj.goToUsersCentral();
        assertionPage.checkContentDisplayed();
        //logout from app
        loginPageObjs.logout();
    });

    it("check Central Vendor Page", () => {
        hamburgerMenuPageObj.goToCentral();
        // go to Vendor
        hamburgerMenuPageObj.goToVendorCentral();
        assertionPage.checkContentDisplayed();
        //logout from app
        loginPageObjs.logout();
    });

    it("check Central Vendor Merge Page", () => {
        hamburgerMenuPageObj.goToCentral();
        // go to VendorMerge
        hamburgerMenuPageObj.goToVendorMergeCentral();
        assertionPage.checkContentDisplayed();
        //logout from app
        loginPageObjs.logout();
    });

    it("check Central  Vendor Item Page", () => {
        hamburgerMenuPageObj.goToCentral();
        // go to VendorItem
        hamburgerMenuPageObj.goToVendorItemCentral();
        assertionPage.verifyCentralVendor();
        //logout from app
        loginPageObjs.logout();
    });

    it("check Central Vendor Item Merge Page", () => {
        hamburgerMenuPageObj.goToCentral();
        // go to VendorItem
        hamburgerMenuPageObj.goToVendorItemMergeCentral();
        assertionPage.verifyCentralVendor();
        //logout from app
        loginPageObjs.logout();
    });

    it("check Central Product Merge", () => {
        hamburgerMenuPageObj.goToCentral();
        // go to ProductMerge
        hamburgerMenuPageObj.goToProductMergeCentral();
        assertionPage.verifyProductMerge();
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Central onboarding Page", () => {
        hamburgerMenuPageObj.goToCentral();
        // go to Onboarding
        hamburgerMenuPageObj.goToOnboardingCentral();
        assertionPage.checkContentDisplayed();
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Central company config Page", () => {
        hamburgerMenuPageObj.goToCentral();
        // go to CompanyConfig
        hamburgerMenuPageObj.goToCompanyConfigCentral();
        assertionPage.verifyPageSearchFilter();
        //logout from app
        loginPageObjs.logout();
    });

    // check for all tabs on accounting page
    it("check Acc Category  page", () => {
        hamburgerMenuPageObj.goToAccounting();
        hamburgerMenuPageObj.goToCategoriesChildAcc();
        assertionPage.verifyAccountPageChildren();
        //logout from app
        loginPageObjs.logout();
    });

    it("check Acc sales Entries Page", () => {
        hamburgerMenuPageObj.goToAccounting();
        // go to sales entries
        hamburgerMenuPageObj.goToSalesEntriesChildAcc();
        assertionPage.verifyAccountPageChildren();
        //logout from app
        loginPageObjs.logout();
    });

    it("check Acc Journal Entries page", () => {
        hamburgerMenuPageObj.goToAccounting();
        // go to journal entries
        hamburgerMenuPageObj.goToJournalEntriesChildAcc();
        assertionPage.verifyAccountPageChildren();
        //logout from app
        loginPageObjs.logout();
    });

    it("check Acc Inventories Entries Page", () => {
        hamburgerMenuPageObj.goToAccounting();
        // go to inventories entries
        hamburgerMenuPageObj.goToInventoryEntriesChildAcc();
        assertionPage.verifyAccountPageChildren();
        //logout from app
        loginPageObjs.logout();
    });

    it("check Acc vendor Mapping Page", () => {
        hamburgerMenuPageObj.goToAccounting();
        // go to vendor mapping
        hamburgerMenuPageObj.goToVendorMappingChildAcc();
        assertionPage.verifyAccountPageChildren();
        //logout from app
        loginPageObjs.logout();
    });

    it("check Acc PMIX mapping page", () => {
        hamburgerMenuPageObj.goToAccounting();
        // go to PMIX mapping
        hamburgerMenuPageObj.goToPMIXMappingChildAcc();
        assertionPage.verifyAccountPageChildren();
        //logout from app
        loginPageObjs.logout();
    });

    it("check Acc payment Account page", () => {
        hamburgerMenuPageObj.goToAccounting();
        //  go to payment accounts
        hamburgerMenuPageObj.goToPaymentAccountsChildAcc();
        assertionPage.verifyAccountPageChildren();
        //logout from app
        loginPageObjs.logout();
    });

    it("check Acc close Books Page", () => {
        hamburgerMenuPageObj.goToAccounting();
        // go to close books
        hamburgerMenuPageObj.goToCloseBooksChildAcc();
        assertionPage.verifyAccountPageChildren();
        //logout from app
        loginPageObjs.logout();
    });

    it("check Acc budget setup page", () => {
        hamburgerMenuPageObj.goToAccounting();
        // go to budget setup
        hamburgerMenuPageObj.goToBudgetSetupChildAcc();
        assertionPage.verifyPageSearchFilter();
        //logout from app
        loginPageObjs.logout();
    });

    it("check Acc Sales Mapping", () => {
        hamburgerMenuPageObj.goToAccounting();
        //go to sales Mapping
        hamburgerMenuPageObj.goToSalesMappingChildAcc();
        assertionPage.verifyPageSearchFilter();
        //logout from app
        loginPageObjs.logout();
    });

    it("check Acc export page", () => {
        hamburgerMenuPageObj.goToAccounting();
        // go to export
        hamburgerMenuPageObj.goToExportChildAcc();
        assertionPage.verifyAccountPageChildren();
        //logout from app
        loginPageObjs.logout();
    });
});