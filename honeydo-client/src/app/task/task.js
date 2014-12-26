app.controller('TaskSearchCtrl', ['$scope', '$rootScope', '$location', 'data', 'tasks',
    function($scope, $rootScope, $location, data, tasks){
        $scope.tasks = tasks;
        $scope.sort = function(sortBy){
            $scope.sortBy = sortBy;
        };
        $scope.deleteTask = function(task){
            var idToDelete = task.id;
            var indexOf;
            data.remove('tasks', task).then(function(){
                for(var i=0; i < $scope.tasks.length; i++){
                    if($scope.tasks[i].id === idToDelete){
                        indexOf = i;
                        break;
                    }
                }
                $scope.tasks.splice(indexOf,1);
            });
        };
        $scope.complete = function(task){

        };
        $rootScope.$on('task.create', function(event, task){
            $scope.tasks.push(task);
        });
        $scope.sortByOptions = ["dueDate", "name", "priority"];
        $scope.sortBy = $scope.sortByOptions[0];
    }
]);