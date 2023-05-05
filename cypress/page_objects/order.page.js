const utilObj = require("../utils/util_generic");
const testData = require("../fixtures/rolePermission.json");
const vendorsPage = require("./vendors.page");
const loginPageObjects = require("./login.pageObjects");
const performancePage = require("./performance.page");
const assertionPage = require("./assertion.page");

class orderPage {
    element = {
        attachInvoiceBtn: () => cy.get('.mb10 > .btn-group > button[ng-model="dropOrders"]'),
        uploadInv: () => cy.get(`input[type="file"]`),
        clickOKBtn: () => cy.get(`button[ng-click="photoDirectiveOkCallback()"]`),
        clickItem: () => cy.xpath(`(//*[@class='ui-grid-row ng-scope'])[1]`),
        endPreProcessingBTN: () => cy.get(`[ng-click="endPreprocessing()"]`),
        okBtn: () => cy.get(`.btn.btn-primary.bootbox-accept`),
        clickVendor: () => cy.get(`span[aria-label="Select a vendor activate"]`),
        clickVendorRecon: () => cy.get(`div[ng-change="selectVendor()"]`),
        enterVendorName: () => cy.xpath(`//*[@aria-label="Select a vendor"]`),
        selectDDItem: () => cy.get(`.ui-select-choices-row.active`),
        input: () => cy.get(`input[name="quantity"]`),
        unitPrice: () => cy.get(`input[name="unitPrice"]`),
        okBtnLI: () => cy.get(`button[ng-click="updateTranslatedName(); unitQuantityChanged();"]`),
        selectRadio: () => cy.get(`input[ng-click="setNewItemPackaging(pack)"]`).first(),
        invoiceNumber: () => cy.get(`[name='invoiceNum']`),
        customerName: () => cy.get(`[ng-model="order.initialReviewCustomerNum"]`),
        invoiceDate: () => cy.get(`[ng-model="order.initialReviewInvoiceDate"]`),
        closedInvoiceDate: () => cy.xpath(`//*[@ng-required='reconciliationComplete || reconciliationCompleted']`),
        confirmDate: () => cy.xpath(`//*[@ng-click='close($event)']`),
        closeDateCal: () => cy.get(`button[ng-click="close($event)"]`),
        todayDate: () => cy.get(`[ng-click="select('today', $event)"]`),
        lastDate: () => cy.xpath(`(//span[text()='01'])[1]`),
        verifiedTotal: () => cy.get(`[ng-model="order.initialReviewTotal"]`),
        openDD: () => cy.get(`[ng-change="irHandwrittenMarkupChanged()"]`).select('No'),
        initialReviewCompleteCheck: () => cy.xpath(`(//*[@class='checkbox-inline icheck-label'])[1]`),
        initialReviewCompleteLabel: () => cy.xpath(`//span[normalize-space()='The initial review for this order is complete.']`),
        recCompleteLabel: () => cy.xpath(`//span[normalize-space()='The reconciliation for this order is complete.']`),
        amReviewCheck: () => cy.xpath(`(//*[@class="checkbox-inline icheck-label"])[3]`),
        FinalReviewCompleteCheck: () => cy.xpath(`(//*[@class='checkbox-inline icheck-label'])[2]`),
        IRSaveBtn: () => cy.get(`[ng-click="save($event)"]`),
        invoiceNumberRecon: () => cy.get(`[ng-model="order.invoiceNum"]`),
        customerNameRecon: () => cy.get(`[ng-model="order.customerNum"]`),
        invoiceDateRecon: () => cy.xpath(`(//*[@name="invoiceDate"])[2]`),
        openDDRecon: () => cy.get(`[ng-change="handwrittenMarkupChanged()"]`).select('No'),
        saveBtnRecon: () => cy.get(`[ng-click="reconcile($event)"]`),
        verifyBtn: () => cy.get(`[ng-click="verifyOrderAndClose()"]`),
        filterOption: () => cy.get(`[ng-model="filterValue"]`),
        clickLineItemBtn: () => cy.get(`[ng-click="addRow()"]`),
        addExistingLineItem: () => cy.get(`#searchFocus`),
        saveLineItem: () => cy.xpath(`(//*[@ng-click="addNewItem($event)"])[2]`),
        saveExistingLineItem: () => cy.xpath(`(//*[@ng-click="addNewItem($event)"])[1]`),
        newVendorItemRadio: () => cy.xpath(`(//*[@class='iradio_minimal-blue'])[1]`),
        itemCode: () => cy.get(`#provisionalProductCode`),
        vendorItem: () => cy.xpath(`(//*[@placeholder="Please enter a name for the Vendor Item"])[2]`),
        clickProductLI: () => cy.xpath(`(//*[@title="Select a product"])[2]`),
        typeProductName: () => cy.xpath(`(//*[@aria-label="Select a product"])[2]`),
        packagingTxt: () => cy.xpath(`(//*[@ng-model="newReconcileLineItem.unit.packaging"])[2]`),
        quanity: () => cy.xpath(`(//*[@ng-model="newReconcileLineItem.unit.quantity"])[2]`),
        unit: () => cy.xpath(`(//*[@ng-model="newReconcileLineItem.unit.unit"])[2]`),
        selectUnit: () => cy.contains("Bag"),
        price: () => cy.xpath(`(//*[@ng-model="newReconcileLineItem.unit.price"])[2]`),
        concernExpander: () => cy.xpath(`(//*[@ng-click="toggleConcerns($event, editForm.$invalid)"])[1]`),
        vendorItemVerified: () => cy.xpath(`//*[@id="vendorItemVerified"]//*[@class="icheckbox_minimal-blue"]`),
        vendorItemRadio: () => cy.xpath(`(//*[@class='radio']//*[@class='icheck-label'])[2]`),
        vendorInfoRadio: () => cy.xpath(`//*[@id="vendorItemVerified"]//*[@class="icheckbox_minimal-blue"]`),
        viewAllOrder: () => cy.get('.ui-grid-viewport.ng-isolate-scope'),
        openDDForOrderStatus: () => cy.get(`#appendToEl`),
        selectFinalReviewDD: () => cy.xpath(`//*[@ng-click="changeViewBy($event, 'FINAL_REVIEW')"]`),
        selectVendor: () => cy.xpath(`//*[@ng-change="selectVendor()"]`),
        selectVendorDD: () => cy.xpath(`//*[text()='Arrow']`),
        selectVendorJFCDD: () => cy.xpath(`//*[text()='JFC']`),
        addQuantity: () => cy.xpath(`(//*[@name="li.quantity"])[1]`),
        addQuantitys: () => cy.xpath(`(//*[@name="li.quantity"])[2]`),
        saveBtnPlaceOrder: () => cy.xpath(`//*[@ng-click="saveAndSend($event)"]`),
        saveConfirm: () => cy.xpath(`//*[@ng-click="doSaveAndSend($event)"]`),
        statusSent: () => cy.xpath(`//*[@ng-click="changeViewBy($event, 'SENT')"]`),
        statusSaved: () => cy.get(`[ng-click="changeViewBy($event, 'SAVED')"]`),
        approveInvoiceItem: () => cy.xpath(`//*[@href="#/invoiceApproval"]//*[@role='button']`),
        deleteOrder: () => cy.get(`[ng-click="delete()"]`),
        deleteConfirm: () => cy.get(`[data-testid="orderPages-deleteOrderConfirmationModal-deleteButton"]`),
        saveOrderBtn: () => cy.get(`#saveOrder`),
        statusClosed: () => cy.get(`[ng-click="changeViewBy($event, 'CLOSED')"]`),
        noAccessToSetupTransfer: () => cy.xpath(`//p[text()='Invoices do not require approval.']`),
        addQuantityPlaceOrder: () => cy.xpath(`(//*[@ng-model="li.quantity"])[1]`),
        sendBtn: () => cy.get(`[ng-click="saveAndSend($event)"]`),
        confirmSend: () => cy.get(`[ng-click="doSaveAndSend($event)"]`),
        skipInv: () => cy.get(`[ng-click="skip($event)"]`),
        askQues: () => cy.get(`[ng-click="addQuestion()"]`),
        addConcern: () => cy.get('.form-horizontal > :nth-child(2) > .form-control'),
        askQuestion: () => cy.xpath(`//*[@aria-label='Select a question type activate']`),
        askQuesMissingInvoice: () => cy.xpath(`//*[contains(text(),'Missing Invoice Page')]`),
        saveAndSkip: () => cy.get(`[ng-click="addNewQuestion($event)"]`),
        assignToLDD: () => cy.xpath(`(//*[@ng-model="c.assignedTo"])[2]`).select('Restaurant Admin'),
        concernAssignedToUnitAdmin: () => cy.xpath(`//*[@ng-model='c.assignedTo']`).select('Restaurant Admin'),
        deleteAndSendEmail: () => cy.xpath(`//*[contains(@ng-hide,'reconciliationCompleted || !accountManager && !admin || !hasSendEmailActiveConcern(c)')]`),
        confirmDeleteAndSendEmailTxt: () => cy.xpath(`//*[@class='bootbox-body'][contains(text(),'Confirm that you would like to update status to Sent and send an email notification concerning this order.')]`),
        confirmDeleteAndSendEmail: () => cy.xpath(`//*[@class='btn btn-primary bootbox-accept']`),
        sendEmailBtn: () => cy.xpath(`//button[contains(text(),'OK')]`),
        addPhoto: () => cy.get(`a[ng-model="files"]`),
        addPhotoRec: () => cy.xpath(`//a[@class='btn btn-success btn-xs ng-pristine ng-untouched ng-valid ng-isolate-scope ng-empty'][@accept='image/*']`),
        saveInv: () => cy.xpath(`//*[text()='Save']`),
        changePrice: () => cy.xpath(`(//*[@class="ui-grid-cell-contents ng-binding ng-scope"])[6]`),
        changeQuant: () => cy.xpath(`(//*[@class="ui-grid-cell-contents ng-binding ng-scope"])[7]`),
        addNewPrice: () => cy.get(`input[ng-model="row.entity['unitPrice']"]`),
        addNewQuant: () => cy.get(`input[ng-model="row.entity['quantity']"]`),
        clickReassign: () => cy.xpath(`(//div[@title="Select a role"])[2]`),
        addReassign: () => cy.xpath(`(//*[@aria-label="Select a role"])[2]`),
        clickItemDD: () => cy.get(`.ui-select-choices-row-inner`),
        saveReassignBTN: () => cy.get(`button[ng-click="saveQuestionModal($event)"]`),
        addCreditRecon: () => cy.get(`input[name="credit"]`),
        deleteOrderTextField: () => cy.xpath(`(//*[@ng-model='order.statusNote'][@autocomplete='off'])[1]`),
        selectInitialReviewDD: () => cy.xpath(`//*[@ng-click="changeViewBy($event, 'INITIAL_REVIEW')"]`),
        selectInReconciliationDD: () => cy.xpath(`//*[@ng-click="changeViewBy($event, 'PENDING_RECONCILIATION')"]`),
        selectAMReviewDD: () => cy.xpath(`//*[@ng-click="changeViewBy($event, 'AM_REVIEW')"]`),
        selectNeedsAttentionDD: () => cy.xpath(`//*[@ng-click="changeViewBy($event, 'NEEDS_ATTENTION')"]`),
        questionsAMReview: () => cy.xpath(`//*[@translate='inviosoApp.order.concerns.title']`),
        verifyVIitemCheckbox: () => cy.xpath(`//*[@id="vendorItemVerified"]//*[@class="icheckbox_minimal-blue"]`),
        AMReviewCompleteCheckBox: () => cy.xpath(`//*[@translate='inviosoApp.order.reconcile.closedLabel']`),
        reasonToDeleteCheckbox: () => cy.xpath(`(//*[@ng-repeat='r in orderDeleteReason'])[1]`),
        selectRetiredOrderDD: () => cy.xpath(`//*[@ng-class="{'selected': viewBy === 'RETIRED'}"]`),
        undeleteBtn: () => cy.xpath(`//*[@ng-click='undelete()']`),
        undeleteTextField: () => cy.xpath(`//*[@class='bootbox-input bootbox-input-text form-control'][@autocomplete='off']`),
        undeleteConfirmBtn: () => cy.xpath(`//*[@class='btn btn-primary bootbox-accept']`),
        inboxBtn: () => cy.xpath(`//*[@translate='inviosoApp.order.emailQueue.title']`),
        deleteConfirmClosedOrder: () => cy.xpath(`//*[@id='deleteOrderConfirmation']//*[@class='btn btn-danger'][@type='submit']`),
        cancelDeleteConfirmClosedOrder: () => cy.xpath(`//*[@name='deleteForm']//*[@class='modal-footer']//*[@type='button']`),
        checkDeleteConfirmText: () => cy.xpath(`//*[@class='alert alert-info']//*[contains(text(),'Before you delete this invoice please attempt to input the invoice date, invoice number, or vendor name.')]`),
        missingProdTxt: () => cy.xpath(`//span[text()='One or more Products on this order are missing categories.']`),
        moreOptionsDropupBtn: () => cy.get(`[data-testid="orderMoreOptionsButton"]`),
        reOpenOrderBtn: () => cy.xpath(`//*[@ng-click='reopen()']`),
        reasonToreOpenOrder: () => cy.xpath(`(//*[@name='reason'][@type='text'])[1]`),
        reOpenConfirmBtn: () => cy.xpath(`//*[@type='submit']//*[@translate='entity.action.reopen']`),
        reOpenedOrderCompleteCheck: () => cy.get(`span[translate='inviosoApp.order.finalReview.closedLabel']`),
        verifyBtnRecon: () => cy.get(`button[ng-click="verify($event)"]`),
        sortList: () => cy.xpath(`(//div[@ng-keydown="handleKeyDown($event)"])[8]`),
        reconCredit: () => cy.xpath(`(//div[@class="ui-grid-cell-contents ng-binding ng-scope"])[6]`),
        enterCredit: () => cy.get(`input[ng-model="row.entity['unitPrice']"]`),
        orderPageBtnsHolder: () => cy.xpath(`//*[@class='well well-sm']`),
        addInvoiceDD: () => cy.xpath(`//*[@class='dropdown']//*[@class='btn btn-md btn-primary dropdown-toggle']`),
        missingInvoiceNumberText: () => cy.xpath(`//*[@class='btn btn-primary bootbox-accept'][contains(text(),'OK')]`),
        exportAsDD: () => cy.get(`#orderExportDD`),
        concernResolved: () => cy.xpath(`//div[@ng-switch-when='MISSING_INVOICE_PAGE']//div[@class='icheckbox_minimal-blue']`),
        exportCSV: () => cy.xpath(`//*[@ng-click="exportGrid($event, 'csv')"]`),
        clickOKBtnOnVerify: () => cy.get(`button[ng-hide="verifyingForClose"]`),
        warningInvoiceDate: () => cy.xpath(`//*[@ng-show='!order.initialReviewInvoiceDate && initialReviewComplete']`),
        warningInvoiceDateRec: () => cy.xpath(`//*[@ng-show='!order.invoiceDate && reconciliationComplete']`),
        warningVerifiedTotal: () => cy.xpath(`//div[@ng-show='!_.isFinite(order.initialReviewTotal) && initialReviewComplete']`),
        warningVendorRequired: () => cy.xpath(`//div[@ng-show='!order.vendor && initialReviewComplete']`),
        warningHandWritten: () => cy.xpath(`//*[@ng-show='order.initialReviewHandwrittenMarkup === undefined && initialReviewComplete']`),
        warningHandWrittenRec: () => cy.xpath(`//*[@ng-show='order.handwrittenMarkup === undefined && reconciliationComplete']`),
        orderStatusNew: () => cy.xpath(`(//*[@name='status'])[3]`),
        orderStatusSaved: () => cy.xpath(`(//*[@name='status'])[1]`),
        orderStatusSent: () => cy.xpath(`(//*[@name='status'])[2]`),
        uploadDate: () => cy.get(`[name='actionableDate']`),
        previewBtn: () => cy.get(`[ng-click='preview($event)']`),
        vendorList: () => cy.get(`[role='listbox']`),
        vendorNote: () => cy.get(`[name='vendorNotes']`),
        previewConfirmationBtn: () => cy.get(`button[ng-show='isPreview']`),
        orderPrice: () => cy.get(`.form-control-static.ng-binding`),
        previwPrice: () => cy.xpath(`//*[@class='alert alert-info']//*[@class='ng-binding']`),
        resendWarnTextField: () => cy.get(`[class='alert alert-warning']`),
        selectPreprocessingDD: () => cy.get(`[ng-click="changeViewBy($event, 'PREPROCESSING')"]`),
        uploadedStatusText: () => cy.get(`label[class='ng-scope ng-binding']`),
        vendorItemsText: () => cy.get(`.ng-scope.section-2`),
        selectPackaging: () => cy.xpath(`(//select[@name='packaging'])[1]`),
        priceText: () => cy.xpath(`(//td[@class='ng-binding'])[1]`),
        recipientField: () => cy.get(`#recipient`),
        addressLine1Field: () => cy.get(`#address1`),
        cityField: () => cy.get(`#city`),
        stateField: () => cy.get(`#state`),
        zipCodeField: () => cy.get(`#zip`),
        mobileField: () => cy.get(`#phone`),
        warningHandWrittenRec: () => cy.xpath(`//*[@ng-show='order.handwrittenMarkup === undefined && reconciliationComplete']`),
        differentVendorWarning: () =>cy.xpath(`//div[contains(text(),'The vendor you selected is different than the vend')]`),
        differentVendorWarningOkBtn: () =>cy.xpath(`//div[@role='dialog']//div[@class='modal-dialog']//button[@type='button'][normalize-space()='OK']`),
        skipInvoiceWarning: () =>cy.xpath(`//div[@class='bootbox-body'][contains(text(),'Please do not skip invoices without asking a question first. If there is a reason you need to skip this invoice please ask a question so there is a log of why this invoice could not be processed.')]`),
        activeConcernWarning: () =>cy.xpath(`//*[@ng-show='hasActiveConcern()']`),
        resolveConcern: () => cy.xpath(`//label[normalize-space()='Concern Resolved']`),
        finalReviewStatusTitle: () => cy.get(`span[translate='inviosoApp.order.finalReview.label']`),
        deletePhotoOrderBtn: () => cy.xpath(`//button[contains(.,'Delete Photo')]`),
        deletePhotoOrderFile: () => cy.xpath(`//*[@ng-click='deletePhoto(i)']`),
        okButton: () => cy.xpath(`//button[@class='btn btn-primary bootbox-accept']`),
        deleteForm: () => cy.get(`[name='deleteForm']`),
        addressForm: () => cy.get(`[name='editForm']`),
        unitReporterDatePicker: () => cy.get(`#unitReportDatePicker`),
        warningHandWrittenRec: () => cy.xpath(`//*[@ng-show='order.handwrittenMarkup === undefined && reconciliationComplete']`),
        differentVendorWarning: () =>cy.xpath(`//div[contains(text(),'The vendor you selected is different than the vend')]`),
        differentVendorWarningOkBtn: () =>cy.xpath(`//div[@role='dialog']//div[@class='modal-dialog']//button[@type='button'][normalize-space()='OK']`),
        skipInvoiceWarning: () =>cy.xpath(`//div[@class='bootbox-body'][contains(text(),'Please do not skip invoices without asking a question first. If there is a reason you need to skip this invoice please ask a question so there is a log of why this invoice could not be processed.')]`),
        okBtnPhotoDel:() =>cy.xpath(`//button[contains(text(),'OK')]`),
        closeBtn:() =>cy.xpath(`//button[@class='bootbox-close-button close']`),
        selectPreprocessingStatus: () => cy.get(`[ng-click="changeViewBy($event, 'PREPROCESSING')"]`),
        noPhoneCheckbox: () => cy.get(`#noPhonePresent`),
        noInfoCheckBox: () => cy.get(`#noInfoPresent`),
        onHandInpurFields: () => cy.xpath(`(//*[@name='onHand'])[1]`),
        orderGrid: () => cy.get(`.grid`),
        moveOrderOp: () => cy.get(`[ng-click='moveOrder()']`),
        historyOp: () => cy.get(`[ng-click='history()']`),
        moveOrderTenantDD: () => cy.get(`[ng-model='order.moveOrderTo']`),
        moveInvBtn: () => cy.get(`#moveInvBtn`),
        statusNoteText: () => cy.get(`#statusNote`),
        closeAuditTrail: () => cy.get(`#closeAuditTrail`),
        selectPendingApproval: () => cy.get(`[ng-click="changeViewBy($event, 'PENDING_APPROVAL')"]`),
        approveInvoiceBtn: () => cy.get(`#approveInvoiceBtn`),
        invoiceAppovalOff: () => cy.get(`#invApprovalOff`),
        invoiceAppovalAll: () => cy.get(`#invApprovalAll`),
        invoiceApprovalSaveBtn: () => cy.get(`#invoiceApprovalSaveBtn`),
        invoiceApprovalSetupBtn: () => cy.get(`#invoiceApprovalSetupBtn`),
        moveToPendingApproval: () => cy.get(`[ng-click='handleReopenForApproval()']`),
        printOrderGuideBtn: () => cy.get(`[ng-click='printOrderGuide($event)']`),
        lastCountData: () => cy.get(`#lastCount`).first(),
        lastCountDateData: () => cy.get(`#lastCountDate`).first(),
        accountManagerReviewStatusTitle: () => cy.get(`span[translate='inviosoApp.order.accountManagerReview.label']`)
    };

