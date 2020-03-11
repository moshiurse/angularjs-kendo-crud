var myApp = angular.module('myApp', ['kendo.directives']);

myApp.controller("MainController", function ($scope, $http) {
    $scope.greeting = "Form Validation by AngularJs";
    $scope.msg = "";
    $scope.record = 0;
    // Error msg for email and username
    $scope.usercheck = "";
    $scope.emailcheck = "";
    // valid or invalid check for email and username
    $scope.isErrorUsername = true;
    $scope.isErrorEmail = true;
    
    var user = [];
    // Show Users list using api
    $scope.showUsers = function () {
        
        $http({
            method: 'GET',
            url: 'http://localhost/angularjs-practice/backend/api/user/read.php'
        }).then(function successCallback(response) {
            if(response.data.length <1){
                $scope.msg = "No User Found!!";
            }else{
                $scope.userDatas = response.data;
                user = response.data;
            }
        }, function errorCallback(response) {
            
        });

    };

    // Called showUser for always showing users list
    $scope.showUsers();
    
    // Form submit functiom
    $scope.submitData = function () {
        

        // if(valid){
        //     console.log($scope.userData);  
        // }else{
        //     console.log("Form is not valid!");  
        //     console.log($scope.userData);  
        // }

        // Check for either insert or update
        if($scope.userData.user_id){
            $scope.updateUser($scope.userData);
        }else{
            $scope.insertUser($scope.userData);
        }
        // Update user data after insert or update
        $scope.showUsers();

    };

    // insert Function using rest api
    $scope.insertUser = function(user){
        $http({
            method: 'POST',
            url: 'http://localhost/angularjs-practice/backend/api/user/create.php',
            data: user
          }).then(function successCallback(response) {
            $scope.userData = {};//after insert clear the scope
            $scope.msg = response.data.msg; //showing msg
            }, function errorCallback(response) {
                $scope.msg = "User Failed to create"; //display error msg
            });
    };

        // update Function using rest api
    $scope.updateUser = function(user){
        $http({
            method: 'PUT',
            url: 'http://localhost/angularjs-practice/backend/api/user/update.php',
            data: user
          }).then(function successCallback(response) {
            $scope.msg = response.data.msg;
            $scope.userData = {};
            // $scope.userData.user_id = '';
            }, function errorCallback(response) {
                $scope.msg = "User Failed to update";
            });
    };

    // delete function for delete user
    $scope.deleteUser = function(id){
        $http({
            method: 'DELETE',

            url: 'http://localhost/angularjs-practice/backend/api/user/delete.php',
            data: {user_id: id}
          }).then(function successCallback(response) {
            $scope.msg = response.data.msg;
            $scope.showUsers(); //update user data after delete
            }, function errorCallback(response) {
                $scope.msg = response.data.msg;
            });
    };

    // edit button action
    $scope.editUser = function (user) {
        $scope.userData = user; // set the value of all input to selected user
    }

    // reset the form
    $scope.resetUser = function (user) {
        $scope.userData = {};
        $scope.$applyAsync();
    }

    // check if username exists or not using api
    $scope.usernameExists = function(){
        // check if input field valid
        if($scope.userForm.username.$valid){
            $http({
                method: 'POST',
                url: 'http://localhost/angularjs-practice/backend/api/user/unameavail.php',
                data: {username: $scope.userData.username}
              }).then(function successCallback(response) {
                $scope.isErrorUsername = response.data.error; //set valid/invalid boolean
                if($scope.isErrorUsername){
                    $scope.userForm.username.$valid = false;
                }else{
                    $scope.userForm.username.$valid = true;
                }
                $scope.usercheck = response.data.msg; //set msg
                }, function errorCallback(response) {
                    $scope.msg = response.data.msg;
                });
        }else{
            $scope.usercheck = ""; // if invalid then set msg ""
        }
        
    }

    // Check if email exists or not using api
    $scope.emailExists = function(){
        if($scope.userForm.email.$valid){
            $http({
                method: 'POST',
                url: 'http://localhost/angularjs-practice/backend/api/user/emailavail.php',
                data: {email: $scope.userData.email}
              }).then(function successCallback(response) {
                $scope.isErrorEmail = response.data.error; //set valid/invalid boolean
                if($scope.isErrorEmail){
                    $scope.email.username.$valid = false;
                }else{
                    $scope.email.username.$valid = true;
                }
                $scope.emailcheck = response.data.msg; //set msg
                $scope.showUsers();
                }, function errorCallback(response) {
                    $scope.msg = response.data.msg;
                });
        }{
            $scope.emailcheck = "";// if invalid then set msg ""
        }
        
    }

    $scope.fileChange = function () {
        alert("File");
    };

    $scope.mainGridOptions = {
        dataSource: {
            
            transport: {
                read: "http://localhost/angularjs-practice/backend/api/user/read.php",
                type: "json"
            },
                
            pageSize: 10,
            serverPaging: true,
            serverSorting: true
        },
        sortable: true,
        pageable: true,
        
        columns: [
          {
            field: "name",
            title: "Name",
            width: "20%"
            },{
            field: "username",
            title: "User Name",
            width: "15%"
            },{
            field: "email",
            width: "20%"
            },{
            field: "mobile",
            width: "15%"
            },{
            field: "address",
            width: "20%"
        },
        {
            title: "Action",
            width: "15%",
            template: function(dataItem) {
                return '<a href="#" ng-click="editUser(dataItem)"><i class="fa fa-lg fa-pencil-square-o" style="color:darkblue;" aria-hidden="true"></i></a>&nbsp;&nbsp;<a href="#" ng-click="deleteUser(dataItem.user_id)"><i class="fa fa-lg fa-trash-o" style="color:darkred;" aria-hidden="true"></i></a>';
              }
            // template: 
        }]
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