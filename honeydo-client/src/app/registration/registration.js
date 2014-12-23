app.controller('RegistrationCtrl', ['$scope', '$rootScope', 'HoneyDoResource', 'spouses',
    function($scope, $rootScope, HoneyDoResource, spouses){
        $scope.registration = {};
        $scope.spouses = spouses;
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