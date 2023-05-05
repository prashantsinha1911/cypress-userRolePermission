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
const restaurantPage = require("../../page_objects/restaurant.page");
const menuItemPageObj = require("../../page_objects/menutem.page");
const priorityReportPage = require("../../page_objects/priorityReport.page");

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

describe('Role Permission Verification for Accountant', () => {
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
        // login as Accountant
        loginPageObjs.loginAs(usernames.accountantUN, creds.password);
        // make "Wasabi Tysons" as tenant to get feature  from Key visible
        utilObj.checkRestUnitWO(testData.tenantName);
        // verify elements from Home page
        loginPageObjs.verifyHomePage();
        //logout from app
        loginPageObjs.logout();
    });

    it('verify Order Page', () => {
        // login as associate accountant
        loginPageObjs.loginAs(usernames.adminUN, creds.password);
        utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
        // save order
        hamburgerMenuPageObj.goToPlaceOrders();
        orderPage.saveOrder();
        //logout from app
        loginPageObjs.logout();
        // login as Accountant
        loginPageObjs.loginAs(usernames.accountantUN, creds.password);
        utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
        // go to order page
        hamburgerMenuPageObj.goToOrders();
        // view order
        orderPage.viewOrder();
        assertionPage.verifyPageSearchFilter();
        orderPage.changeStatusToSaved();
        // delete saved order
        orderPage.deleteOrderInv();
        //logout from app
        loginPageObjs.logout();
    });

    it("check invoice approval,transfer, setup under Order", () => {
        // login as admin
        loginPageObjs.loginAs(usernames.adminUN, creds.password);
        utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
        hamburgerMenuPageObj.goToCentral();
        hamburgerMenuPageObj.goToRestaurant();
        // created a restaurant with the same company-concept as Wasabi Tyson to make transfer under order visible
        restaurantPage.createRestaurant("Wasabi", "Wasabi Sushi Co", createRestName, emailID, loginID, firstName, lastName);
        cy.reload();
        //logout from app
        loginPageObjs.logout();
        // login as Accountant
        loginPageObjs.loginAs(usernames.accountantUN, creds.password);
        utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
        // go to order page
        hamburgerMenuPageObj.goToOrders();
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
        // login as admin
        loginPageObjs.loginAs(usernames.adminUN, creds.password);
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
        // login as admin
        loginPageObjs.loginAs(usernames.adminUN, creds.password);
        utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
        hamburgerMenuPageObj.goToOrders();
        // reconcile order
        orderPage.changeStatusToInReconciliation(newInvoiceNum);
        orderPage.ReconcialltionProcessWithTenantCheck(testData.tenantName, newInvoiceNum, newCustomerName);
        //logout from app
        loginPageObjs.logout();
    });

    it("Complete the Final Review", () => {
        // login as admin
        loginPageObjs.loginAs(usernames.adminUN, creds.password);
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
        orderPage.changeStatusToAccountManagerReview();
        // solve questions regarding vendor item
        orderPage.resolveQuestionsInAMReview();
        //logout from app
        loginPageObjs.logout();
    });

    it("Close the order", () => {
        // login as admin
        loginPageObjs.loginAs(usernames.adminUN, creds.password);
        utilObj.checkRestUnit(testData.tenantName, testData.tenantName);
        hamburgerMenuPageObj.goToOrders();
        orderPage.changeStatusToClosed();
        //logout from app
        loginPageObjs.logout();
        // login as Accountant
        loginPageObjs.loginAs(usernames.accountantUN, creds.password);
        hamburgerMenuPageObj.goToOrders();
        // delete closed order
        orderPage.deleteClosedOrderWithoutSorting(newInvoiceNum);
        //logout from app
        loginPageObjs.logout();
    });

    it('verify Performance Page', () => {
        // login as Accountant
        loginPageObjs.loginAs(usernames.accountantUN, creds.password);
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
        // login as Accountant
        loginPageObjs.loginAs(usernames.accountantUN, creds.password);
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
        // edit and delete the newly created vendor
        vendorsPage.deleteVendor(createVendorName);
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Vendor Items Page", () => {
        // login as accountant
        loginPageObjs.loginAs(usernames.accountantUN, creds.password);
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
        // login as accountant
        loginPageObjs.loginAs(usernames.accountantUN, creds.password);
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

    it("Check Accounting Pages", () => {
        // login as accountant
        loginPageObjs.loginAs(usernames.accountantUN, creds.password);
        hamburgerMenuPageObj.goToAccounting();
        // go to export
        hamburgerMenuPageObj.goToExportChildAcc();
        assertionPage.verifyAccountPageChildren();
        // go to reconcillation
        hamburgerMenuPageObj.goToReconcillationChildAcc();
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

    it("Check Setup Pages", () => {
        // login as accountant
        loginPageObjs.loginAs(usernames.accountantUN, creds.password);
        // make "Wasabi Tysons" as tenant to get feature  from Key visible
        utilObj.checkRestUnitWO(testData.tenantName);
        hamburgerMenuPageObj.goToSetup();
        hamburgerMenuPageObj.goToSetupBilling();
        // go to integration and verify
        hamburgerMenuPageObj.goToIntegrationSetup();
        // go to POS and verify
        hamburgerMenuPageObj.goToSetupPOS();
        // go to Usage Report and verify
        hamburgerMenuPageObj.goToUsageReportSetup();
        assertionPage.verifyPageSearchFilter();
        //logout from app
        loginPageObjs.logout();
    });
});