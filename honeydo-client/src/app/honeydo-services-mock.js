app.run(function($httpBackend, apiUrl, authenticationUrl){
    var user = {
        username: "jdoe",
        firstName: "John",
        lastName: "Doe",
        roles: ["User"]
    };
    $httpBackend.whenGET(authenticationUrl + 'api/user/secure/currentUser').respond(user);

    var tasks = [
        {
            name : "Clean the gutters",
            priority : 2,
            dueDate : new Date(2015, 2, 10)
        },
        {
            name : "Fix the leak in the basement",
            priority : 1,
            dueDate : new Date(2015, 2, 10)
        },
        {
            name : "Hang the TV in the basement",
            priority : 4,
            dueDate : new Date(2015, 2, 1)
        },
        {
            name : "Paint the guest bedroom in the basement",
            priority : 3,
            dueDate : new Date(2015,1,15)
        }
    ];
    $httpBackend.whenGET(authenticationUrl + 'api/task/search').respond(tasks);

    $httpBackend.whenPOST(authenticationUrl + 'api/secure/task/create').respond(function(method, url, data) {
        var task = angular.fromJson(data);
        task.dueDate = new Date(task.dueDate);
        tasks.push(task);
        return [200, task, {}];
    });
});