var app = angular.module('honeydo', [
    'config',
	'templates-app',
	'templates-common',
	'ngResource', 
	'ngRoute', 
	'ui.bootstrap',
	'ng-commons',
    'ngMockE2E'
]);

app.config(["$routeProvider", "$tooltipProvider", "$httpProvider", function($routeProvider, $tooltipProvider, $httpProvider){
    //global options for tool tips
    $tooltipProvider.options({trigger: 'focus'});
    $httpProvider.defaults.withCredentials = true;

	$routeProvider.when('/home', {
		templateUrl:'home/home.tpl.html',
		resolve: {
            user: ['User', function(User){
                return User.initialize();
            }]
        }
    });
    $routeProvider.when('/task/search', {
       templateUrl: 'task/search.tpl.html',
        controller: 'TaskSearchCtrl',
        resolve: {
            user : ['User', function(User){
                return User.initialize();
            }],
            tasks : ['data', function(data){
                return data.query("tasks");
            }]
        },
        access: {requiresLogin: true, role: "User"}
    });
    $routeProvider.when('/registration', {
        templateUrl:'registration/registration.tpl.html',
        controller: 'RegistrationCtrl',
        resolve: {
            spouses: ['data', function(data){
                return data.query("spouses");
            }]
        }
    });

	$routeProvider.otherwise({redirectTo: '/home'});
}]);

/**
 * http://blog.brunoscopelliti.com/deal-with-users-authentication-in-an-angularjs-web-app
 *
 * http://blog.brunoscopelliti.com/show-route-only-after-all-promises-are-resolved
 */
app.run(['$rootScope', '$location', '$timeout', 'User', 'api',
    function ($root, $location, $timeout, User, api){
        api.add("tasks");
        api.add("spouses");
        api.add("users");

        $root.$on('$routeChangeStart', function(e, curr, prev) {
            if (curr.$$route && curr.$$route.resolve) {
                // Show a loading message until promises are not resolved
                $root.loadingView = true;
            }
        });
        $root.$on('$routeChangeSuccess', function(event, currRoute){
            $root.loadingView = false;
            //clear out error msgs...better way?
            if($root.clearAlerts){
                $root.alerts = [];
            }
            $root.clearAlerts = true;
            if(currRoute.access && currRoute.access.requiresLogin){
                if(!User.isLoggedIn()){
                    $root.captureRedirect = $location.path();
                    $root.clearAlerts = false;
                    console.debug("Route Requires Login");
                    $root.alerts = [{type:'warning', message:'Please login first.'}];
                    $location.path("/login");
                }else if(!User.hasRole(currRoute.access.role)){
                    console.debug("Route Requires Role: " + currRoute.access.role);
                    $location.path("/");
                }else if(currRoute.access.validate){
                    var validateResponse = currRoute.access.validate(currRoute.locals);
                    if(validateResponse){
                        $root.clearAlerts = false;
                        $root.alerts = [{type:'warning', message:validateResponse.msg}];
                        $location.path(validateResponse.path);
                    }
                }
            }
        });
    }
]);

app.controller('NavbarCtrl', ['$scope', 'User', '$modal',
    function($scope, User, $modal){
        $scope.login = function(){
            User.login("task/search");
        };
        $scope.logout = function(){
            User.logout('home');
        };
        $scope.currentUser = User;
        $scope.openCreateTaskModal = function() {
            var createTaskModalInstance = $modal.open({
                templateUrl: 'task/task-create-modal.tpl.html',
                controller: 'CreateTaskModalInstanceCtrl',
                resolve: {
                    //items: function () {
                    //    return $scope.items;
                    //}
                }
            });
        };
        //modalInstance.result.then(function (selectedItem) {
        //    $scope.selected = selectedItem;
        //}, function () {
        //    $log.info('Modal dismissed at: ' + new Date());
        //});
    }
]);