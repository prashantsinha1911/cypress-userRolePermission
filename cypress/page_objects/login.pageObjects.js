const inviteUserPage = require("./inviteUser.page");

class loginPage {
    element = {
        marginedgeLogo: () => cy.xpath(`//*[@data-testid='navbar-logo']`),
        userNameInput: () => cy.get("#username"),
        passwordInput: () => cy.get("#password"),
        loginText: () => cy.xpath(`//label[text()='Login']`),
        forgetPasswordLink: () => cy.xpath(`//*[@href="#/forgot"]`),
        signInBtn: () => cy.get("#signInBtn"),
        logoutDD: () => cy.get(`#userNameDropdown`),
        clickLogout: () => cy.get(`#logoutBtn`),
        storeToggle: () => cy.get('#unitMenu_dd'),
        search: () => cy.get(`#searchTenant`),
        selectTenant: () => cy.wait(3000).get(`#unitname`),  // wait for server-side restaurant unit search to complete before clicking
        dashboardElement: () => cy.xpath(`//*[@ng-controller="PurchasingReportController"]`),
        budgetDashboardElem: () => cy.xpath(`//*[@ng-controller="BudgetOverviewController"]`),
        topPriceMoverDashboardElem: () => cy.xpath(`//*[@heading="Top Price Movers"]//div[@class="panel panel-primary"]`),
        salesDashboardElement: () => cy.xpath(`//panel[@class='ng-scope ng-isolate-scope']//div[@class='panel panel-green']`),
        settings: () => cy.xpath(`//*[@href='#/settings']`),
        passwordChange: () => cy.xpath(`//*[@data-testid='user-password']`),
        emailAddressInput: () => cy.xpath(`//input[@placeholder='Your e-mail']`),
        saveBtn: () => cy.xpath(`//button[normalize-space()='Save']`)
    };

    verifyHomePageForUser() {
        this.element.dashboardElement().should("be.visible");
        this.element.budgetDashboardElem().should("be.visible");
        this.element.topPriceMoverDashboardElem().should("be.visible");
    }

    verifyHomePage() {
        this.element.dashboardElement().should("be.visible");
        this.element.budgetDashboardElem().should("be.visible");
        this.element.topPriceMoverDashboardElem().should("be.visible");
        this.element.salesDashboardElement().should("be.visible");
    }

    verifyLoginPageElement() {
        this.element.userNameInput().should("be.visible");
        this.element.passwordInput().should("be.visible");
        this.element.loginText().should("be.visible");
        this.element.forgetPasswordLink().should("be.visible");
    }

    loginAs(username, password) {
        this.element.userNameInput().type(username);
        this.element.passwordInput().type(password);
        this.element.signInBtn().click();
        this.element.marginedgeLogo().should('be.visible');
        this.element.dashboardElement().should("be.visible");
    }

    logout() {
        cy.wait(1000);
        this.element.logoutDD().should('be.visible').click({ force: true });
        this.element.clickLogout().should('be.visible').click({ force: true });
        this.element.userNameInput().should('be.visible');
        this.element.marginedgeLogo().should('not.exist');
    }

    chooseTenant(tenant) {
        this.element.storeToggle().should('be.visible').click();
        this.element.search().type(tenant);
        this.element.selectTenant().click();
        cy.wait(2000);
    }

    checkPasswordChangeAndSettings() {
        this.element.logoutDD().should('be.visible').click({ force: true });
        this.element.passwordChange().should('be.visible');
        this.element.settings().should('be.visible');
    }

    loginAsNewUser(username, password) {
        this.element.userNameInput().should('be.visible').clear().type(username);
        this.element.passwordInput().type(password);
        this.element.signInBtn().should('not.be.disabled').click();
        inviteUserPage.accpetTerms();
        this.element.marginedgeLogo().should('be.visible');
        this.element.dashboardElement().should("be.visible");
    }

    setEmailAddressExistingUser() {
        cy.wait(1000);
        this.element.logoutDD().should('be.visible').click({ force: true });
        this.element.settings().should('be.visible').click();
        //this.element.emailAddressInput().should('be.visible').clear().type(`edge.testlab1@gmail.com`);
        this.element.saveBtn().should('be.visible').click();
    }
}
module.exports = new loginPage();