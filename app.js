var myApp = angular.module('myApp', []);

myApp.controller("MainController", function ($scope, $http) {
    $scope.greeting = "Form Validation by AngularJs";
    $scope.userData = {};
    $scope.submitData = function (valid) {

        if(valid){
            console.log($scope.userData);  
        }else{
            console.log("Form is not valid!");  
            console.log($scope.userData);  
        }
      
    };

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
                        scope.userForm.file.$error.extension = true;
                        scope.$apply();
                        return  false;
                   } else if(size > validSize){
                        scope.userForm.file.$error.validsize = true;
                        scope.$apply();
                        return  false;
                   }else{
                        ngModel.$setViewValue(elem[0].files[0].name);
                        ngModel.$render();
                        scope.userForm.file.$error.validsize = false;
                        scope.userForm.file.$error.extension = false;
                        // delete scope.userForm.file.$error.validsize;
                        // delete scope.userForm.file.$error.extension;
                        // scope.userForm.file.$valid = true;
                        // scope.userForm.file.$invalid = false;
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