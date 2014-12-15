app.factory('HoneyDoResource', function($resource, BaseResource, $location, $rootScope, $filter, apiUrl){
    return {
        getTasks : function() {
            return BaseResource.query($resource(apiUrl + 'api/task/search'));
        },
        createTask : function(task, onSuccess){
            var Task = $resource(apiUrl + 'api/secure/task/create');
            var newTask = new Task();
            newTask.name = task.name;
            newTask.dueDate = task.dueDate;
            newTask.priority = task.priority;
            BaseResource.save(newTask, onSuccess);
        }
    };
});


