app.controller('HomeCtrl', ['$scope', '$rootScope', '$location', 'User', 'Task',
    function($scope, $rootScope, $location, User, Task){
        $scope.currentUser = User;
        $scope.tasks = Task.query();
        $scope.sort = function(sortBy){
            $scope.sortBy = sortBy;
        };
        $scope.deleteTask = function(task){
            var idToDelete = task.id;
            var indexOf;
            task = new Task({"id" : task.id});
            task.$delete(function(){
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