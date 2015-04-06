/// <reference path="../_all.ts"/>

module honeydo {
	export interface NavbarCtrlScope extends ng.IScope {
        currentUser:ngCommonsUser.IUserService;
        events:NavbarCtrl;
        navbarForm:ng.IFormController;
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
        	this.$scope.currentUser.login("tasks");          
        }
        logout() {
            this.$scope.currentUser.logout('home');
        }
        openCreateTaskModal() {
            var createTaskModalInstance = this.$modal.open({
                templateUrl: 'task/task-create-modal.tpl.html',
                controller: 'CreateTaskModalInstanceCtrl'
            });            
        }
    }
    angular.module('honeydo').controller('NavbarCtrl', NavbarCtrl);
}