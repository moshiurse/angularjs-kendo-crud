var myApp = angular.module('myApp', ['kendo.directives']);

myApp.controller("MainController", function ($scope, $element, $http) {
    $scope.greeting = "Form Validation by AngularJs";
    $scope.msg = "";
    $scope.record = 0;
    // Error msg for email and username
    $scope.usercheck = "";
    $scope.emailcheck = "";
    // valid or invalid check for email and username
    $scope.isErrorUsername = true;
    $scope.isErrorEmail = true;

    // Form submit function
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
        count = 0;
        $("#mainGridOptions").data("kendoGrid").dataSource.read();

    };

    // File Upload kendo

    $("#image").kendoUpload({
        async: {
            saveUrl: "http://localhost/angularjs-practice/backend/api/user/upload.php",
            removeUrl: "remove",
            autoUpload: true
        },
        complete: onComplete,
        remove: onRemove,
        select: onSelect,
        success: onSuccess,
        upload: onUpload,
        multiple: false,
        validation: {
            allowedExtensions: [".jpg", ".png", ".gif"],
            maxFileSize: 300000
        }
    });

    function onSelect(e) {
        console.log("Select :: " + getFileInfo(e));
    }

    function onUpload(e) {
        console.log("uploading............");
    }

    function onSuccess(e) {
        console.log("Success (" + e.operation + ") :: " + getFileInfo(e));
    }

    function onError(e) {
        console.log("Error (" + e.operation + ") :: " + getFileInfo(e));
    }

    function onComplete(e) {
        console.log("Complete");
    }

    function onRemove(e) {
        console.log("Remove :: " + getFileInfo(e));
    }

    function onProgress(e) {
        console.log("Upload progress :: " + e.percentComplete + "% :: " + getFileInfo(e));
    }

    function getFileInfo(e) {
        return $.map(e.files, function(file) {
            var info = file.name;

            // File size is not available in all browsers
            if (file.size > 0) {
                info  += " (" + Math.ceil(file.size / 1024) + " KB)";
            }
            return info;
        }).join(", ");
    }

    // insert Function using rest api
    $scope.insertUser = function(user){
        $http({
            method: 'POST',
            url: 'http://localhost/angularjs-practice/backend/api/user/create.php',
            data: user
          }).then(function successCallback(response) {
            $scope.userData = {};//after insert clear the scope
            $scope.msg = response.data.msg; //showing msg
            $scope.userForm.$setPrestine = true;
            show_success_msg(response.data.msg);
            $("#mainGridOptions").data("kendoGrid").dataSource.read();
            }, function errorCallback(response) {
                $scope.msg = "User Failed to create"; //display error msg
                show_err_msg($scope.msg);
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
            show_success_msg(response.data.msg);
            $("#mainGridOptions").data("kendoGrid").dataSource.read();
            // $scope.userData.user_id = '';
            }, function errorCallback(response) {
                $scope.msg = "User Failed to update";
                show_err_msg($scope.msg);
            });
    };

    // delete function for delete user
    $scope.deleteUser = function(id){

        kendo.confirm("Are you sure that you want to proceed?").then(function () {
            $http({
                method: 'DELETE',
                url: 'http://localhost/angularjs-practice/backend/api/user/delete.php',
                data: {user_id: id}
              }).then(function successCallback(response) {
                $scope.msg = response.data.msg;
                show_err_msg(response.data.msg);
                count = 0;
                $("#mainGridOptions").data("kendoGrid").dataSource.read();
                }, function errorCallback(response) {
                    $scope.msg = response.data.msg;
                });
        }, function () {
            kendo.alert("User not Deleted.");
        });
    };
    $scope.closeUserWindow = function(){
        var wdw = $("#userWindow").data("kendoWindow"); //get the Window widget's instance
        wdw.close();
    }

    $scope.openUserDlg = function () {
        $scope.resetUser();
        var wdw = $("#userWindow").data("kendoWindow"); //get the Window widget's instance
        wdw.open().center();
    }

    // edit button action
    $scope.editUser = function (user) {
        $scope.userData = user; // set the value of all input to selected user
        var wdw = $("#userWindow").data("kendoWindow"); //get the Window widget's instance
        wdw.open().center();
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
                }, function errorCallback(response) {
                    $scope.msg = response.data.msg;
                });
        }{
            $scope.emailcheck = "";// if invalid then set msg 
        }
        
    }

    // $scope.fileChange = function (e) {
    //     $scope.userData.image = e.files[0].name;
    //     console.log($scope.userData.name);
    // };

    // global count variable for counting row in grid
    var count = 0;
    // KendoGrid properties
    $scope.mainGridOptions = {
        dataSource: {
            type: "json", //datatype we get
            transport: {
                read: "http://localhost/angularjs-practice/backend/api/user/read.php" //url source for data 
            },
            schema: {
                total: function(response) {
                    return response.total; // Get Total Data
                  },
                data: function(response) {
                  return response.data; // Get the grid data
                }
              }, 
            pageSize: 10,
            serverPaging: true,
            serverSorting: true
        },
        sortable: true, 
        pageable: {
            refresh: true
        },
        //columns 
        columns: [
            {
            title: "",
            template: function(dataItem){ //custom template for column data
                count++;
                return count;
            },
            width: "5%"
            },
            {
            field: "name",
            title: "Name",
            width: "20%"
            },
            {
            field: "username",
            title: "User Name",
            width: "15%"
            },
            {
            field: "email",
            width: "20%"
            },
            {
            field: "mobile",
            width: "15%"
            },
            {
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
        }],
        height: 700
    };
    
})

