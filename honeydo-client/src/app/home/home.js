app.controller('HomeCtrl', ['$scope', '$rootScope', '$location', 'User', 'HoneyDoResource',
    function($scope, $rootScope, $location, User, HoneyDoResource){
        $scope.currentUser = User;
        $scope.tasks = HoneyDoResource.getTasks();

        $scope.sortByOptions = ["dueDate", "name", "priority"];
        $scope.sortBy = $scope.sortByOptions[0];
        $scope.sort = function(sortBy){
            $scope.sortBy = sortBy;
        };
        $rootScope.$on('task.create', function(event, task){
            $scope.tasks.push(task);
        });
    }
]);