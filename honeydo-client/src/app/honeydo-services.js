app.factory('HoneyDoResource', function($resource, BaseResource, $location, $rootScope, $filter, apiUrl){
    return {
        getSpouses: function() {
            return BaseResource.query($resource(apiUrl + 'api/spouses'));
        },
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
        },
        register : function(registration, redirect){
            var Registration = $resource(apiUrl + 'api/register');
            var newRegistration = new Registration();
            newRegistration.firstName = registration.firstName;
            newRegistration.lastName = registration.lastName;
            newRegistration.userId = registration.userId;
            newRegistration.password = registration.password;
            newRegistration.spouse = registration.spouse;
            BaseResource.save(newRegistration, function(){
                $rootScope.clearAlerts = false;
                $location.path(redirect);
            });
        }
    };
});


