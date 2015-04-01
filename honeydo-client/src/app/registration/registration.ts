/// <reference path="../_all.ts"/>
module honeydo {
    'use strict';

    export interface RegistrationCtrlScope extends ng.IScope{
        registrationForm: ng.IFormController;
        registration: ngCommonsUser.User;
        spouses: Spouse[];
        events: RegistrationCtrl;
    }

    export class RegistrationCtrl {
        public static $inject = [
            '$scope',
            '$rootScope',
            '$location',
            'data',
            'spouses'
        ]
        constructor(private $scope: RegistrationCtrlScope, private $rootScope: ngCommons.NgCommonsRootScope, private $location: ng.ILocationService, private data : ngCommonsResource.IDataService, private spouses: Spouse[]){
            $scope.spouses = spouses;
            $scope.registration = {
                id: 0,
                username: "",
                firstName: "",
                password: "",
                roles : []
            }
            $scope.events = this;
        }
        register() {
            if(this.$scope.registrationForm.$valid){
                var path = "task/search";
                if(this.$rootScope.captureRedirect){
                    path = this.$rootScope.captureRedirect;
                }
                this.data.save("users", this.$scope.registration).then((data:any) => {
                    this.$rootScope.clearAlerts = false;
                    this.$location.path(path);
                });
            }else{
                this.$scope.registrationForm.$submitted = true;
            }
        }
    }

    angular.module('honeydo').controller('RegistrationCtrl', RegistrationCtrl);
}