    assignToLeadAnalyst() {
        cy.wait(2000);
        this.element.clickReassign().click();
        this.element.addReassign().type("Lead Analyst");
        this.element.clickItemDD().click();
        this.element.saveReassignBTN().click();
        cy.wait(3000);
    }

    assignToManagingAnalyst() {
        cy.wait(2000);
        this.element.clickReassign().click();
        this.element.addReassign().type("Managing");
        this.element.clickItemDD().click();
        this.element.saveReassignBTN().click();
        cy.wait(3000);
    }

    assignToUnitAdmin() {
        this.element.concernExpander().click();
        cy.wait(2000);
        this.element.concernAssignedToUnitAdmin();
        this.element.concernExpander().click();
        this.element.IRSaveBtn().click();
    }

    askQuestion() {
        cy.wait(3000);
        this.element.askQues().click();
        this.element.addConcern().click();
        this.element.addConcern().type("HELLO TEST");
        this.element.saveAndSkip().click();
        this.element.IRSaveBtn().click();
        cy.wait(2000);
        this.element.okBtn().click();
    }

    askQuestionInitialReview() {
        cy.wait(3000);
        this.element.askQues().click();
        this.element.addConcern().click();
        this.element.addConcern().type("HELLO TEST");
        this.element.saveAndSkip().click();
        this.element.IRSaveBtn().click();
        cy.wait(4000);
    }

