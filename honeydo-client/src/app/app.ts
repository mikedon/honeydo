/// <reference path="_all.ts"/>

module honeydo {
    'use strict';
    var app = angular.module('honeydo', [
        'config',
        'templates-app',
        'ngResource', 
        'ui.router', 
        'ui.bootstrap',
        'ng-commons',
        'ngMockE2E'
    ]);

    app.config(["$stateProvider", "$urlRouterProvider", "$tooltipProvider", "$httpProvider", 
    function($stateProvider: ng.ui.IStateProvider, $urlRouterProvider : ng.ui.IUrlRouterProvider, $tooltipProvider : ng.ui.bootstrap.ITooltipProvider, $httpProvider: ng.IHttpProvider){
        //global options for tool tips
        $tooltipProvider.options({trigger: 'focus'});
        $httpProvider.defaults.withCredentials = true;

        $urlRouterProvider.otherwise("/home");
        $stateProvider.state("home",{
            views: {
                'navbar' : {
                    templateUrl: "common/navbar.tpl.html",
                    controller: "NavbarCtrl"
                },
                'main' : {
                    templateUrl: "home/home.tpl.html",
                }
            },
            url: "/home",            
            resolve: {
                user: ['User', function(User: ngCommonsUser.IUserService): ng.IPromise<any> {
                    return User.initialize();
                }]
            }
        });
        $stateProvider.state('tasks', {
            views: {
                'navbar' : {
                    templateUrl: "common/navbar.tpl.html",
                    controller: "NavbarCtrl"
                },
                'main' : {
                    templateUrl: "task/search.tpl.html",
                    controller: 'TaskSearchCtrl'
                }
            },
            url: "/task/search",
            resolve: {
                user : ['User', function(User: ngCommonsUser.IUserService) : ng.IPromise<any> {
                    return User.initialize();
                }],
                tasks : ['data', function(data: ngCommonsResource.IDataService): ng.IPromise<any> {
                    return data.query("tasks");
                }]
            },
            data: {
                requiresLogin : true,
                role: "User"
            }
        });
        $stateProvider.state('registration', {
            views: {
                'navbar' : {
                    templateUrl: "common/navbar.tpl.html",
                    controller: "NavbarCtrl"
                },
                'main' : {
                    templateUrl: "registration/registration.tpl.html",
                    controller: 'RegistrationCtrl'
                }  
            },
            url: "/registration",
            resolve: {
                spouses: ['data', function(data: ngCommonsResource.IDataService) : ng.IPromise<any>{
                    return data.query("spouses");
                }]
            }
        });
    }]);

    app.run(['$rootScope', '$state', '$timeout', 'User', 'api',
    function ($root: ngCommons.NgCommonsRootScope, $state: ng.ui.IStateService, $timeout: ng.ITimeoutService, User : ngCommonsUser.IUserService, api: ngCommonsResource.IApiService){
        api.add("tasks");
        api.add("spouses");
        api.add("users");

        $root.$on("$stateChangeStart", (event, next) => {
            $root.loadingView = true;
            if($root.clearAlerts){
                $root.alerts = [];
            }
            $root.clearAlerts = true;
        });
        $root.$on('$stateChangeSuccess', (event, next) => {
            if(next.data && next.data.requiresLogin && !User.isLoggedIn()){
                $root.captureRedirect = $state.current;
                $root.clearAlerts = false;
                $root.alerts = [{type:ngCommons.AlertType[ngCommons.AlertType.danger], message:'Please login first.'}];
                event.preventDefault();
                $state.go("home");       
            }else if(next.data && next.data.role && User.isLoggedIn() && !User.hasRole(next.data.role)){
                event.preventDefault();
                $state.go("home");
            }
            $root.loadingView = false;            
        });
    }]);
}