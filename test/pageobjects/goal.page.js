const { By, until } = require('selenium-webdriver');
const Base = require('./Base');

class GoalPage extends Base {
    constructor(driver) {
        super(driver);

        this.goalCodeLocator = By.xpath("//div[@class='ui-panelgrid-cell ui-g-12 ui-md-6']/input[@id='formulario:j_idt83']");
        this.goalDescriptionLocator = By.xpath("//div[@class='ui-panelgrid-cell ui-g-12 ui-md-6']/textarea");
        this.goalButtonLocator = By.xpath("//span[@class='ui-button-text ui-c' and text()='Aceptar']");
        this.messageGoal = By.xpath("//div[@class='ui-growl-message']/span[@class='ui-growl-title']");
        this.titleApp = By.xpath("//div[@id='tituloApp']/h1");


        this.tableBody = By.id("tabla:j_idt89_data");
        /*
        this.optionEditButton = By.xpath("//*[@id='tabla:j_idt89_data']//tr/td[3]/div//span[@class='ui-icon ui-icon-pencil']");

        this.modifyCodeLocator = By.cssSelector(".ui-row-editing > td:nth-child(1) input");
        this.modifyDescriptionLocator = By.cssSelector(".ui-row-editing > td:nth-child(2) textarea");
        this.updateBtnCheckLocator = By.cssSelector(".ui-row-editing > td:nth-child(3) a.ui-row-editor-check");
        this.cancelUpdateLocator = By. cssSelector(".ui-row-editing > td:nth-child(3) a.ui-row-editor-close");

        this.deleteGoalLocator = By.xpath("//*[@id='tabla:j_idt89_data']//tr/td[3]/button//span[@class='ui-button-icon-left ui-icon ui-c pi pi-trash']");
        //By alertDeleteObjLocator = By.cssSelector(".ui-confirm-dialog");
        this.alertDeleteGoalLocator = By.xpath("//div[@class='ui-confirm-dialog ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow ui-hidden-container']/div[@class='ui-dialog-buttonpane ui-dialog-footer ui-widget-content ui-helper-clearfix']");
        this.confirmDeleteObjLocator = By.xpath("//span[@class='ui-button-text ui-c' and text()='Si']");
        this.cancelDeleteObjLocator = By.xpath("//span[@class='ui-button-text ui-c' and text()='No']");

         */
    }

    async receivePopupMessage() {
        return this.getText(this.messageGoal)
    }

    registerGoal(code, description) {
        this.type(code, this.goalCodeLocator);
        this.type(description, this.goalDescriptionLocator);
        this.click(this.goalButtonLocator);
        //this.getEwait().until(until.visibilityOfElementLocated(this.messageGoal));
    }

    async getTitle() {
        return this.driver.getTitle();
    }
}

module.exports = GoalPage;