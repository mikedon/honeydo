/// <reference path="../_all.ts"/>
module honeydo {
    'use strict';
    
    export interface TaskSearchCtrlScope extends ng.IScope{
        tasks:Task[];
        sortBy:SORT_BY;
    }

    export class TaskSearchCtrl {
        public static $inject = [
            '$scope',
            '$rootScope',
            '$location',
            'data',
            'tasks'
        ]
        constructor(private $scope: TaskSearchCtrlScope, private $rootScope : ngCommons.NgCommonsRootScope, private $location: ng.ILocationService, private data: ngCommonsResource.IDataService, private tasks : Task[]){
            $scope.tasks = tasks;
            $scope.$on('task.create', (event: any, task: Task) => {
                this.$scope.tasks.push(task);
            });
            //$scope.sortByOptions = SORT_BY;
            $scope.sortBy = SORT_BY.DUE_DATE;
        }
        sort(sortBy:string){
            this.$scope.sortBy = SORT_BY[sortBy];
        }
        deleteTask(task:honeydo.Task){
            var idToDelete = task.id;
            var indexOf;
            this.data.remove('tasks', task).then(() => {
                for(var i=0; i < this.$scope.tasks.length; i++){
                    if(this.$scope.tasks[i].id === idToDelete){
                        indexOf = i;
                        break;
                    }
                }
                this.$scope.tasks.splice(indexOf,1);
            });
        }
        complete(task:honeydo.Task) {

        }
    }
    angular.module('honeydo').controller('TaskSearchCtrl', TaskSearchCtrl);

    export interface CreateTaskModalScope extends ng.IScope {
        task: Task;
        opened: boolean;
    }

    export class CreateTaskModalInstanceCtrl{
        public static $inject = [
            '$scope',
            '$rootScope',
            '$modalInstance',
            'data'
        ];
        constructor(private $scope: CreateTaskModalScope, private $rootScope: ng.IRootScopeService, private $modalInstance: ng.ui.bootstrap.IModalServiceInstance, private data: ngCommonsResource.IDataService){
            // $scope.priorities = honeydo.TASK_PRIORITY;
            $scope.task = {
                dueDate: 0,
                name: "",
                id: 0
            };
        }
        cancel() {
            this.$modalInstance.dismiss('cancel');
        }
        open($event: JQueryEventObject) {
            $event.preventDefault();
            $event.stopPropagation();
            this.$scope.opened = true;
        }
        create() {
            this.data.save("tasks", this.$scope.task).then((data: Task) => {
                this.$rootScope.$emit('task.create', data);
                this.$modalInstance.close();
            });
        }
    }
    angular.module('honeydo').controller('CreateTaskModalInstanceCtrl', CreateTaskModalInstanceCtrl);
}