    askQuestionMissingInvoice() {
        cy.wait(3000);
        this.element.askQues().click();
        cy.wait(3000);
        this.element.askQuestion().click();
        this.element.askQuesMissingInvoice().click();
        this.element.saveAndSkip().click();
        this.element.IRSaveBtn().click();
    }

    verifySendEmailBtn() {
        this.element.concernExpander().click();
        cy.wait(2000);
        this.element.deleteAndSendEmail().should('be.visible').click();
        this.element.confirmDeleteAndSendEmailTxt().should('be.visible');
        cy.wait(2000);
        this.element.sendEmailBtn().should('be.visible').click({ multiple: true, force: true });
    }

    verifySendEmailBtn2() {
        this.element.concernExpander().click();
        cy.wait(2000);
        this.element.deleteAndSendEmail().should('be.visible').click();
        this.element.confirmDeleteAndSendEmailTxt2().should('be.visible');
        cy.wait(3000);
        this.element.confirmDeleteAndSendEmail().should('be.visible').click({ multiple: true, force: true });
    }

    resolveConcern() {
        this.element.concernExpander().click();
        cy.wait(2000);
        this.element.concernResolved().should('be.visible').click();
        this.element.IRSaveBtn().click();
        cy.wait(4000);
    }

    checkDeletAndSendEmailBtn() {
        this.element.concernExpander().click();
        cy.wait(2000);
        this.element.deleteAndSendEmail().should('not.be.visible');
    }

    assignToRestaurantAdmin() {
        this.element.concernExpander().click();
        cy.wait(2000);
        this.element.assignToLDD();
        this.element.saveBtnRecon().click();
    }

    closeOrder() {
        this.element.concernExpander().click();
        cy.wait(3000);
        this.element.vendorItemVerified().click({
            force: true
        }, {
            multiple: true
        });
        this.element.initialReviewCompleteCheck().click();
        this.element.saveBtnRecon().click();
        this.element.verifyBtn().click();
        cy.wait(3000);
    }

    closeOrderAfterApprovingInvoice() {
        this.element.concernExpander().click();
        this.element.vendorItemRadio().click();
        this.element.vendorInfoRadio().click();
        this.element.amReviewCheck().click();
        this.element.saveBtnRecon().click();
        this.element.verifyBtn().click();
        cy.wait(3000);
    }

    closeOrderAfterApprovingInvoice_Sec() {
        this.element.concernExpander().click();
        cy.wait(3000);
        this.element.vendorInfoRadio().click({
            force: true
        }, {
            multiple: true
        });
        this.element.amReviewCheck().click();
        this.element.saveBtnRecon().click();
        this.element.verifyBtn().click();
        cy.wait(3000);
    }

    finalReviewProcess(itemCodeStr, vIName, prodName) {
        cy.wait(6000);
        this.element.finalReviewStatusTitle().should('contain.text', 'Final Review');
        this.element.clickLineItemBtn().should('be.visible').click({
            force: true
        });
        this.element.newVendorItemRadio().should('be.visible').click();
        this.element.itemCode().type(itemCodeStr);
        this.element.vendorItem().type(vIName);
        this.element.clickProductLI().click();
        this.element.typeProductName().type(prodName);
        this.element.selectDDItem().click();
        this.element.packagingTxt().type("Pack");
        this.element.quanity().type("10");
        this.element.unit().click();
        this.element.selectUnit().click();
        this.element.price().type("8");
        this.element.saveLineItem().should('not.be.disabled').click();
        cy.wait(3000);
        this.element.FinalReviewCompleteCheck().click();
        this.element.saveBtnRecon().should('not.be.disabled').click();
        this.element.verifyBtn().should('be.visible').click();
        cy.wait(2000);
        this.element.openDDForOrderStatus().should('be.visible');
        this.element.orderGrid().should('be.visible');
    }

    finalReviewProcessVerification(itemCodeStr, vIName, prodName) {
        cy.wait(6000);
        this.element.clickLineItemBtn().click({
            force: true
        });
        this.element.newVendorItemRadio().click();
        this.element.itemCode().type(itemCodeStr);
        this.element.vendorItem().type(vIName);
        this.element.clickProductLI().click();
        this.element.typeProductName().type(prodName);
        this.element.selectDDItem().click();
        this.element.packagingTxt().type("Pack");
        this.element.quanity().type("10");
        this.element.unit().click();
        this.element.selectUnit().click();
        this.element.price().type("1000000");
        this.element.saveLineItem().should('be.disabled');
        this.element.price().clear();
        this.element.price().type("8");
        this.element.saveLineItem().click();
        cy.wait(3000);
        //this.element.FinalReviewCompleteCheck().click();
        this.element.saveBtnRecon().click();
        //this.element.verifyBtn().click();
    }

    finalReviewProcessRestAdmin(itemCodeStr, vIName, prodName) {
        cy.wait(3000);
        this.element.finalReviewStatusTitle().should('contain.text', 'Final Review');
        this.element.clickLineItemBtn().click({
            force: true
        });
        this.element.newVendorItemRadio().click();
        this.element.itemCode().type(itemCodeStr);
        this.element.vendorItem().type(vIName);
        this.element.clickProductLI().click();
        this.element.typeProductName().type(prodName);
        this.element.selectDDItem().click();
        this.element.packagingTxt().type("Pack");
        this.element.quanity().type("10");
        this.element.unit().click();
        this.element.selectUnit().click();
        this.element.price().type("7");
        this.element.saveLineItem().click();
        cy.wait(3000);
        this.element.saveBtnRecon().click();
        this.element.openDDForOrderStatus().should('be.visible');
        this.element.orderGrid().should('be.visible');
    }

    cancelPreProcessing() {
        cy.wait(2000);
        this.element.clickItem().should('be.visible').click();
        this.element.endPreProcessingBTN().should('be.visible').click();
        this.element.okBtn().should('be.visible').click();
        this.element.openDDForOrderStatus().should('be.visible');
        this.element.orderGrid().should('be.visible');
    }

    cancelPreProcessingForAdmin() {
        cy.wait(2000);
        this.element.endPreProcessingBTN().should('be.visible').click();
        this.element.okBtn().should('be.visible').click();
        this.element.openDDForOrderStatus().should('be.visible');
        this.element.orderGrid().should('be.visible');
    }

    attachInvoice() {
        this.element.openDDForOrderStatus().should('be.visible');
        cy.wait(2000);
        this.element.orderPageBtnsHolder().should('be.visible').then($el => {
            console.log($el.text());
            if ($el.text().includes("Add Invoice")) {
                this.element.addInvoiceDD().should('be.visible').click();
            }
        });
        const fileName = "image.jpg";
        this.element.uploadInv().attachFile(fileName);
        cy.wait(10000);
        this.element.clickOKBtn().should('not.be.disabled').click();
        cy.wait(2000);
    }

    attachPhoto() {
        const fileName = "image.jpg";
        this.element.addPhoto().click();
        this.element.uploadInv().attachFile(fileName);
        cy.wait(10000);
        this.element.clickOKBtn().should('not.be.disabled').click();
        this.element.saveInv().click();
    }

    attachPhotoRec() {
        const fileName = "image.jpg";
        this.element.addPhotoRec().click();
        this.element.uploadInv().attachFile(fileName);
        cy.wait(10000);
        this.element.clickOKBtn().should('not.be.disabled').click();
    }

    closeOrderWithRules() {
        this.element.finalReviewStatusTitle().should('include.text', 'Final Review');
        cy.wait(3000);
        this.element.initialReviewCompleteCheck().should('be.visible').click();
        this.element.saveBtnRecon().should('not.be.disabled').click();
        this.element.verifyBtn().should('be.visible').click();
        cy.wait(3000);
    }

    searchOrder(orderName) {
        this.element.filterOption().should('be.visible').clear().type(orderName);
        cy.wait(2000);
        this.element.sortList().click();
        cy.wait(2000);
        this.element.clickItem().should('be.visible').click();
    }

    searchOrderWithoutsorting(orderName) {
        this.element.filterOption().should('be.visible').clear();
        cy.wait(2000);
        this.element.clickItem().click();
    }

    searchOrderFR() {
        cy.wait(5000);
        this.element.clickItem().should('be.visible').click();
    }

    viewOrder() {
        this.element.viewAllOrder().should("exist");
    }

    checkForEdit() {
        this.element.openDDForOrderStatus().click();
        this.element.selectFinalReviewDD().click();
        cy.wait(2000);
        this.element.clickItem().click();
    }

    placeOrder() {
        this.element.clickVendor().should('be.visible').click();
        this.element.selectVendorDD().click();
        this.element.addQuantity().should('be.visible').clear().type("8");
        this.element.saveBtnPlaceOrder().should('not.be.disabled').click();
        this.element.saveConfirm().should('be.visible').click();
        this.element.openDDForOrderStatus().should('be.visible');
        cy.reload();
        this.element.orderGrid().should('be.visible');
        cy.wait(2000);
    }

    saveOrder() {
        this.element.clickVendor().should('be.visible').click();
        this.element.selectVendorDD().should('be.visible').click();
        this.element.addQuantity().should('be.visible').clear().type("8");
        this.element.saveOrderBtn().should('not.be.disabled').click();
        this.element.openDDForOrderStatus().should('be.visible');
        this.element.orderGrid().should('be.visible');
        cy.wait(2000);
    }

    changeStatusToSent() {
        cy.wait(1000);
        this.element.openDDForOrderStatus().should('be.visible').click();
        this.element.statusSent().should('be.visible').click();
    }

    changeStatusToSaved() {
        this.element.openDDForOrderStatus().should('be.visible').click();
        this.element.statusSaved().should('be.visible').click();
    }

    changeStatusToClosed() {
        this.element.openDDForOrderStatus().should('be.visible').click();
        this.element.statusClosed().scrollIntoView().should('be.visible').click();
    }

    checkApproveInvoiceTab() {
        this.element.approveInvoiceItem().should('not.exist');
    }

    resendOrder() {
        cy.wait(3000);
        this.element.clickItem().should('be.visible').click();
        this.element.orderStatusSent().should('have.value', "Sent");
        this.element.addPhoto().should('be.visible');
        this.element.addQuantitys().should('be.visible').clear().type("10");
        this.element.saveBtnPlaceOrder().click();
        this.checkPriceConfirmation();
        this.element.resendWarnTextField().should('contain.text', 'contacting the vendor by phone to confirm.')
        this.element.saveConfirm().click();
        this.element.openDDForOrderStatus().should('be.visible');
        cy.reload();
        cy.wait(2000);
        this.element.orderGrid().should('be.visible');
        // changing status to sent again as its not updating automatically
        this.changeStatusToSent();
    }

