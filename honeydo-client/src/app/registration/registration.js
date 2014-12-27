app.controller('RegistrationCtrl', ['$scope', '$rootScope', '$location', 'data', 'spouses',
    function($scope, $rootScope, $location, data, spouses){
        $scope.registration = {};
        $scope.spouses = spouses;
        $scope.register = function(){
            if($scope.registrationForm.$valid){
                var path = "task/search";
                if($rootScope.captureRedirect){
                    path = $rootScope.captureRedirect;
                }
                data.save("users", $scope.registration).then(function(data){
                    $rootScope.clearAlerts = false;
                    $location.path(path);
                });
            }else{
                $scope.registrationForm.submitted = true;
            }

        };
    }
]);