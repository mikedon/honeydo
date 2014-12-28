var HoneyDoHomePage = require("./pages/HomePage.js").HoneyDoHomePage;

describe('HoneyDo Tasks', function() {

    it('should allow a user to login and then create a task', function() {
        var homePage = new HoneyDoHomePage();
        homePage.get();
        homePage.setUserName("testUser").setPassword("password");
        var taskSearchPage = homePage.clickSignIn();
        expect(browser.getLocationAbsUrl()).toMatch("/task/search");

        taskSearchPage.clickCreateTaskButton();
        taskSearchPage.setTaskName("test task")
            .setTaskDueDate("11/11/9999")
            .setTaskPriority("Critical")
            .clickSubmitNewTask();

        //TODO
        //console.log(taskSearchPage.getTaskNames());
        //expect(taskSearchPage.getTaskNames().indexOf("test task")).not.toBe(-1);
    });

});