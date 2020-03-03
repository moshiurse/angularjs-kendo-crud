var myApp = angular.module('myApp', []);

myApp.controller("MainController", function ($scope, $http) {
    $scope.greeting = "Form Validation by AngularJs";

    $scope.submitData = function (valid) {

        if(valid){
            console.log($scope.userData);  

            // $http.post('https//www.someUrl.com/register', $scope.userData)
            // .success(function (data) {
            //     console.log('Submitted');
            // })
            // .error(function (error) {
            //    console.log("Error occured!"); 
            // })
        }else{
            console.log("Form is not valid!");  
        }
      
    };

    $scope.fileChange = function () {
        alert("File");
    };
    
})