var RegistrationPage = function(){
    this.spouse = element(by.model("registration.spouse"));
    this.firstName = element(by.model("registration.firstName"));
    this.lastName = element(by.model("registration.lastName"));
    this.userId = element(by.model("registration.userId"));
    this.password = element(by.model("registration.password"));
    this.submitButton = element(by.buttonText("Submit"));

    this.setSpouse = function(spouse){
        this.spouse.sendKeys(spouse);
        return this;
    };
    this.setFirstName = function(firstName){
        this.firstName.sendKeys(firstName);
        return this;
    };
    this.setLastName = function(lastName){
        this.lastName.sendKeys(lastName);
        return this;
    };
    this.setUserId = function(userId){
        this.userId.sendKeys(userId);
        return this;
    };
    this.setPassword = function(password){
        this.password.sendKeys(password);
        return this;
    };
    this.submitForm = function(){
        this.submitButton.click();
    };
    this.hasClass = function(element, cssClass){
        return element.getAttribute("class").then(function(classes){
            return classes.split(" ").indexOf(cssClass) !== -1;
        })
    };
    this.validationFailed = function(){
        var form = element(by.css("form[name='registrationForm']"));
        expect(this.hasClass(form, "ng-invalid")).toBe(true);
    };
    this.requiredInputsInvalid = function(){
        expect(this.hasClass(this.firstName, "ng-invalid-required"));
        expect(this.hasClass(this.lastName, "ng-invalid-required"));
        expect(this.hasClass(this.userId, "ng-invalid-required"));
        expect(this.hasClass(this.password, "ng-invalid-required"));
    };
};
module.exports.RegistrationPage = RegistrationPage;