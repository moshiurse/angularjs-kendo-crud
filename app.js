var myApp = angular.module('myApp', []);

myApp.controller("MainController", function ($scope, $http) {
    $scope.greeting = "Form Validation by AngularJs";
    $scope.msg = "";
    // $scope.userData.name = "Hello";
    
    $scope.showUsers = function () {
        
        $http({
            method: 'GET',
            url: 'http://localhost/angularjs-practice/backend/api/user/read.php'
        }).then(function successCallback(response) {
            if(response.data.length <1){
                $scope.msg = "No User Found!!";
            }else{
                $scope.userDatas = response.data;
            }
        }, function errorCallback(response) {
            
        });

    };

    $scope.showUsers();
    

    $scope.submitData = function () {
        

        // if(valid){
        //     console.log($scope.userData);  
        // }else{
        //     console.log("Form is not valid!");  
        //     console.log($scope.userData);  
        // }
        alert($scope.userData.user_id)

        if($scope.userData.user_id){
            $scope.updateUser($scope.userData);
        }else{
            $scope.insertUser($scope.userData);
        }

        $scope.showUsers();

    };

    $scope.insertUser = function(user){
        $http({
            method: 'POST',
            url: 'http://localhost/angularjs-practice/backend/api/user/create.php',
            data: user
          }).then(function successCallback(response) {
            $scope.userData = {};
            $scope.msg = response.data.msg;
            }, function errorCallback(response) {
                $scope.msg = "User Failed to create";
            });
    };

    $scope.updateUser = function(user){
        $http({
            method: 'PUT',
            url: 'http://localhost/angularjs-practice/backend/api/user/update.php',
            data: user
          }).then(function successCallback(response) {
            $scope.msg = response.data.msg;
            $scope.userData = {};
            $scope.userData.user_id = '';
            }, function errorCallback(response) {
                $scope.msg = "User Failed to update";
            });
    };

    $scope.deleteUser = function(id){
        $http({
            method: 'DELETE',

            url: 'http://localhost/angularjs-practice/backend/api/user/delete.php',
            data: {user_id: id}
          }).then(function successCallback(response) {
            $scope.msg = response.data.msg;
            $scope.showUsers();
            }, function errorCallback(response) {
                $scope.msg = response.data.msg;
            });
    };

    $scope.editUser = function (user) {
        $scope.userData = user;
    }

    $scope.resetUser = function (user) {
        $scope.userData = {};
        $scope.$applyAsync();
    }

    $scope.fileChange = function () {
        alert("File");
    };
    
})

myApp.directive('extension', function (){ 
    var validFormats = ['jpg', 'png', 'gif'];
    var validSize = 300000;
    return {
       require: 'ngModel',
       link: function(scope, elem, attr, ngModel) {
                console.log('attr', attr);
           ngModel.$validators.extension = function () {
               elem.on('change', function (file) {
                   var value = elem.val();
                //    set view value 
                // scope.userData.file_name = elem[0].files[0].name;
                    ngModel.$setViewValue(elem[0].files[0].size);
                    ngModel.$render();
                //    ngModel.$render();
                   var size = elem[0].files[0].size;
                   var ext = value.substring(value.lastIndexOf('.') + 1).toLowerCase(); 
                   if(!ngModel.$viewValue){
                       return  false;
                   }
                   else if(validFormats.indexOf(ext) == -1){     
                    console.log('ext');           
                        scope.userForm.file.$error.extension = true;
                        scope.$apply();
                        return  false;
                   } else if(size > validSize){ 
                        delete scope.userForm.file.$error.extension;
                        scope.userForm.file.$error.validsize = true;
                        scope.$apply();
                        return  false;
                   }else{ 
                        ngModel.$setViewValue(elem[0].files[0].name);
                        ngModel.$render();
                        scope.userForm.file.$error.validsize = false;
                        scope.userForm.file.$error.extension = false;
                        delete scope.userForm.file.$error.validsize;
                        delete scope.userForm.file.$error.extension;
                        scope.userForm.file.$valid = true;
                        scope.userForm.file.$invalid = false;
                        scope.$apply();
                        return true;
                   }
               })
           }
       }

    };
 });

//  myApp.directive('validsize', function (){ 
//     var validSize = 300000;
//     return {
//        require: 'ngModel',
//        link: function(scope, elem, attr, ngModel) {

//            ngModel.$validators.validsize = function () {
//                elem.on('change', function (file) {
//                    var size = elem[0].files[0].size;
//                    if(size < validSize){
//                         return true;
//                    } else{
//                         return false;
//                    }
//                })
//            }
           
//        }
//     };
//  });