    deleteOrderCheck() {
        cy.wait(2000);
        this.element.clickItem().click();
        this.element.deleteOrder().should('not.be.visible');
    }

    deleteOrderInv() {
        cy.wait(2000);
        this.element.clickItem().should('be.visible').click();
        cy.wait(1000);
        this.element.deleteOrder().should('be.visible').click();
        cy.wait(1000);
        this.element.deleteForm().should('be.visible').then($body => {
            //console.log($body.text());
            if ($body.text().includes(`please include the user's full name`)) {
                this.element.deleteOrderTextField().should('be.visible').clear().type('For Testing');
            }
        })
        this.element.deleteConfirm().should('not.be.disabled').click();
        this.element.openDDForOrderStatus().should('be.visible');
        cy.wait(2000);
        this.element.orderGrid().should('be.visible');
    }

    checkInitailTransfer() {
        this.element.noAccessToSetupTransfer().should('be.visible');
    }

    placeNewOrder(vendor) {
        cy.wait(1000);
        this.element.clickVendor().should('be.visible').click();
        cy.wait(1000);
        this.element.enterVendorName().type(vendor);
        cy.wait(1000);
        this.element.selectDDItem().click();
        cy.wait(1000);
        this.element.addQuantityPlaceOrder().type("8");
        this.element.vendorNote().should('be.visible').clear().type("Send Dummy Vendor Note");
        this.element.sendBtn().click();
        this.checkPriceConfirmation();
        cy.wait(2000);
        this.element.confirmSend().click();
        this.element.openDDForOrderStatus().should('be.visible');
        cy.reload();
        this.element.orderGrid().should('be.visible');
        cy.wait(2000);
    }

