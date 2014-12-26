app.factory('HoneyDoResource', function($resource, BaseResource, $location, $rootScope, $filter, apiUrl){
    return {
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


