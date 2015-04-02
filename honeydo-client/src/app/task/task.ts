/// <reference path="../_all.ts"/>
module honeydo {
    'use strict';
    
    export interface TaskSearchCtrlScope extends ng.IScope{
        tasks:Task[];
        sortBy:Object;
        sortByOptions:Object[];
        events:TaskSearchCtrl;
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
            $scope.sortByOptions = [
                {
                    name: "Due Date",
                    value: "dueDate"
                },
                {
                    name: "Priority",
                    value: "priority"
                },
                {
                    name: "Name",
                    value: "name"
                }

            ]
            $scope.sortBy = $scope.sortByOptions[0];
            $scope.events = this;
        }
        sort(sortBy:Object){
            this.$scope.sortBy = sortBy;
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
        events:CreateTaskModalInstanceCtrl;
        priorities:Object[];
    }

    export class CreateTaskModalInstanceCtrl{
        public static $inject = [
            '$scope',
            '$rootScope',
            '$modalInstance',
            'data'
        ];
        constructor(private $scope: CreateTaskModalScope, private $rootScope: ng.IRootScopeService, private $modalInstance: ng.ui.bootstrap.IModalServiceInstance, private data: ngCommonsResource.IDataService){
            $scope.priorities = [
                {
                    name: "Critical",
                    value: 1
                },
                {
                    name: "High",
                    value: 2
                },
                {
                    name: "Medium",
                    value: 3
                },
                {
                    name: "Low",
                    value: 4
                }
            ];
            $scope.task = {
                dueDate: Date.now(),
                name: null,
                id: null,
                priority: TASK_PRIORITY.MEDIUM
            };
            $scope.events = this;
            $scope.opened = false;
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
