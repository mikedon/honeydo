/// <reference path="../_all.ts"/>

module honeydo {
	export interface NavbarCtrlScope extends ng.IScope {
        currentUser:ngCommonsUser.IUserService;
        events:NavbarCtrl;
        navbarForm:ng.IFormController;
        homeState:string;
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
            if($scope.currentUser.isLoggedIn()){
                $scope.homeState = "tasks";
            }else{
                $scope.homeState = "home";
            }
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