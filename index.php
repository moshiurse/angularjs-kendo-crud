<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Validation by AngularJs and kendo</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link href="app.css" rel="stylesheet"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.7.8/angular.min.js" integrity="sha256-23hi0Ag650tclABdGCdMNSjxvikytyQ44vYGo9HyOrU=" crossorigin="anonymous"></script>
    <script src="app.js"></script>
</head>
<body ng-app="myApp">
<div ng-controller="MainController">

<h1>{{greeting}}</h1>

<form name="userForm" method="POST" ng-submit="submitData(userForm.$valid)" novalidate="novalidate">
<div class="form-group" ng-class="{'has-error': true}">
    <label for="name">Name: </label>
    <input type="text" class="form-control" name="name" id="name" ng-required="true" 
    placeholder="Enter Name" ng-model="userData.name" ng-required="true"
    ng-maxlength="20" ng-pattern="/^[A-Za-z]+$/"
    ng-class="
    {'is-invalid': !userForm.name.$valid && (!userForm.name.$pristine || userForm.$submitted),
    'is-valid': userForm.name.$valid && (!userForm.name.$pristine || userForm.$submitted)}
    ">
    <div ng-if="!userForm.name.$pristine || userForm.$submitted">
      <span class="error" ng-show="userForm.name.$error.required">Name is required</span>
      <span ng-show="userForm.name.$error.maxlength" class="error">Name should be maximum 20 characters</span>
      <span class="error" ng-show="userForm.name.$error.pattern">Name should not contain any numbers</span> 
    </div>
  </div>

  <div class="form-group">
    <label for="email">Email: </label>
    <input type="text" class="form-control" id="email" name="email" placeholder="Enter Email" ng-model="userData.email"
    ng-required="true" ng-pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
    ng-class="
    {'is-invalid': !userForm.email.$valid && (!userForm.email.$pristine || userForm.$submitted),
    'is-valid': userForm.email.$valid && (!userForm.email.$pristine || userForm.$submitted)}
    ">
    <div ng-if="!userForm.email.$pristine || userForm.$submitted">
      <span class="error" ng-show="userForm.email.$error.required">Email is required</span>
      <span class="error" ng-show="userForm.email.$error.pattern">Email Must be a valid email<</span> 
    </div>
  </div>

  <div class="form-group">
    <label for="username">User Name: </label>
    <input type="text" class="form-control" id="username" name="username" placeholder="Enter User Name" ng-model="userData.username"
    ng-class="
    {'is-invalid': !userForm.username.$valid && (!userForm.username.$pristine || userForm.$submitted),
    'is-valid': userForm.username.$valid && (!userForm.username.$pristine || userForm.$submitted)}"
    ng-minlength="6" ng-maxlength="8" ng-required="true"
    ng-pattern="/^[a-zA-Z0-9äöüÄÖÜ]*$/">
    <div ng-if="!userForm.username.$pristine || userForm.$submitted">
      <span class="error" ng-show="userForm.username.$error.required">User Name is required</span>
      <span class="error" ng-show="userForm.username.$error.minlength">User Name Must be 6-8 characters</span>
      <span class="error" ng-show="userForm.username.$error.maxlength">User Name Must be 6-8 characters</span>
      <span class="error" ng-show="userForm.username.$error.pattern">Username should not contain any special character </span> 
    </div>
  </div>

  <div class="form-group">
    <label for="mobile">Mobile: </label>
    <input type="text" class="form-control" id="mobile" name="mobile" placeholder="Enter Mobile Number" ng-model="userData.mobile"
    ng-required="true"
    ng-class="
    {'is-invalid': !userForm.mobile.$valid && (!userForm.mobile.$pristine || userForm.$submitted),
    'is-valid': userForm.mobile.$valid && (!userForm.mobile.$pristine || userForm.$submitted)}"
    ng-pattern="/^(?:\+?88)?01[0-9]\d{8}$/">
    <div ng-if="!userForm.mobile.$pristine || userForm.$submitted">
      <span class="error" ng-show="userForm.mobile.$error.required">Mobile Number is required</span>
      <span class="error" ng-show="userForm.mobile.$error.pattern">Mobile number format should be like bangladeshi number</span> 
    </div>

  </div>
  <div class="form-group">
    <label for="address">Address: </label>
    <textarea class="form-control" id="address" name="address" rows="3" placeholder="Enter Address" ng-model="userData.address"
    ng-class="
    {'is-invalid': !userForm.address.$valid && (!userForm.address.$pristine || userForm.$submitted),
    'is-valid': userForm.address.$valid && (!userForm.address.$pristine || userForm.$submitted)}"
    ng-required="true" ng-minlength="10"></textarea>
    <div ng-if="!userForm.address.$pristine || userForm.$submitted">
      <span class="error" ng-show="userForm.address.$error.required">Address is required</span>
      <span class="error" ng-show="userForm.address.$error.minlength">Address contain minimum 10 characters</span> 
    </div>
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" class="form-control" id="password" name="password" placeholder="Enter Password" ng-model="userData.password"
    ng-minlength="8" ng-maxlength="15" ng-required="true"
    ng-class="
    {'is-invalid': !userForm.password.$valid && (!userForm.password.$pristine || userForm.$submitted),
    'is-valid': userForm.password.$valid && (!userForm.password.$pristine || userForm.$submitted)}"
    ng-pattern="/^(?!.*([A-Za-z0-9])\1{1})(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/">
    <div ng-if="!userForm.password.$pristine || userForm.$submitted">
      <span class="error" ng-show="userForm.password.$error.required">Password is required</span>
      <span class="error" ng-show="userForm.password.$error.minlength">Password contain minimum 8 characters</span> 
      <span class="error" ng-show="userForm.password.$error.maxlength">Password contain maximum 15 characters</span>
      <span class="error" ng-show="userForm.password.$error.pattern">Password contain at least 1 UpperCase,1 LowerCase, 1 Special Chars and 1 Numeric value</span> 
    </div>
  </div>

  <div class="form-group">
    <label for="file">Image: </label>
    <input type="file" class="form-control-file" id="file" name="file" ng-model="userData.file"
    ng-change="fileChange()">
  </div>

  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="remember">
    <label class="form-check-label" for="remember">Remember me</label>
  </div>
  <!-- <pre>{{userForm | json}}</pre> -->
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    
</div>

</body>
</html>
