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

describe('Role Permission Verification for Unit Admin', () => {
    it('verify Home page', () => {
        // to make sure Nightly Sales data checkBox is checked so that sales will be visible for unit admin
        // login as admin
        loginPageObjs.loginAs(usernames.adminUN, creds.password);
        // make "Wasabi Tysons" as tenant to get feature  from Key visible
        loginPageObjects.chooseTenant(testData.tenantName);
        // check feature flag checkbox
        setupPageObjs.enableFlag();
        // logout from admin
        loginPageObjs.logout();
        // login as unit admin
        loginPageObjs.loginAs(usernames.unitadminUN, creds.password);
        // make "Wasabi Tysons" as tenant to get feature  from Key visible
        utilObj.checkRestUnitWO(testData.tenantName);
        // verify elements from Home page
        loginPageObjs.verifyHomePage();
        // logout from application
        loginPageObjs.logout();
    });

    it("Check Order Page", () => {
        // login as unit admin
        loginPageObjs.loginAs(usernames.unitadminUN, creds.password);
        // go to order page
        hamburgerMenuPageObj.goToOrders();
        // view order
        orderPage.viewOrder();
        // check edit access
        hamburgerMenuPageObj.goToOrders();
        orderPage.checkForEdit();
        // place order
        hamburgerMenuPageObj.goToPlaceOrders();
        orderPage.placeOrder();
        // change status to all
        orderPage.changeStatusToSent();
        // resend order
        orderPage.resendOrder();
        // delete order
        orderPage.deleteOrderInv();
        // attach and upload invoice
        orderPage.attachInvoice();
        // save order
        hamburgerMenuPageObj.goToPlaceOrders();
        orderPage.saveOrder();
        // delete saved order
        orderPage.changeStatusToSaved();
        orderPage.deleteOrderInv();
        // No access to delete closed order
        orderPage.changeStatusToClosed();
        orderPage.deleteOrderCheck();
        // verify invoice approval
        hamburgerMenuPageObj.goToInvoiceApproval();
        // goToSetupTranfer
        hamburgerMenuPageObj.goToOrderSetup();
        orderPage.checkInitailTransfer();
        // verify transfer order
        hamburgerMenuPageObj.goToTransferOrder();
        // logout from application
        loginPageObjs.logout();    
    });
        
    it("Check Performance Page", () => {
        // check for all tabs on performance page
        // login as unit admin
        loginPageObjs.loginAs(usernames.unitadminUN, creds.password);
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
        // logout from application
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
        // login as unit admin
        loginPageObjs.loginAs(usernames.unitadminUN, creds.password);
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
        // delete the newly created vendor
        vendorsPage.deleteVendor(createVendorName);
        // go to vendor page
        vendorsPage.viewVendors();
        vendorsPage.selectVendor("Arrow");
        // click order guide setup
        vendorsPage.configureOrderGuide();
        // click manage Items for all restaurants
        vendorsPage.multiUnitOrderGuideSetup();
        // logout from application
        loginPageObjs.logout();
    });

    it("Check Vendor Items Page", () => {
        // login as unit admin
        loginPageObjs.loginAs(usernames.unitadminUN, creds.password);
        // go to vendor page
        hamburgerMenuPageObj.goToVendorItems();
        // check view for VI
        vendorItemPage.viewVI();
        // export vendor item
        vendorItemPage.exportFeature();
        // check add new vi is not present
        vendorItemPage.checkAddButton();
        // logout from admin
        loginPageObjs.logout();
        // login as account manager
        loginPageObjs.loginAs(usernames.accountManagerUN, creds.password);
        // go to vendor page
        hamburgerMenuPageObj.goToVendorItems();
        // check view for VI
        vendorItemPage.viewVI();
        // add new vendor Item
        let newVendorItem = testData.vendorItem + utilObj.makeId();
        let newVendorItemCode = testData.vendorItemCode + utilObj.makeId();
        vendorItemPage.createVI(testData.existingVendor, newVendorItem, newVendorItemCode, testData.productName, "Test", "4", "40");
        // logout 
        loginPageObjs.logout();
        // login as unit admin
        loginPageObjs.loginAs(usernames.unitadminUN, creds.password);
        // go to vendor page
        hamburgerMenuPageObj.goToVendorItems();
        // check view for VI
        vendorItemPage.viewVI();     
        // edit vendor Item
        vendorItemPage.editVendorItemForUnitAdmin(newVendorItem);
        // delete vendor Item
        vendorItemPage.deleteVendorItem2();
        // logout from application
        loginPageObjs.logout();
    });

    it("Check Product Page", () => {
        // login as unit admin
        loginPageObjs.loginAs(usernames.unitadminUN, creds.password);
        // go to Product page
        hamburgerMenuPageObj.goToProduct();
        // view product
        productPage.viewProduct();
        // check export
        productPage.checkExport();
        // check create prod
        productPage.createProductForUnitAdmin(newProductName);
        // check edit and delete product
        productPage.editCreatedProduct(newProductName);
        productPage.deleteProduct();
        // go to setup verification and veify
        hamburgerMenuPageObj.goToSetupVerification();
        // logout from application
        loginPageObjs.logout();
    });

    it("Check Recipe Page", () => {
        // login as unit admin
        loginPageObjs.loginAs(usernames.unitadminUN, creds.password);
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
        // logout from application
        loginPageObjs.logout();
    });

    it("Check Setup Pages", () => {
        // login as unit admin
        loginPageObjs.loginAs(usernames.unitadminUN, creds.password);
        // make "Wasabi Tysons" as tenant to get feature  from Key visible
        utilObj.checkRestUnitWO(testData.tenantName);
        hamburgerMenuPageObj.goToSetup();
        hamburgerMenuPageObj.goToSetupBilling();
        // go to users and veify
        hamburgerMenuPageObj.goToUsersSetup();
        assertionPage.checkContentDisplayed();
        // go to integration and veify
        hamburgerMenuPageObj.goToIntegrationSetup();
        // go to POS and veify Usage Report
        hamburgerMenuPageObj.goToSetupPOS();
        hamburgerMenuPageObj.goToUsageReportSetup();
        assertionPage.verifyPageSearchFilter();
        // go to setup notifications and veify
        hamburgerMenuPageObj.goToNotification();
        // logout from application
        loginPageObjs.logout();    
    });

    it("Check Accounting Pages", () => {
        // login as unit admin
        loginPageObjs.loginAs(usernames.unitadminUN, creds.password);
        hamburgerMenuPageObj.goToAccounting();
        hamburgerMenuPageObj.goToCategoriesChildAcc();
        assertionPage.verifyAccountPageChildren();
        // go to PMIX mapping
        hamburgerMenuPageObj.goToPMIXMappingChildAcc();
        assertionPage.verifyAccountPageChildren();
        hamburgerMenuPageObj.goToBudgetSetupChildAcc();
        assertionPage.verifyPageSearchFilter();
        // logout from application
        loginPageObjs.logout();    
    });
});