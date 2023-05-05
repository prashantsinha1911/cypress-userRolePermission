import * as constants from "../integration/sanitySuite/sanity_Suite_spec";

class utilsMethod {
    makeid() {
        var result = '';
        var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    checkRestUnit(unitName, tenant) {
        cy.get('#unitMenu_dd').then($el => {
            // $el is a jQuery object
            console.log($el.text());
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
            } else {
                cy.get('#unitMenu_dd').click();
                cy.get(`#searchTenant`).type(tenant);
                cy.wait(3000);  // wait for server-side restaurant unit search to complete before clicking
                cy.get(`#unitname`).click();
                cy.wait(2000);
            }
        });
    }

    checkRestUnitWO(unitName) {
        cy.get('#unitMenu_dd').then($el => {
            // $el is a jQuery object
            console.log($el.text());
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
            } else {
                cy.get('#unitMenu_dd').click();
                cy.xpath(`//*[text()="${constants.createRestName}"]`).click();
                cy.wait(2000);
            }
        });
    }
}
module.exports = new utilsMethod();