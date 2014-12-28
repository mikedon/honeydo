
var TaskSearchPage  = function(){
    this.createTaskButton = element(by.css(".btn-primary > span.glyphicon-plus"));
    this.taskName = element(by.model("task.name"));
    this.taskDueDate = element(by.model("task.dueDate"));
    this.taskPriority = element(by.model("task.priority"));

    this.clickCreateTaskButton = function(){
        this.createTaskButton.click();
        return this;
    };

    this.setTaskName = function(taskName){
        this.taskName.sendKeys(taskName);
        return this;
    };

    this.setTaskDueDate = function(dueDate){
        this.taskDueDate.sendKeys(dueDate);
        return this;
    };

    this.setTaskPriority = function(priority){
        this.taskPriority.all(by.tagName('option'))
            .then(function(options) {
                for(var i = 0; i < options.length; i++){
                    var option = options[i];
                    if(option.getText() === priority){
                        option.click();
                    }
                }
            });
        return this;
    };

    this.clickSubmitNewTask = function(){
        var submitNewTask = element(by.css(".modal-footer > button.btn-primary"));
        submitNewTask.click();
        return this;
    };

    this.getTaskNames = function(){git
        return element.all(by.repeater("task in tasks")).then(function(tasks){
            var taskNames = [];
            for(var i = 0; i < tasks.length; i++){
                taskNames.push(tasks[i].getText());
            }
            return taskNames;
        });
    };

};

module.exports.TaskSearchPage = TaskSearchPage;