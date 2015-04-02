/// <reference path="_all.ts"/>

module honeydo {
    'use strict';
    var app = angular.module('honeydo', [
        'config',
        'templates-app',
        'ngResource', 
        'ngRoute', 
        'ui.bootstrap',
        'ng-commons',
        'ngMockE2E'
    ]);  
    
    app.config(["$routeProvider", "$tooltipProvider", "$httpProvider", 
    function($routeProvider: ng.route.IRouteProvider, $tooltipProvider : ng.ui.bootstrap.ITooltipProvider, $httpProvider: ng.IHttpProvider){
        //global options for tool tips
        $tooltipProvider.options({trigger: 'focus'});
        $httpProvider.defaults.withCredentials = true;

        $routeProvider.when('/home', {
            templateUrl:'home/home.tpl.html',
            resolve: {
                user: ['User', function(User: ngCommonsUser.IUserService): ng.IPromise<any> {
                    return User.initialize();
                }]
            }
        });
        $routeProvider.when('/task/search', {
            templateUrl: 'task/search.tpl.html',
            controller: 'TaskSearchCtrl',
            resolve: {
                user : ['User', function(User: ngCommonsUser.IUserService) : ng.IPromise<any> {
                    return User.initialize();
                }],
                tasks : ['data', function(data: ngCommonsResource.IDataService): ng.IPromise<any> {
                    return data.query("tasks");
                }]
            },
            access: {requiresLogin: true, role: "User"}
        });
        $routeProvider.when('/registration', {
            templateUrl:'registration/registration.tpl.html',
            controller: 'RegistrationCtrl',
            resolve: {
                spouses: ['data', function(data: ngCommonsResource.IDataService) : ng.IPromise<any>{
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
    function ($root: ngCommons.NgCommonsRootScope, $location: ng.ILocationService, $timeout: ng.ITimeoutService, User : ngCommonsUser.IUserService, api: ngCommonsResource.IApiService){
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
                    $root.alerts = [{type:ngCommons.AlertType.WARNING, message:'Please login first.'}];
                    $location.path("/login");
                }else if(!User.hasRole(currRoute.access.role)){
                    $location.path("/");
                }else if(currRoute.access.validate){
                    var validateResponse = currRoute.access.validate(currRoute.locals);
                    if(validateResponse){
                        $root.clearAlerts = false;
                        $root.alerts = [{type:ngCommons.AlertType.WARNING, message:validateResponse.msg}];
                        $location.path(validateResponse.path);
                    }
                }
            }
        });
    }]);

    export interface NavbarCtrlScope extends ng.IScope {
        currentUser:ngCommonsUser.IUserService;
        events:NavbarCtrl;
    }

    export class NavbarCtrl {
        public static $inject = [
            '$scope',
            'User',
            '$modal'
        ]
        constructor(private $scope: NavbarCtrlScope, private User : ngCommonsUser.IUserService, private $modal : ng.ui.bootstrap.IModalService){
            $scope.currentUser = User;
            $scope.events = this;
        }
        login() {
            this.User.login("task/search");
        }
        logout() {
            this.User.logout('home');
        }
        openCreateTaskModal() {
            var createTaskModalInstance = this.$modal.open({
                templateUrl: 'task/task-create-modal.tpl.html',
                controller: 'CreateTaskModalInstanceCtrl',
                resolve: {
                    //items: function () {
                    //    return $scope.items;
                    //}
                }
            });            
        }
    }
    app.controller('NavbarCtrl', NavbarCtrl);
}