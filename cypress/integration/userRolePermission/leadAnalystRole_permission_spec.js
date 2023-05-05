const loginPageObjs = require("../../page_objects/login.pageObjects");
const setupPageObjs = require("../../page_objects/setup.page");
const usernames = require("../../fixtures/userNames.json");
const creds = require("../../fixtures/credentials.json");
const testData = require("../../fixtures/rolePermission.json");
const hamburgerMenuPageObj = require("../../page_objects/hamburgerMenu.pageObj");
const util_generic = require("../../utils/util_generic");
const performancePage = require("../../page_objects/performance.page");
const assertionPage = require("../../page_objects/assertion.page");
const vendorsPage = require("../../page_objects/vendors.page");
const orderPageObj = require("../../page_objects/order.page");
const priorityReportPage = require("../../page_objects/priorityReport.page");
const vendorItemPage = require("../../page_objects/vendorItems.page");

let timeStamp = new Date().toISOString();
let newInvoiceNum = testData.invoiceNum + util_generic.makeId();
let newCustomerName = testData.customerName;
let createVendorName = testData.vendorName + util_generic.makeId();
let createEmail = "test" + util_generic.makeId() + "@gmail.com";
let newVIName = testData.vendorItem + util_generic.makeId();
let newItemCode = util_generic.makeId();

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

beforeEach(() => {
    // open the application and verify elements from Login page
    cy.visit(Cypress.env('host'));
    cy.wait(2000);
    loginPageObjs.verifyLoginPageElement();
    cy.wait(2000);
});

after(() => {
    cy.exec('rm -rf cypress/downloads/*', { failOnNonZeroExit: false });
});

describe('Role Permission Verification for Lead Analyst', () => {
    it('checking nightly sales data as admin', () => {
        // login as lead analyst
        loginPageObjs.loginAs(usernames.adminUN, creds.password);
        util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
        // check Nightly Sales data checkbox
        setupPageObjs.enableFlag();
        // logout from admin
        loginPageObjs.logout();
    });

    it('verify Home page', () => {
        // login as lead analyst
        loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
        util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
        // chek settings and password
        loginPageObjs.checkPasswordChangeAndSettings();
        loginPageObjs.element.logoutDD().should('be.visible').click({ force: true });
        // verify elements from Home page
        loginPageObjs.verifyHomePage();
        // logout from app
        loginPageObjs.logout();
    });

    it('save and send order as admin', () => {
        // login as lead analyst
        loginPageObjs.loginAs(usernames.adminUN, creds.password);
        util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
        hamburgerMenuPageObj.goToPlaceOrders();
        orderPageObj.saveOrder();
        hamburgerMenuPageObj.goToPlaceOrders();
        orderPageObj.placeNewOrder('Arrow');
        loginPageObjs.logout();
    });

    it('verify order page as lead analyst', () => {
        // login as lead analyst
        loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
        util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
        // go to order page
        hamburgerMenuPageObj.goToOrders();
        // view order
        orderPageObj.viewOrder();
        orderPageObj.exportOrder()
        orderPageObj.element.inboxBtn().should('not.be.disabled');
        orderPageObj.changeStatusToSaved();
        loginPageObjs.logout();
    });

    it('cancel Preprocessing as admin', () => {
        loginPageObjs.loginAs(usernames.adminUN, creds.password);
        util_generic.checkRestUnit(testData.tenantName, testData.tenantName);
        hamburgerMenuPageObj.goToOrders()
        orderPageObj.changeStatusToPreprocessing();
        loginPageObjs.logout();
    });

    // check for all tabs on perf page
    it("Check Performance Budget Page", () => {
        // login as lead analyst
        loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
        // go to perf budget page and assert budget page
        hamburgerMenuPageObj.goToPerfBudget();
        assertionPage.verifyPerfBudgetPage();
        //logout from app
        loginPageObjs.logout();
    });

    it('check performance category page', () => {
        // login as lead analyst
        loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
        // go to perf category report page and assert category report page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToCategoryReport();
        assertionPage.verifyPerfCategoryPage();
        performancePage.export('categoryReport');
        //logout from app
        loginPageObjs.logout();
    });

    it('check performance controllable P&L', () => {
        // login as lead analyst
        loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
        // go to perf Controllable P&L report page and assert Controllable P&L page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToControllabelPL();
        assertionPage.verifyPerfControllablePL();
        //logout from app
        loginPageObjs.logout();
    });

    it('check performance custom report', () => {
        // login as lead analyst
        loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
        // go to perf custom reports page and assert custom report page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToPerfCustomReports();
        assertionPage.verifyPerfCustomReports();
        //logout from app
        loginPageObjs.logout();
    });

    it('check performance food usage report', () => {
        // login as lead analyst
        loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
        // go to perf Food Usage report page and assert Food Usage page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToFoodUsageReport();
        assertionPage.verifyPerfFoodUsage();
        performancePage.export('foodUsageReport');
        //logout from app
        loginPageObjs.logout();
    });

    it('check performance sales ', () => {
        // login as lead analyst
        loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
        // go to perf Sales page and assert sales page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToSales();
        assertionPage.verifyPerfSales();
        //logout from app
        loginPageObjs.logout();
    });

    it('check performance price alert', () => {
        // login as lead analyst
        loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
        // go to perf Price Alert report page and assert price alert page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToPriceAlert();
        assertionPage.verifyPerfPriceAlert();
        performancePage.export('alerts');
        //logout from app
        loginPageObjs.logout();
    });

    it('check performance price movers', () => {
        // login as lead analyst
        loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
        // go to perf Price Movers report page and assert movers alert page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToPriceMovers();
        assertionPage.verifyPerfPriceMovers();
        performancePage.export('priceMovers');
        //logout from app
        loginPageObjs.logout();
    });

    it('check performance theoretical food usage report', () => {
        // login as lead analyst
        loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
        // go to perf Usage report page and assert Usage alert page
        hamburgerMenuPageObj.goToPerformance();
        hamburgerMenuPageObj.goToFoodUsage();
        assertionPage.verifyPerfTheorUsage();
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Vendor Page", () => {
        // login as lead analyst
        loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
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
        //logout from app
        loginPageObjs.logout();
    });

    it("Check Vendor Items Page", () => {
        // login as lead analyst
        loginPageObjs.loginAs(usernames.leadanalystUN, creds.password);
        // go to vendor page
        hamburgerMenuPageObj.goToVendorItems();
        // check view for VI
        vendorItemPage.viewVI();
        // export vendor item
        vendorItemPage.exportFeature();
        // add new vendor Item
        vendorItemPage.createVI(testData.existingVendor, newVIName, newItemCode, testData.productName, "Test", "4", "40");
        // edit vendor Item
        vendorItemPage.editVendorItem(newVIName);
        loginPageObjs.logout()
    });
});