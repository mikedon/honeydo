'use strict';
var RegistrationPage = require("./RegistrationPage.js").RegistrationPage;
var TaskSearchPage = require("./TaskSearchPage.js").TaskSearchPage;

var HoneyDoHomePage = function() {
    this.userName = element(by.model("currentUser.username"));
    this.password = element(by.model("currentUser.password"));
    this.signInButton = element(by.cssContainingText(".btn-primary", "Sign In"));
    this.registrationButton = element(by.cssContainingText(".navbar-btn", "Register"));

    this.get = function() {
        browser.get('index.html');
    };

    this.clickRegister = function(){
        this.registrationButton.click();
        return new RegistrationPage();
    };

    this.setUserName = function(userName){
        this.userName.sendKeys(userName);
        return this;
    };

    this.setPassword = function(password){
        this.password.sendKeys(password);
        return this;
    }

    this.clickSignIn = function(){
        this.signInButton.click();
        return new TaskSearchPage();
    }
};

module.exports.HoneyDoHomePage = HoneyDoHomePage;