import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Developer e2e test', () => {

    let navBarPage: NavBarPage;
    let developerDialogPage: DeveloperDialogPage;
    let developerComponentsPage: DeveloperComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Developers', () => {
        navBarPage.goToEntity('developer');
        developerComponentsPage = new DeveloperComponentsPage();
        expect(developerComponentsPage.getTitle())
            .toMatch(/developerwebApp.developer.home.title/);

    });

    it('should load create Developer dialog', () => {
        developerComponentsPage.clickOnCreateButton();
        developerDialogPage = new DeveloperDialogPage();
        expect(developerDialogPage.getModalTitle())
            .toMatch(/developerwebApp.developer.home.createOrEditLabel/);
        developerDialogPage.close();
    });

    it('should create and save Developers', () => {
        developerComponentsPage.clickOnCreateButton();
        developerDialogPage.setNameInput('name');
        expect(developerDialogPage.getNameInput()).toMatch('name');
        developerDialogPage.setTechnologiesInput('technologies');
        expect(developerDialogPage.getTechnologiesInput()).toMatch('technologies');
        developerDialogPage.save();
        expect(developerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DeveloperComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-developer div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DeveloperDialogPage {
    modalTitle = element(by.css('h4#myDeveloperLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    technologiesInput = element(by.css('input#field_technologies'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setTechnologiesInput = function(technologies) {
        this.technologiesInput.sendKeys(technologies);
    };

    getTechnologiesInput = function() {
        return this.technologiesInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
