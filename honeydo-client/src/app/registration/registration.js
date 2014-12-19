app.controller('RegistrationCtrl', ['$scope', '$rootScope', 'HoneyDoResource',
    function($scope, $rootScope, HoneyDoResource){
        $scope.registration = {};
        $scope.register = function(){
            if($scope.registrationForm.$valid){
                var path = "home";
                if($rootScope.captureRedirect){
                    path = $rootScope.captureRedirect;
                }
                HoneyDoResource.register($scope.registration, path);
            }else{
                $scope.registrationForm.submitted = true;
            }

        };
    }
]);