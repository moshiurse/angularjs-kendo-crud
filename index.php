<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Validation by AngularJs and kendo</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<body>

<h1>Form Validation by AngularJs</h1>

<form>
<div class="form-group">
    <label for="name">Name: </label>
    <input type="text" class="form-control" id="name" placeholder="Enter Name">
  </div>
  <div class="form-group">
    <label for="email">Email: </label>
    <input type="text" class="form-control" id="email" placeholder="Enter Email">
  </div>
  <div class="form-group">
    <label for="username">User Name: </label>
    <input type="text" class="form-control" id="username" placeholder="Enter User Name">
  </div>
  <div class="form-group">
    <label for="address">Address: </label>
    <textarea class="form-control" id="address" rows="3"></textarea>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" class="form-control" id="password" placeholder="Enter Password">
  </div>
  <div class="form-group">
    <label for="exampleFormControlFile1">Image: </label>
    <input type="file" class="form-control-file" id="exampleFormControlFile1">
  </div>

  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="remember">
    <label class="form-check-label" for="remember">Remember me</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    
</body>
</html>
