'use strict';
var HoneyDoHomePage = require('./pages/HomePage.js').HoneyDoHomePage;

describe('HoneyDo Registration', function() {

    it('should validate the required fields', function() {
        var homePage = new HoneyDoHomePage();
        homePage.get();
        var registrationPage = homePage.clickRegister();
        registrationPage.submitForm();
        registrationPage.validationFailed();
        registrationPage.requiredInputsInvalid();
    });

});