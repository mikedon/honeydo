app.run(function($httpBackend, apiUrl, authenticationUrl){
    var loggedIn = false;

    var user = {
        username: "jdoe",
        firstName: "John",
        lastName: "Doe",
        roles: ["User"]
    };

    $httpBackend.whenGET(authenticationUrl + 'api/user/secure/currentUser').respond(function(method, url, data){
        if(loggedIn){
            return [200, user, {}];
        }else{
            return [200, null, {}];
        }
    });

    $httpBackend.whenPOST(authenticationUrl + 'j_spring_security_check').respond(function(method, url, data){
        loggedIn = true;
        return [200, user, {}];
    });

    $httpBackend.whenGET(authenticationUrl + 'j_spring_security_logout').respond(function(method, url, data){
        loggedIn = false;
        return [200, {}, {}];
    });

    var tasks = [
        {
            id: 1,
            name : "Clean the gutters",
            priority : 2,
            dueDate : new Date(2015, 2, 10)
        },
        {
            id: 2,
            name : "Fix the leak in the basement",
            priority : 1,
            dueDate : new Date(2015, 2, 10)
        },
        {
            id: 3,
            name : "Hang the TV in the basement",
            priority : 4,
            dueDate : new Date(2015, 2, 1)
        },
        {
            id: 4,
            name : "Paint the guest bedroom in the basement",
            priority : 3,
            dueDate : new Date(2015,1,15)
        }
    ];
    $httpBackend.whenGET(/api\/tasks/).respond(function(method, url, data){
        return [200, tasks, {}];
    });
    $httpBackend.whenDELETE(/*\/api\/tasks\/d*/).respond(function(method, url, data){
        var urlParts = url.split("/");
        var id = urlParts[urlParts.length - 1];
        var indexToRemove;
        for(var i = 0; i < tasks.length; i++){
            if(tasks[i].id === id){
                indexToRemove = i;
                break;
            }
        }
        tasks.splice(indexToRemove, 1);
        return [200, {}, {}];
    });

    $httpBackend.whenPOST(/api\/tasks/).respond(function(method, url, data) {
        var task = angular.fromJson(data);
        task.dueDate = new Date(task.dueDate);
        tasks.push(task);
        task.alerts = [{
            type: "success",
            message: "Task successfully created!"
        }]
        return [200, task, {}];
    });

    $httpBackend.whenPOST(/api\/users/).respond(function(method, url, data){
        loggedIn = true;
        user.alerts = [{
            type: "success",
            message: "Thank you for registering!"
        }];
        return [200, user, {}];
    });

    var spouses = [
        {
            fullName: "Michelle Donovan",
            id: 1
        },
        {
            fullName: "Joan Jett",
            id: 2
        },
        {
            fullName: "Britney Spears",
            id: 3
        },
        {
            fullName: "Michelle Obama",
            id: 4
        }
    ];

    $httpBackend.whenGET(/^\/api\/spouses/).respond(function(method, url, data){
        return [200, spouses, {}];
    });
});