    irProcessWithTenantCheck(unitName, invoiceNumberStr, customerNameStr) {
        loginPageObjects.element.storeToggle().should('be.visible').then($el => {
            // $el is a jQuery object
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
                cy.wait(3000);
                this.element.clickVendor().should('be.visible').click();
                this.element.selectDDItem().should('be.visible').click({
                    multiple: true
                });
                this.element.invoiceNumber().type(invoiceNumberStr);
                this.element.invoiceDate().click();
                this.element.todayDate().click();
                cy.wait(1000);
                //condition to check no address
                this.element.addressForm().then(($body) => {
                    if ($body.text().includes('No address is provided')) {
                        cy.get(`#noInfoPresent`).click();
                        cy.get(`#noPhonePresent`).click();
                    }
                });
                this.element.verifiedTotal().type("19");
                this.element.openDD();
                this.element.initialReviewCompleteCheck().click();
                this.element.IRSaveBtn().should('not.be.disabled').click();
                cy.wait(3000);
            } else {
                cy.wait(1500);
                this.element.askQues().click();
                cy.wait(2000);
                this.element.addConcern().click();
                this.element.addConcern().type("Skipping due to tennat mismatch");
                this.element.saveAndSkip().click();
                cy.wait(5000);
                this.irProcessWithTenantCheck(unitName, invoiceNumberStr, customerNameStr);
            }
        });
    }

    irProcessWithTenantCheckAndJFC(unitName, invoiceNumberStr, customerNameStr) {
        cy.get('#unitMenu_dd').then($el => {
            // $el is a jQuery object
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
                cy.wait(3000);
                this.element.clickVendor().click();
                this.element.selectVendorJFCDD().should('be.visible').click({
                    multiple: true
                });
                this.element.invoiceNumber().type(invoiceNumberStr);
                this.element.invoiceDate().click();
                this.element.todayDate().click();
                cy.wait(1000);
                //condition to check no address
                cy.xpath(`//*[@name='editForm']`).then(($body) => {
                    if ($body.text().includes('No address is provided')) {
                        cy.get(`#noInfoPresent`).click();
                        cy.get(`#noPhonePresent`).click();
                    }
                });
                this.element.verifiedTotal().type("19");
                this.element.openDD();
                this.element.initialReviewCompleteCheck().click();
                this.element.IRSaveBtn().click();
                cy.wait(3000);
            } else {
                cy.wait(1500);
                this.element.askQues().click();
                cy.wait(2000);
                this.element.addConcern().click();
                this.element.addConcern().type("Skipping due to tennat mismatch");
                this.element.saveAndSkip().click();
                cy.wait(5000);
                this.irProcessWithTenantCheck(unitName, invoiceNumberStr, customerNameStr);
            }
        });
    }

    irProcessWithTenantCheckJFC(unitName, invoiceNumberStr, customerNameStr) {
        cy.get('#unitMenu_dd').then($el => {
            // $el is a jQuery object
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
                cy.wait(3000);
                this.element.invoiceNumber().type(invoiceNumberStr);
                this.element.invoiceDate().click();
                this.element.todayDate().click();
                cy.wait(1000);
                //condition to check no address
                cy.xpath(`//*[@name='editForm']`).then(($body) => {
                    if ($body.text().includes('No address is provided')) {
                        cy.get(`#noInfoPresent`).click();
                        cy.get(`#noPhonePresent`).click();
                    }
                });
                this.element.verifiedTotal().type("19");
                this.element.openDD();
                this.element.initialReviewCompleteCheck().click();
                this.element.IRSaveBtn().click();
                cy.wait(3000);
            } else {
                cy.wait(1500);
                this.element.askQues().click();
                cy.wait(2000);
                this.element.addConcern().click();
                this.element.addConcern().type("Skipping due to tennat mismatch");
                this.element.saveAndSkip().click();
                cy.wait(5000);
                this.irProcessWithTenantCheck(unitName, invoiceNumberStr, customerNameStr);
            }
        });
    }

    irProcessWithTenantCheckJFC(unitName, invoiceNumberStr, customerNameStr) {
        cy.get('#unitMenu_dd').then($el => {
            // $el is a jQuery object
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
                cy.wait(3000);
                this.element.invoiceNumber().type(invoiceNumberStr);
                this.element.invoiceDate().click();
                this.element.todayDate().click();
                cy.wait(1000);
                //condition to check no address
                cy.xpath(`//*[@name='editForm']`).then(($body) => {
                    if ($body.text().includes('No address is provided')) {
                        cy.get(`#noInfoPresent`).click();
                        cy.get(`#noPhonePresent`).click();
                    }
                });
                this.element.verifiedTotal().type("19");
                this.element.openDD();
                this.element.initialReviewCompleteCheck().click();
                this.element.IRSaveBtn().click();
                cy.wait(3000);
            } else {
                cy.wait(1500);
                this.element.askQues().click();
                cy.wait(2000);
                this.element.addConcern().click();
                this.element.addConcern().type("Skipping due to tennat mismatch");
                this.element.saveAndSkip().click();
                cy.wait(5000);
                this.irProcessWithTenantCheck(unitName, invoiceNumberStr, customerNameStr);
            }
        });
    }

    iROnlyInvoiceNumber(newInvoiceNum) {
        this.element.invoiceNumber().type(newInvoiceNum);
    }

    ReconcialltionProcessWithTenantCheck(unitName, invoiceNumberStr, customerNameStr) {
        loginPageObjects.element.storeToggle().should('be.visible').then($el => {
            // $el is a jQuery object
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
                cy.wait(3000);
                cy.wait(3000);
                this.element.clickVendor().should('be.visible').click();
                this.element.selectDDItem().click({
                    multiple: true
                });
                this.element.invoiceNumberRecon().type(invoiceNumberStr);
                this.element.invoiceDateRecon().click();
                this.element.todayDate().click();
                cy.wait(1000);
                //condition to check no address
                this.element.addressForm().then(($body) => {
                    if ($body.text().includes('No address is provided')) {
                        cy.get(`#noInfoPresent`).click();
                        cy.get(`#noPhonePresent`).click();
                    }
                });
                this.element.openDDRecon();
                this.element.initialReviewCompleteCheck().click();
                // verify disabled delete button for Analyst2 along the process
                loginPageObjects.element.logoutDD().should('be.visible').then($el => {
                    if ($el.text().includes("Second Analyst")) {
                        this.checkDeleteBtn();
                    }
                });
                this.element.saveBtnRecon().should('not.be.disabled').click();
                cy.wait(3000);
                this.element.verifyBtn().should('be.visible').click();
                cy.wait(3000);
            } else {
                cy.wait(5000);
                this.element.askQues().click();
                this.element.addConcern().click();
                this.element.addConcern().type("Skipping due to tennat mismatch");
                this.element.saveAndSkip().click();
                cy.wait(5000);
                this.irProcessWithTenantCheck(unitName, invoiceNumberStr, customerNameStr);
            }
        });
    }

    ReconcialltionProcessWithTenantCheckAndJFC(unitName, invoiceNumberStr, customerNameStr) {
        cy.get('#unitMenu_dd').then($el => {
            // $el is a jQuery object
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
                cy.wait(3000);
                cy.wait(3000);
                this.element.clickVendor().click();
                this.element.selectVendorJFCDD().click({
                    multiple: true
                });
                this.element.invoiceNumberRecon().type(invoiceNumberStr);
                this.element.invoiceDateRecon().click();
                this.element.todayDate().click();
                cy.wait(1000);
                //condition to check no address
                cy.xpath(`//*[@name='editForm']`).then(($body) => {
                    if ($body.text().includes('No address is provided')) {
                        cy.get(`#noInfoPresent`).click();
                        cy.get(`#noPhonePresent`).click();
                    }
                });
                this.element.openDDRecon();
                this.element.initialReviewCompleteCheck().click();
                this.element.saveBtnRecon().click();
                cy.wait(3000);
                this.element.verifyBtn().click();
            } else {
                cy.wait(5000);
                this.element.askQues().click();
                this.element.addConcern().click();
                this.element.addConcern().type("Skipping due to tennat mismatch");
                this.element.saveAndSkip().click();
                cy.wait(5000);
                this.irProcessWithTenantCheck(unitName, invoiceNumberStr, customerNameStr);
            }
        });
    }

    ReconcialltionProcessWithJFC(unitName, invoiceNumberStr, customerNameStr) {
        cy.get('#unitMenu_dd').then($el => {
            // $el is a jQuery object
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
                cy.wait(3000);
                this.element.invoiceNumberRecon().type(invoiceNumberStr);
                this.element.invoiceDateRecon().click();
                this.element.todayDate().click();
                cy.wait(1000);
                //condition to check no address
                cy.xpath(`//*[@name='editForm']`).then(($body) => {
                    if ($body.text().includes('No address is provided')) {
                        cy.get(`#noInfoPresent`).click();
                        cy.get(`#noPhonePresent`).click();
                    }
                });
                this.element.openDDRecon();
                this.element.initialReviewCompleteCheck().click();
                this.element.saveBtnRecon().click();
                cy.wait(3000);
                this.element.verifyBtn().click();
            } else {
                cy.wait(5000);
                this.element.askQues().click();
                this.element.addConcern().click();
                this.element.addConcern().type("Skipping due to tennat mismatch");
                this.element.saveAndSkip().click();
                cy.wait(5000);
                this.irProcessWithTenantCheck(unitName, invoiceNumberStr, customerNameStr);
            }
        });
    }

    ReconcialltionProcessWithDifferentVendor(unitName, invoiceNumberStr, customerNameStr) {
        cy.get('#unitMenu_dd').then($el => {
            // $el is a jQuery object
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
                cy.wait(3000);
                cy.wait(3000);
                this.element.clickVendor().click();
                this.element.selectVendorJFCDD().click({
                    multiple: true
                });
                //warning Vendor Miss Match
                this.element.differentVendorWarning().should('be.visible');
                this.element.differentVendorWarningOkBtn().should('be.visible').click();
                this.element.invoiceNumberRecon().type(invoiceNumberStr);
                this.element.invoiceDateRecon().click();
                this.element.todayDate().click();
                cy.wait(1000);
                //condition to check no address
                cy.xpath(`//*[@name='editForm']`).then(($body) => {
                    if ($body.text().includes('No address is provided')) {
                        cy.get(`#noInfoPresent`).click();
                        cy.get(`#noPhonePresent`).click();
                    }
                });
                this.element.askQues().should('be.disabled');
                this.element.clickLineItemBtn().should('be.disabled');
                this.element.openDDRecon();
                this.element.initialReviewCompleteCheck().click();
                this.element.saveBtnRecon().should('be.disabled');
                this.element.moreOptionsDropupBtn().click();
                this.element.skipInv().click();
                this.element.skipInvoiceWarning().should('be.visible');
                this.element.okBtn().click();
            }
        });
    }

    checkVerifyBtnOnRecon() {
        this.element.verifyBtnRecon().should("be.visible");;
    }

    clickVerifyBtnOnRecon(invoiceNumberStr, date) {
        var finalDate = utilObj.getCustomDate(date);
        this.element.invoiceNumberRecon().type(invoiceNumberStr);
        this.element.invoiceDateRecon().dblclick();
        this.element.invoiceDateRecon().type(finalDate);
        cy.wait(1000);
        //condition to check no address
        cy.xpath(`//*[@name='editForm']`).then(($body) => {
            if ($body.text().includes('No address is provided')) {
                cy.get(`#noInfoPresent`).click();
                cy.get(`#noPhonePresent`).click();
            }
        });
        cy.wait(1000);
        this.element.openDDRecon();
        this.element.initialReviewCompleteCheck().click();
        this.element.verifyBtnRecon().click();
        cy.wait(2000);
        this.element.clickOKBtnOnVerify().click();
    }

    clickVerifyBtnOnReconFuture(invoiceNumberStr, date) {
        var finalDate = utilObj.getCustomDateFuture(date);
        this.element.invoiceNumberRecon().type(invoiceNumberStr);
        this.element.invoiceDateRecon().dblclick();
        this.element.invoiceDateRecon().type(finalDate);
        this.element.closeDateCal().click();
        cy.wait(1000);
        //condition to check no address
        cy.xpath(`//*[@name='editForm']`).then(($body) => {
            if ($body.text().includes('No address is provided')) {
                cy.get(`#noInfoPresent`).click();
                cy.get(`#noPhonePresent`).click();
            }
        });
        cy.wait(1000);
        this.element.openDDRecon();
        this.element.initialReviewCompleteCheck().click();
        this.element.verifyBtnRecon().click();
        cy.wait(2000);
        this.element.clickOKBtnOnVerify().click();
    }

    irProcess(invoiceNumberStr) {
        this.element.invoiceNumber().type(invoiceNumberStr);
        this.element.invoiceDate().click();
        this.element.todayDate().click();
        this.element.verifiedTotal().type("9");
        this.element.openDD();
        this.element.initialReviewCompleteCheck().click();
        this.element.IRSaveBtn().click();
        cy.wait(3000);
    }

    completeReconWithChangeinProd(invoiceNumberStr, itemCodeStr, vIName, prodName) {
        this.element.invoiceNumberRecon().type(invoiceNumberStr);
        this.element.invoiceDateRecon().click();
        this.element.todayDate().click();
        cy.wait(3000);
        this.element.clickLineItemBtn().click({
            force: true
        });
        this.element.newVendorItemRadio().click({
            force: true
        });
        this.element.itemCode().type(itemCodeStr);
        this.element.vendorItem().type(vIName);
        this.element.clickProductLI().click();
        this.element.typeProductName().type(prodName);
        this.element.selectDDItem().click();
        this.element.packagingTxt().type("Pack");
        this.element.quanity().type("10");
        this.element.unit().click();
        this.element.selectUnit().click();
        this.element.price().type("19");
        this.element.saveLineItem().click();
        cy.wait(3000);
        //change the product quantity
        this.element.changePrice().click();
        cy.wait(2000);
        this.element.addNewPrice().type("9");
        cy.wait(2000);
        this.element.openDDRecon();
        this.element.initialReviewCompleteCheck().click();
        this.element.saveBtnRecon().click();
        cy.wait(3000);
        this.element.verifyBtn().click();
    }

    irProcessWithTenantCheckAdmin(unitName, invoiceNumberStr) {
        loginPageObjects.element.storeToggle().should('be.visible').then($el => {
            // $el is a jQuery object
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
                cy.wait(3000);
                this.element.clickVendor().should('be.visible').click();
                this.element.selectDDItem().should('be.visible').click({
                    multiple: true
                });
                this.element.invoiceNumber().type(invoiceNumberStr);
                this.element.invoiceDate().click();
                this.element.todayDate().click();
                cy.wait(1000);
                //condition to check no address
                cy.xpath(`//*[@name='editForm']`).then(($body) => {
                    if ($body.text().includes('No address is provided')) {
                        cy.get(`#noInfoPresent`).click();
                        cy.get(`#noPhonePresent`).click();
                    }
                });
                this.element.verifiedTotal().type("-9");
                this.element.openDD();
                this.element.initialReviewCompleteCheck().click();
                this.element.IRSaveBtn().click();
                cy.wait(3000);
            } else {
                cy.wait(1500);
                this.element.askQues().click();
                cy.wait(2000);
                this.element.addConcern().click();
                this.element.addConcern().type("Skipping due to tennat mismatch");
                this.element.saveAndSkip().click();
                cy.wait(5000);
                this.irProcessWithTenantCheckAdmin(unitName, invoiceNumberStr);
            }
        });
    }

    ReconcialltionProcessWithTenantCheckAdmin(unitName, invoiceNumberStr) {
        loginPageObjects.element.storeToggle().should('be.visible').then($el => {
            // $el is a jQuery object
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
                cy.wait(3000);
                cy.wait(3000);
                this.element.clickVendor().click();
                this.element.selectDDItem().click();
                this.element.invoiceNumberRecon().type(invoiceNumberStr);
                this.element.invoiceDateRecon().click();
                this.element.todayDate().click();
                this.element.addCreditRecon().type("-9");
                this.element.openDDRecon();
                this.element.initialReviewCompleteCheck().click();
                this.element.saveBtnRecon().click();
                cy.wait(3000);
                this.element.verifyBtn().click();
            } else {
                cy.wait(5000);
                this.element.askQues().click();
                this.element.addConcern().click();
                this.element.addConcern().type("Skipping due to tennat mismatch");
                this.element.saveAndSkip().click();
                cy.wait(5000);
                this.irProcessWithTenantCheck(unitName, invoiceNumberStr);
            }
        });
    }

    ReconcialltionProcessWithTenantCheckAdminCredit(unitName, invoiceNumberStr) {
            cy.get('#unitMenu_dd').then($el => {
                // $el is a jQuery object
                if ($el.text() == unitName) {
                    console.log("Restaurant Matched! Go Ahead");
                    cy.wait(3000);
                    cy.wait(3000);
                    this.element.clickVendor().click();
                    this.element.selectDDItem().click();
                    this.element.invoiceNumberRecon().type(invoiceNumberStr);
                    this.element.invoiceDateRecon().click();
                    this.element.todayDate().click();
                    cy.wait(1000);
                    //condition to check no address
                    cy.xpath(`//*[@name='editForm']`).then(($body) => {
                        if ($body.text().includes('No address is provided')) {
                            cy.get(`#noInfoPresent`).click();
                            cy.get(`#noPhonePresent`).click();
                        }
                    });
                    // add existing line item
                    this.element.clickLineItemBtn().click({
                        force: true
                    });
                    this.element.addExistingLineItem().click();
                    this.element.addExistingLineItem().type("70");
                    this.element.selectDDItem().click({
                        multiple: true
                    }, {
                        force: true
                    });
                    cy.wait(1000);
                    this.element.input().type("1");
                    this.element.unitPrice().type("8");
                    this.element.okBtnLI().click();
                    cy.wait(1000);
                    this.element.selectRadio().click();
                    this.element.saveExistingLineItem().click();
                    cy.wait(1000);
                    this.element.addCreditRecon().type("-9");
                    this.element.openDDRecon();
                    this.element.initialReviewCompleteCheck().click();
                    this.element.saveBtnRecon().click();
                    cy.wait(3000);
                    this.element.verifyBtn().click();
                } else {
                    cy.wait(5000);
                    this.element.askQues().click();
                    this.element.addConcern().click();
                    this.element.addConcern().type("Skipping due to tennat mismatch");
                    this.element.saveAndSkip().click();
                    cy.wait(5000);
                    this.irProcessWithTenantCheck(unitName, invoiceNumberStr);
                }
            });
        }

    closeOrderCredit() {
        this.element.finalReviewStatusTitle().should('include.text', 'Final Review');
        this.element.initialReviewCompleteCheck().should('be.visible').click();
        this.element.saveBtnRecon().should('not.be.disabled').click();
        this.element.verifyBtn().should('be.visible').click();
        cy.wait(3000);
        this.element.openDDForOrderStatus().should('be.visible');
        this.element.orderGrid().should('be.visible');
    }

    endPreProcessing() {
        this.element.uploadedStatusText().should('contain.text', 'Source: Uploaded');
        this.element.endPreProcessingBTN().should('be.visible').click();
        this.element.okBtn().should('be.visible').click();
        this.element.openDDForOrderStatus().should('be.visible');
    }

    firstOrderSelect() {
        cy.wait(2000);
        this.element.clickItem().should('be.visible').click();
        cy.wait(2000);
    }

    changeStatusToInitialReview() {
        cy.wait(2000);
        this.element.openDDForOrderStatus().should('be.visible').click();
        this.element.selectInitialReviewDD().should('be.visible').click();
        cy.wait(2000);
    }

    changeStatusToInReconciliation(invoiceNumber) {
        cy.wait(2000);
        this.element.openDDForOrderStatus().should('be.visible').click();
        this.element.selectInReconciliationDD().click();
        this.searchOrder(invoiceNumber);
        cy.wait(2000);
    }

    changeStatusToFinalReview(invoiceNumber) {
        cy.wait(2000);
        this.element.openDDForOrderStatus().should('be.visible').click();
        this.element.selectFinalReviewDD().click();
        this.searchOrder(invoiceNumber);
        cy.wait(1000);
    }

    changeStatusToAccountManagerReview() {
        cy.wait(2000);
        this.element.openDDForOrderStatus().should('be.visible').click();
        this.element.selectAMReviewDD().should('be.visible').click();
        this.element.clickItem().should('be.visible').click();
        cy.wait(2000);
    }

    changeStatusToNeedsAttention() {
        cy.wait(2000);
        this.element.openDDForOrderStatus().should('be.visible').click();
        this.element.selectNeedsAttentionDD().click();
        cy.wait(2000);
    }

    resolveQuestionsInAMReview() {
        this.element.accountManagerReviewStatusTitle().should('include.text', 'Account Manager Review')
        this.element.questionsAMReview().should('be.visible').click();
        this.element.verifyVIitemCheckbox().scrollIntoView();
        cy.wait(3000)
        this.element.verifyVIitemCheckbox().should('be.visible').click({
            force: true
        }, {
            multiple: true
        });
        cy.wait(2000);
        this.element.AMReviewCompleteCheckBox().should('be.visible').click();
        this.element.saveBtnRecon().should('not.be.disabled').click();
        this.element.verifyBtn().should('be.visible').click();
        cy.wait(3000);
        this.element.openDDForOrderStatus().should('be.visible');
        this.element.orderGrid().should('be.visible');
    }

    deleteClosedOrder(newInvoiceNum) {
        this.searchOrder(newInvoiceNum);
        cy.wait(1000);
        this.element.deleteOrder().should('be.visible').click();
        this.element.reasonToDeleteCheckbox().should('be.visible').click();
        this.element.deleteOrderTextField().clear().type("For Testing");
        this.element.deleteConfirmClosedOrder().click();
        this.element.openDDForOrderStatus().should('be.visible');
        cy.wait(2000);
    }

    deleteClosedOrderWithoutSorting(newInvoiceNum) {
        this.searchOrderWithoutsorting(newInvoiceNum);
        this.element.deleteOrder().should('be.visible').click();
        this.element.deleteConfirmClosedOrder().should('be.visible').click();
        cy.wait(2000);
        this.element.openDDForOrderStatus();
    }

    checkDeleteOrder() {
        this.element.deleteOrder().click();
        this.element.reasonToDeleteCheckbox().click();
        this.element.deleteOrderTextField().clear().type("For Testing");
        this.element.deleteConfirmClosedOrder().should('be.disabled');
        this.element.cancelDeleteConfirmClosedOrder().click();
        cy.wait(2000);
    }

    deleteIROrder() {
        this.element.deleteOrder().should('be.visible').click();
        this.element.reasonToDeleteCheckbox().should('be.visible').click();
        this.element.deleteOrderTextField().clear().type("For Testing");
        this.element.deleteConfirmClosedOrder().should('not.be.disabled').click();
        cy.wait(2000);
    }

    checkOrderDeleteConfirmText() {
        this.element.deleteOrder().should('be.visible').click();
        this.element.reasonToDeleteCheckbox().should('be.visible').click();
        this.element.deleteOrderTextField().clear().type("For Testing");
        this.element.checkDeleteConfirmText().should('be.visible');
        this.element.deleteConfirmClosedOrder().should('be.visible').click();
        cy.wait(2000);
    }

    deletePendingReconciliation() {
        this.element.deleteOrder().scrollIntoView().should('be.visible').click();
        this.element.reasonToDeleteCheckbox().click();
        this.element.deleteOrderTextField().should('be.visible').clear().type("For Testing");
        this.element.deleteConfirm().should('not.be.disabled').click();
        this.element.openDDForOrderStatus().should('be.visible');
        cy.wait(2000);
    }

    changeStatusToRetiredOrder() {
        this.element.openDDForOrderStatus().should('be.visible').click();
        this.element.selectRetiredOrderDD().scrollIntoView();
        this.element.selectRetiredOrderDD().should('be.visible').click();
        cy.wait(2000);
    }

    undeleteOrder(newInvoiceNum) {
        this.searchOrder(newInvoiceNum);
        cy.wait(2000);
        this.element.undeleteBtn().should('be.visible').click();
        this.element.undeleteTextField().clear().type("For Testing Undelete");
        this.element.undeleteConfirmBtn().click();
        this.element.openDDForOrderStatus().should('be.visible');
        cy.wait(2000);
    }

    viewInbox() {
        this.element.inboxBtn().should('be.visible').click();
        cy.wait(2000);
        this.element.unitReporterDatePicker().should('be.visible');
    }
    // this method can be used when the vendor is already used once
    irProcessWithVendor(invoiceNumberStr, vendorName) {
        this.element.clickItem().click();
        cy.wait(2000);
        this.element.clickVendor().should('be.visible').click();
        this.element.enterVendorName().clear().type(vendorName);
        this.element.selectDDItem().should('be.visible').click({
            multiple: true
        });
        this.element.recipientField().should('not.exist');
        this.element.invoiceNumber().type(invoiceNumberStr);
        this.element.invoiceDate().click();
        this.element.todayDate().click();
        this.element.verifiedTotal().type("9");
        this.element.openDD();
        this.element.initialReviewCompleteCheck().click();
        this.element.IRSaveBtn().click();
        cy.wait(3000);
    }

    reconProcessWithProd(invoiceNumberStr, itemCodeStr, vIName, prodName) {
        cy.wait(2000);
        this.element.clickVendorRecon().click();
        this.element.selectDDItem().should('be.visible').click({
            multiple: true
        });
        this.element.invoiceNumberRecon().type(invoiceNumberStr);
        this.element.invoiceDateRecon().click();
        this.element.todayDate().click();
        cy.wait(3000);
        this.element.clickLineItemBtn().click({
            force: true
        });
        this.element.newVendorItemRadio().click({
            force: true
        });
        this.element.itemCode().type(itemCodeStr);
        this.element.vendorItem().type(vIName);
        this.element.clickProductLI().click();
        this.element.typeProductName().type(prodName);
        this.element.selectDDItem().click();
        this.element.packagingTxt().type("Pack");
        this.element.quanity().type("10");
        this.element.unit().click();
        this.element.selectUnit().click();
        this.element.price().type("19");
        this.element.saveLineItem().click();
        cy.wait(3000);
        this.element.openDDRecon();
        this.element.initialReviewCompleteCheck().click();
        this.element.saveBtnRecon().click();
        cy.wait(3000);
        this.element.verifyBtn().click();
    }

    reconProcessWithoutProd(invoiceNumberStr, itemCodeStr, vIName) {
        cy.wait(2000);
        this.element.clickVendorRecon().click();
        this.element.selectDDItem().should('be.visible').click({
            multiple: true
        });
        this.element.invoiceNumberRecon().type(invoiceNumberStr);
        this.element.invoiceDateRecon().click();
        this.element.todayDate().click();
        cy.wait(3000);
        this.element.clickLineItemBtn().click({
            force: true
        });
        this.element.newVendorItemRadio().click({
            force: true
        });
        this.element.itemCode().type(itemCodeStr);
        this.element.vendorItem().type(vIName);
        this.element.packagingTxt().type("Pack");
        this.element.quanity().type("10");
        this.element.unit().click();
        this.element.selectUnit().click();
        this.element.price().type("19");
        this.element.saveLineItem().click();
        cy.wait(3000);
        this.element.openDDRecon();
        this.element.missingProdTxt().should("be.visible");
        this.element.initialReviewCompleteCheck().click();
        this.element.saveBtnRecon().click();
        cy.wait(3000);
        this.element.verifyBtn().click();
    }

    reOpenOrder(newInvoiceNum) {
        // close the order after reopening
        this.searchOrder(newInvoiceNum);
        cy.wait(2000);
        this.element.moreOptionsDropupBtn().should('be.visible').click();
        this.element.reOpenOrderBtn().should('be.visible').click();
        this.element.reasonToreOpenOrder().clear().type("For Testing");
        this.element.reOpenConfirmBtn().click();
        this.element.finalReviewStatusTitle().should('include.text', 'Final Review');
        // close it again
        this.element.reOpenedOrderCompleteCheck().click({
            force: true
        });
        this.element.saveBtnRecon().should('not.be.disabled').click();
        cy.wait(3000);
        this.element.verifyBtn().should('be.visible').click();
        this.element.openDDForOrderStatus().should('be.visible');
    }

    verifyReOpenOrder(newInvoiceNum) {
        this.searchOrder(newInvoiceNum);
        cy.wait(2000);
        this.element.moreOptionsDropupBtn().click();
        this.element.reOpenOrderBtn().should('not.be.visible');
    }

    ReconcialltionAndAddingLineItem(unitName, invoiceNumberStr, customerNameStr) {
        loginPageObjects.element.storeToggle().should('be.visible').then($el => {
            // $el is a jQuery object
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
                cy.wait(3000);
                cy.wait(3000);
                this.element.clickVendor().should('be.visible').click();
                this.element.selectDDItem().should('be.visible').click({
                    multiple: true
                });
                this.element.invoiceNumberRecon().type(invoiceNumberStr);
                this.element.invoiceDateRecon().click();
                this.element.todayDate().click();
                // add existing line item
                this.element.clickLineItemBtn().should('be.visible').click();
                this.element.addExistingLineItem().should('be.visible').click();
                this.element.addExistingLineItem().type("VI", { delay: 0 });
                this.element.selectDDItem().should('be.visible').click();
                cy.wait(1000);
                this.element.input().should('be.visible').clear().type("30");
                this.element.unitPrice().should('be.visible').clear().type("200");
                this.element.okBtnLI().should('be.visible').click();
                cy.wait(1000);
                this.element.selectRadio().should('be.visible').click();
                this.element.saveExistingLineItem().should('not.be.disabled').click();
                cy.wait(1000);
                //condition to check no address
                this.element.addressForm().should('be.visible').then(($body) => {
                    if ($body.text().includes('No address is provided')) {
                        cy.get(`#noInfoPresent`).click();
                        cy.get(`#noPhonePresent`).click();
                    }
                });
                this.element.openDDRecon();
                this.element.initialReviewCompleteCheck().click();
                this.element.saveBtnRecon().should('not.be.disabled').click();
                this.element.verifyBtn().should('be.visible').click();
                cy.wait(3000);
            } else {
                cy.wait(5000);
                this.element.askQues().click();
                this.element.addConcern().click();
                this.element.addConcern().type("Skipping due to tennat mismatch");
                this.element.saveAndSkip().click();
                cy.wait(5000);
                this.irProcessWithTenantCheck(unitName, invoiceNumberStr, customerNameStr);
            }
        });
    }

    irProcessWithTenantCheckBelowPrice(unitName, invoiceNumberStr, customerNameStr) {
        loginPageObjects.element.storeToggle().should('be.visible').then($el => {
            // $el is a jQuery object
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
                cy.wait(3000);
                this.element.clickVendor().should('be.visible').click();
                this.element.selectDDItem().should('be.visible').click({
                    multiple: true
                });
                this.element.invoiceNumber().type(invoiceNumberStr);
                this.element.invoiceDate().click();
                this.element.todayDate().click();
                cy.wait(1000);
                //condition to check no address
                this.element.addressForm().should('be.visible').then(($body) => {
                    if ($body.text().includes('No address is provided')) {
                        cy.get(`#noInfoPresent`).click();
                        cy.get(`#noPhonePresent`).click();
                    }
                });
                this.element.verifiedTotal().type("2");
                this.element.openDD();
                this.element.initialReviewCompleteCheck().click();
                this.element.IRSaveBtn().should('not.be.disabled').click();
                cy.wait(3000);
            } else {
                cy.wait(1500);
                this.element.askQues().click();
                cy.wait(2000);
                this.element.addConcern().click();
                this.element.addConcern().type("Skipping due to tennat mismatch");
                this.element.saveAndSkip().click();
                cy.wait(5000);
                this.irProcessWithTenantCheck(unitName, invoiceNumberStr, customerNameStr);
            }
        });
    }

    ReconcialltionAndAddingLineItemBelowPrice(unitName, invoiceNumberStr, customerNameStr) {
        loginPageObjects.element.storeToggle().should('be.visible').then($el => {
            // $el is a jQuery object
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
                cy.wait(3000);
                cy.wait(3000);
                this.element.clickVendor().should('be.visible').click();
                this.element.selectDDItem().should('be.visible').click({
                    multiple: true
                });
                this.element.invoiceNumberRecon().type(invoiceNumberStr);
                this.element.invoiceDateRecon().click();
                this.element.lastDate().click();
                // add existing line item
                this.element.clickLineItemBtn().should('be.visible').click();
                this.element.addExistingLineItem().should('be.visible').click();
                this.element.addExistingLineItem().should('be.visible').clear().type("VI", { delay: 0 });
                this.element.selectDDItem().should('be.visible').click();
                cy.wait(1000);
                this.element.input().should('be.visible').clear().type("30");
                this.element.unitPrice().should('be.visible').clear().type("200");
                this.element.okBtnLI().should('be.visible').click();
                cy.wait(1000);
                this.element.selectRadio().should('be.visible').click();
                this.element.saveExistingLineItem().should('not.be.disabled').click();
                cy.wait(1000);
                //condition to check no address
                this.element.addressForm().should('be.visible').then(($body) => {
                    if ($body.text().includes('No address is provided')) {
                        cy.get(`#noInfoPresent`).click();
                        cy.get(`#noPhonePresent`).click();
                    }
                });
                this.element.openDDRecon();
                this.element.initialReviewCompleteCheck().click();
                this.element.saveBtnRecon().should('not.be.disabled').click();
                this.element.verifyBtn().should('be.visible').click();
                cy.wait(3000);
            } else {
                cy.wait(5000);
                this.element.askQues().click();
                this.element.addConcern().click();
                this.element.addConcern().type("Skipping due to tennat mismatch");
                this.element.saveAndSkip().click();
                cy.wait(5000);
                this.irProcessWithTenantCheck(unitName, invoiceNumberStr, customerNameStr);
            }
        });
    }

    cancelPreProcessingRecon() {
        cy.wait(2000);
        this.element.endPreProcessingBTN().click();
        this.element.okBtn().click();
    }

    irProcessWOVendor(invoiceNumberStr) {
        this.element.invoiceNumber().type(invoiceNumberStr);
        this.element.invoiceDate().click();
        this.element.todayDate().click();
        cy.wait(1000);
        //condition to check no address
        cy.xpath(`//*[@name='editForm']`).then(($body) => {
            if ($body.text().includes('No address is provided')) {
                cy.get(`#noInfoPresent`).click();
                cy.get(`#noPhonePresent`).click();
            }
        });
        this.element.verifiedTotal().type("2");
        this.element.openDD();
        this.element.initialReviewCompleteCheck().click();
        this.element.IRSaveBtn().click();
        cy.wait(3000);
    }

    irProcessOnly(invoiceNumberStr) {
        this.element.invoiceNumber().type(invoiceNumberStr);
        this.element.invoiceDate().click();
        this.element.todayDate().click();
        cy.wait(1000);
        //condition to check no address
        cy.xpath(`//*[@name='editForm']`).then(($body) => {
            if ($body.text().includes('No address is provided')) {
                cy.get(`#noInfoPresent`).click();
                cy.get(`#noPhonePresent`).click();
            }
        });
        this.element.verifiedTotal().type("2");
        this.element.openDD();
        this.element.IRSaveBtn().click();
        cy.wait(3000);
    }

    irProcessWOVendorDaysCustomDate(invoiceNumberStr, date) {
        var finalDate = utilObj.getCustomDate(date);
        this.element.invoiceNumber().type(invoiceNumberStr);
        this.element.invoiceDate().dblclick();
        this.element.invoiceDate().type(finalDate);
        cy.wait(1000);
        //condition to check no address
        cy.xpath(`//*[@name='editForm']`).then(($body) => {
            if ($body.text().includes('No address is provided')) {
                cy.get(`#noInfoPresent`).click();
                cy.get(`#noPhonePresent`).click();
            }
        });
        this.element.verifiedTotal().type("2");
        this.element.openDD();
        this.element.initialReviewCompleteCheck().click();
        this.element.IRSaveBtn().click();
        cy.wait(3000);
    }

    irProcessWOVendorDaysCustomDateFuture(invoiceNumberStr, date) {
        var finalDate = utilObj.getCustomDateFuture(date);
        this.element.invoiceNumber().type(invoiceNumberStr);
        this.element.invoiceDate().dblclick();
        this.element.invoiceDate().type(finalDate);
        this.element.closeDateCal().click();
        cy.wait(1000);
        //condition to check no address
        cy.xpath(`//*[@name='editForm']`).then(($body) => {
            if ($body.text().includes('No address is provided')) {
                cy.get(`#noInfoPresent`).click();
                cy.get(`#noPhonePresent`).click();
            }
        });
        this.element.verifiedTotal().type("22");
        cy.wait(2000);
        this.element.openDD();
        this.element.initialReviewCompleteCheck().click();
        cy.wait(2000);
        this.element.IRSaveBtn().click();
        cy.wait(3000);
    }

    reconcialltionProcesswithPriceChange(invoiceNumberStr) {
        this.element.invoiceNumberRecon().type(invoiceNumberStr);
        this.element.invoiceDateRecon().click();
        this.element.todayDate().click();
        cy.wait(1000);
        //condition to check no address
        cy.xpath(`//*[@name='editForm']`).then(($body) => {
            if ($body.text().includes('No address is provided')) {
                cy.get(`#noInfoPresent`).click();
                cy.get(`#noPhonePresent`).click();
            }
        });
        cy.wait(1000);
        this.element.reconCredit().click();
        this.element.enterCredit().type("1");
        this.element.openDDRecon();
        this.element.initialReviewCompleteCheck().click();
        this.element.saveBtnRecon().click();
        cy.wait(3000);
        this.element.verifyBtn().click();
    }

    exportOrder() {
        this.element.exportAsDD().should('be.visible').click();
        this.element.exportCSV().should('be.visible').click();
        cy.readFile('cypress/downloads/orders.csv').should('exist');
    }

    orderDateChangedToAhead(dayAheadOrder) {
        this.element.closedInvoiceDate().click();
        cy.wait(2000);
        this.element.closedInvoiceDate().click();
        this.element.closedInvoiceDate().clear();
        this.element.closedInvoiceDate().type(dayAheadOrder);
        cy.wait(2000);
        this.element.confirmDate().click();
        cy.wait(2000);
        this.element.saveBtnRecon().click();
    }

    checkIRbtnOnRecon() {
        this.element.initialReviewCompleteCheck().click();
        this.element.warningInvoiceDate().should('be.visible');
        this.element.warningVerifiedTotal().should('be.visible');
        this.element.warningVendorRequired().should('be.visible');
        this.element.warningHandWritten().should('be.visible');
        this.element.IRSaveBtn().should('be.disabled');
    }

    checkRecbtnOnRecon() {
        this.element.initialReviewCompleteCheck().click();
        this.element.warningInvoiceDateRec().should('be.visible');
        this.element.warningHandWrittenRec().should('be.visible');
        this.element.saveBtnRecon().should('be.disabled');
    }

    checkIRbtnOnReconciliation() {
        this.element.initialReviewCompleteLabel().click();
    }

    checkRecbtnOnReconciliation() {
        this.element.recCompleteLabel().click();
    }

    checkDeleteBtn() {
        this.element.deleteOrder().should('be.disabled');
    }

    verifyOrderUploadDate() {
        this.clickItem().should('be.visible').click();
        let dateData = utilObj.getDateObj(0);
        let formattedDate = utilObj.getformattedDate(dateData.year, dateData.month, dateData.day, '-');
        this.uploadDate().should('have.value', formattedDate);
    }

    verifyStatusAndInactiveButtons() {
        this.element.orderStatusNew().should('have.value', "New");
        this.element.saveOrderBtn().scrollIntoView().should('be.disabled');
        this.element.saveBtnPlaceOrder().should('be.disabled');
        this.element.previewBtn().should('be.disabled');

    }

    saveOrderWithVendorNote() {
        cy.wait(1000);
        this.element.clickVendor().should('be.visible').click();
        cy.wait(1000);
        this.element.vendorList().should('be.visible');
        cy.wait(1000);
        this.element.enterVendorName().type("Arrow");
        cy.wait(1000);
        this.element.selectDDItem().click();
        cy.wait(1000);
        this.verifyStatusAndInactiveButtons();
        this.element.addQuantityPlaceOrder().type("8");
        this.element.vendorNote().should('be.visible').clear().type("Save Dummy Vendor Note");
        // verify preview item Price
        this.checkPreview();
        this.element.saveOrderBtn().should('not.be.disabled').click();
        cy.wait(2000);
    }

    editSavedOrder() {
        this.element.clickItem().should('be.visible').click();
        let dateData = utilObj.getDateObj(0);
        let formattedDate = utilObj.getformattedDate(dateData.year, dateData.month, dateData.day, '-');
        this.element.uploadDate().should('have.value', formattedDate);
        this.element.orderStatusSaved().should('have.value', "Saved");
        this.element.addPhoto().should('not.be.visible');
        this.element.addQuantity().should('be.visible').clear().type(3);
        this.element.saveOrderBtn().should('not.be.disabled').click();
        cy.wait(2000);
    }

    checkPreview() {
        this.element.previewBtn().click();
        let totalPrice;
        this.element.orderPrice().should($el => {
            totalPrice = $el.text();
        });
        this.element.previwPrice().should($el => {
            const pricePreview = $el.text();
            expect(pricePreview).equal(totalPrice);
        });
        this.element.previewConfirmationBtn().should('be.visible').click();
    }

    checkPriceConfirmation() {
        let totalPrice;
        this.element.orderPrice().should($el => {
            totalPrice = $el.text();
        });
        this.element.previwPrice().should($el => {
            const pricePreview = $el.text();
            expect(pricePreview).equal(totalPrice);
        });
    }

    changeStatusToPreprocessing() {
        cy.intercept('GET', '/api/orders*status=PREPROCESSING*').as('preprocessingOrder');
        this.element.openDDForOrderStatus().should('be.visible').click();
        this.element.selectPreprocessingDD().should('be.visible').click();
        utilObj.checkTotalItems('@preprocessingOrder');
    }

    verifyOnlineOrder() {
        cy.wait(1000);
        this.element.clickVendor().should('be.visible').click();
        cy.wait(1000);
        this.element.vendorList().should('be.visible');
        this.element.enterVendorName().type("SmokeTest House");
        this.element.selectDDItem().should('not.exist');
    }

    placeNewOrderwithMultiplePackaging(vendor) {
        cy.wait(1000);
        this.element.clickVendor().click();
        cy.wait(1000);
        this.element.enterVendorName().type(vendor);
        cy.wait(1000);
        this.element.selectDDItem().click();
        cy.wait(1000);
        this.element.vendorItemsText().should('be.visible');
        this.element.addQuantityPlaceOrder().type("8.8");
        this.element.printOrderGuideBtn().should('be.visible').click();
        cy.readFile('cypress/downloads/orderGuide.pdf').should('exist');
        // decimal quantity gets rounded automatically
        this.element.addQuantityPlaceOrder().should('have.value', "9");
        this.element.selectPackaging().select(testData.package2.name);
        this.element.priceText().should('contain.text', testData.package2.price);
        this.element.vendorNote().should('be.visible').clear().type("Send Dummy Vendor Note With Multiple Packaging", { delay: 0 });
        this.element.sendBtn().click();
        cy.wait(2000);
        this.element.confirmSend().click();
        this.element.openDDForOrderStatus().should('be.visible');
        cy.reload();
        this.element.orderGrid().should('be.visible');
        cy.wait(2000);
    }

    checkResend(newVendor) {
        cy.wait(3000);
        this.element.filterOption().should('be.visible').clear().type(newVendor);
        this.element.clickItem().should('be.visible').click();
        this.element.saveBtnPlaceOrder().should('not.be.visible');
    }

    insertVendorRemittanceAddress(address) {
        this.element.recipientField().should('be.visible').clear().type(address.recipient);
        this.element.addressLine1Field().clear().type(address.addressLine1);
        this.element.cityField().clear().type(address.city);
        this.element.stateField().clear().type(address.state);
        this.element.zipCodeField().clear().type(address.zipCode);
    }

    insertVendorData(newVendor) {
        this.element.clickVendor().should('be.visible').click();
        this.element.enterVendorName().clear().type(newVendor);
        this.element.selectDDItem().should('be.visible').click();
    }

    irProcessWithPaymentTerms(unitName, newVendor, invoiceNumberStr, packaging, address) {
        loginPageObjects.element.storeToggle().should('be.visible').should('be.visible').then($el => {
            // $el is a jQuerSy object
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
                this.insertVendorData(newVendor);
                this.element.invoiceNumber().should('be.visible').type(invoiceNumberStr);
                this.element.invoiceDate().click();
                this.element.todayDate().click();
                this.element.verifiedTotal().should('be.visible').clear().type(packaging.price);
                this.element.openDD();
                this.insertVendorRemittanceAddress(address);
                this.element.noPhoneCheckbox().click();
                this.element.initialReviewCompleteCheck().click();
                // add due date by 5
                vendorsPage.addDuedate(testData.noOfdueDays);
                this.element.IRSaveBtn().should('not.be.disabled').click();
                cy.wait(3000);
            }
        });
    }

    reconciliationProcessWithPaymentTerms(unitName, newVendor, vendorItemName, invoiceNumberStr, packaging, address) {
        loginPageObjects.element.storeToggle().should('be.visible').then($el => {
            // $el is a jQuery object
            if ($el.text() == unitName) {
                console.log("Restaurant Matched! Go Ahead");
                this.insertVendorData(newVendor);
                this.element.invoiceNumberRecon().should('be.visible').clear().type(invoiceNumberStr);
                this.element.invoiceDateRecon().click();
                this.element.todayDate().click();
                this.element.openDDRecon();
                this.insertVendorRemittanceAddress(address);
                this.element.noPhoneCheckbox().click();
                this.element.initialReviewCompleteCheck().click();
                vendorsPage.addDuedate(testData.noOfdueDays);
                // add Line item
                this.addLineItem(vendorItemName, packaging);
                this.element.saveBtnRecon().should('not.be.disabled').click();
                cy.wait(3000);
                this.element.verifyBtn().click();
            }
        });
    }

    addLineItem(vendorItemName, packaging) {
        this.element.clickLineItemBtn().click();
        this.element.addExistingLineItem().should('be.visible').click();
        this.element.addExistingLineItem().type(vendorItemName, { delay: 0 });
        this.element.selectDDItem().should('be.visible').click();
        this.element.input().should('be.visible').clear().type(packaging.quantity);
        this.element.unitPrice().clear().type(packaging.price);
        this.element.okBtnLI().click();
        this.element.selectRadio().should('be.visible').click();
        this.element.saveExistingLineItem().should('not.be.disabled').click();
    }

    checkAddress(vendorName) {
        this.insertVendorData(vendorName);
        this.element.recipientField().should('not.exist');
        this.element.mobileField().should('not.exist');
        this.element.IRSaveBtn().should('not.be.disabled');
    }

    askQuestionOnFR() {
        cy.wait(3000);
        this.element.askQues().click();
        this.element.addConcern().click();
        this.element.addConcern().type("HELLO TEST");
        this.element.saveAndSkip().click();
        cy.wait(2000);
    }

    verifyConcern(){
        this.element.activeConcernWarning().should('be.visible');
        this.element.saveBtnRecon().click();
    }

    resolveConcerned(){
        this.element.concernExpander().click();
        cy.wait(5000);
        this.element.resolveConcern().click();
        this.element.concernExpander().click();
    }

    completeFR(){
        cy.wait(3000);
        this.element.finalReviewStatusTitle().should('contain.text', 'Final Review');
        this.element.saveBtnRecon().should('be.visible').click();
        cy.wait(3000);
    }

    deleteAttachInvoice(){
        this.element.deleteOrder().should('be.visible').click();
        this.element.deleteOrderTextField().clear().type('For Testing');
        this.element.deleteConfirm().should('be.visible').click();
    }

    deletePhotoOrder(){
        this.element.deletePhotoOrderBtn().should('be.visible').click();
        this.element.deletePhotoOrderFile().should('be.visible').click();
        cy.wait(5000);
        this.element.okBtnPhotoDel().should('be.visible').click({multiple:true, force: true});
        this.element.closeBtn().should('be.visible');
        cy.wait(5000);
        this.element.okBtnPhotoDel().should('be.visible').click({multiple:true, force: true});
    }

    deleteAttachInvoice(){
        this.element.deleteOrder().should('be.visible').click();
        this.element.deleteOrderTextField().clear().type('For Testing');
        this.element.deleteConfirm().should('be.visible').click();
    }

    deletePhotoOrder(){
        this.element.deletePhotoOrderBtn().should('be.visible').click();
        this.element.deletePhotoOrderFile().should('be.visible').click();
        cy.wait(5000);
        this.element.okBtnPhotoDel().should('be.visible').click({multiple:true, force: true});
        this.element.closeBtn().should('be.visible');
        cy.wait(5000);
        this.element.okBtnPhotoDel().should('be.visible').click({multiple:true, force: true});
    }

    changeStatusToPreprocessing() {
        this.element.openDDForOrderStatus().should('be.visible').click();
        this.element.selectPreprocessingStatus().should('be.visible').click()
    }

    reClosingOrderWithNoAddress(newInvoiceNum) {
        this.searchOrder(newInvoiceNum);
        cy.wait(2000);
        this.element.moreOptionsDropupBtn().should('be.visible').click();
        this.element.moveToPendingApproval().should('be.visible');
        this.element.reOpenOrderBtn().should('be.visible').click();
        this.element.reasonToreOpenOrder().clear().type("For Testing");
        this.element.reOpenConfirmBtn().should('be.visible').click();
        cy.wait(5000);
        this.element.noInfoCheckBox().should('be.visible').click();
        this.element.reOpenedOrderCompleteCheck().should('be.visible').click();
        this.element.saveBtnRecon().should('not.be.disabled').click();
        cy.wait(3000);
        this.element.verifyBtn().should('be.visible').click();
        this.element.openDDForOrderStatus().should('be.visible');
    }

    verifyDisabledAddressField(invoiceNumberStr) {
        this.element.invoiceNumber().should('have.value', invoiceNumberStr);
        this.element.recipientField().scrollIntoView().should('be.disabled');
        this.element.mobileField().should('be.disabled');
    }

    // To use this method decimal quantity is not allowed for vendor
    placeNewOrderWithParValue(newVendor, parValue) {
        cy.wait(1000);
        this.element.clickVendor().should('be.visible').click();
        cy.wait(1000);
        this.element.enterVendorName().type(newVendor);
        cy.wait(1000);
        this.element.selectDDItem().click();
        cy.wait(1000);
        // par value can't be edited
        vendorsPage.element.parInputFields().should('have.attr', 'readonly');
        //vendorsPage.element.parInputFields().should('have.value', parValue);
        this.element.lastCountData().should('include.text', "Kilogram: 1");
        let fullMonth = assertionPage.getFullMonth().slice(0, 3);
        let dateObj = utilObj.getDateObj(0);
        let dateText = fullMonth + '. ' + parseInt(dateObj.day) + ' ' + dateObj.year;
        this.element.lastCountDateData().should('include.text', dateText);
        this.element.onHandInpurFields().should('be.visible').clear().type(testData.OHvalue);
        // decimal quantity will not be visible
        // ceil(Par - OH) = Total QTY
        this.element.addQuantityPlaceOrder().should('have.value', Math.ceil(parValue - testData.OHvalue));
        this.element.vendorNote().should('be.visible').clear().type("Send Dummy Vendor Note with On hand value");
        this.element.sendBtn().should('not.be.disabled').click();
        cy.wait(2000);
        this.element.confirmSend().should('be.visible').click();
        this.element.openDDForOrderStatus().should('be.visible');
        cy.wait(2000);
    }

    veifyVendorSetupArticle() {
        cy.get(`#helpArticle > a`).should('have.attr', 'href', testData.vendorSetupURL);
    }

    moveInvoice(createRestName) {
        this.element.clickItem().should('be.visible').click();
        this.element.moreOptionsDropupBtn().should('be.visible').click();
        this.element.moveOrderOp().should('be.visible').click();
        this.element.moveOrderTenantDD().should('be.visible').click();
        this.element.moveOrderTenantDD().clear().type(createRestName);
        cy.wait(2000);
        this.element.clickItemDD().should('be.visible').click();
        this.element.moveInvBtn().should('be.visible').click();
        this.element.okBtn().should('be.visible').click();
        this.element.openDDForOrderStatus().should('be.visible');
    }

    verifyOrderStatus() {
        this.element.clickItem().should('be.visible').click();
        this.element.moreOptionsDropupBtn().should('be.visible').click();
        this.element.historyOp().should('be.visible').click();
        this.element.statusNoteText().should('include.text', 'This order was moved');
        this.element.closeAuditTrail().should('be.visible').click()
    }

    changeStatustoPendingApproval(invoiceNum) {
        this.element.openDDForOrderStatus().should('be.visible').click();
        this.element.selectPendingApproval().scrollIntoView().should('be.visible').click();
        cy.wait(2000);
        this.searchOrder(invoiceNum);
    }

    enableInvoiceApproval() {
        this.element.invoiceAppovalAll().should('be.visible').click();
        this.element.invoiceApprovalSaveBtn().should('be.visible').click();
        this.element.okBtn().should('be.visible').click();
        this.element.invoiceApprovalSetupBtn().should('be.visible');
    }

    disableInvoiceApproval() {
        this.element.invoiceApprovalSetupBtn().should('be.visible').click();
        this.element.invoiceAppovalOff().should('be.visible').click();
        this.element.invoiceApprovalSaveBtn().should('be.visible').click();
        this.element.okBtn().should('be.visible').click();
        cy.wait(1000);
        this.element.okBtn().should('be.visible').click();
    }
}
module.exports = new orderPage();