// myApp.directive("fileUpload", function ($parse) {
//     return {
//         link: function ($scope, element, attrs) {
//             element.on('change', function (event) {
//                 var files = event.target.files;
//                 $parse(attrs.fileUpload).assign($scope, element[0].files);
//                 $scope.apply();
//                 console.log('formdata',formData);
//             }); 
//         }
//     }
// })

// $scope.uploadFile = function () {
//     var formData = new FormData();
//     angular.forEach($scope.files, function(file){
//         formData.append('file', file);
//     });

//     $http.post('upload.php', formData, 
//     {
//         transformRequest: angular.identity,
//         headers: {'Content-Type' : undefined, 'Process-Data': false}
//     }).success(function(response){

//     })
// }

// Custom directive for validation of file
// myApp.directive('extension', function (){ 
//     var validFormats = ['jpg', 'png', 'gif']; //format available
//     var validSize = 300000; //highest size to upload data
//     return {
//        require: 'ngModel',
//        link: function(scope, elem, attr, ngModel) {
//                 console.log('attr', attr);
//            ngModel.$validators.extension = function () {
//                elem.on('change', function (file) {
//                    var value = elem.val();
//                 //    set view value 
//                 // scope.userData.file_name = elem[0].files[0].name;
//                     ngModel.$setViewValue(elem[0].files[0].size);
//                     ngModel.$render();
//                 //    ngModel.$render();
//                    var size = elem[0].files[0].size;
//                    var ext = value.substring(value.lastIndexOf('.') + 1).toLowerCase(); 
//                    if(!ngModel.$viewValue){
//                        return  false;
//                    }
//                    else if(validFormats.indexOf(ext) == -1){     
//                     console.log('ext');           
//                         scope.userForm.file.$error.extension = true;
//                         scope.$apply();
//                         return  false;
//                    } else if(size > validSize){ 
//                         delete scope.userForm.file.$error.extension;
//                         scope.userForm.file.$error.validsize = true;
//                         scope.$apply();
//                         return  false;
//                    }else{ 
//                         ngModel.$setViewValue(elem[0].files[0].name);
//                         ngModel.$render();
//                         scope.userForm.file.$error.validsize = false;
//                         scope.userForm.file.$error.extension = false;
//                         delete scope.userForm.file.$error.validsize;
//                         delete scope.userForm.file.$error.extension;
//                         scope.userForm.file.$valid = true;
//                         scope.userForm.file.$invalid = false;
//                         scope.$apply();
//                         return true;
//                    }
//                })
//            }
//        }

//     };
//  });

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

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "preventDuplicates": false,
    "positionClass": "toast-bottom-right",
    "onclick": null,
    "showDuration": "5000",
    "hideDuration": "1000",
    "timeOut": 5000,
    "extendedTimeOut": 0,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
    "tapToDismiss": false
};
function show_success_msg(msg) {
    toastr.options.positionClass = "toast-bottom-right";
    toastr.options.progressBar = true;
    toastr.options.timeOut = 2000;
    toastr.success(msg);
}
function show_err_msg(msg) {
    toastr.options.positionClass = "toast-bottom-right";
    toastr.options.timeOut = 3000;
    toastr.error(msg);
}