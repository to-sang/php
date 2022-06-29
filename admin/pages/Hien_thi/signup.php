<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title> Sign Up</title>
  <!-- Favicon -->
  <!-- Custom styles -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

  <link rel="stylesheet" href="./style.min.css">
  <link rel="stylesheet" href="../Hien_thi/SignUp.css">
</head>

<body>
<?php
require_once ("../../../php/checkroleadmin.php");
require_once ("../../../php/dbconnection.php");
$sql = "SELECT * FROM nguoidung WHERE idNguoiDung=".$_COOKIE['1'];
$result=$conn->query($sql);
$row = $result->fetch_assoc();
?>
<main class="">
  <div class="sign-up">
    <h1 class="sign-up__title">Get started</h1>
    <form class="sign-up-form form" action="" method="">
      <div class="content">
        <h4 style="text-align: center; margin-bottom: 30px;">YOUR INFORMATION</h4>
        <div class="row-item">
          <div class="col-item">
            <div class="col1-item-title">
              <span>First name:</span>
            </div>
            <div class="col1-item-content">
              <input type="text" id="user-preName-in-changeInf" name="preName" path="" Placeholder="First name">
            </div>
          </div>
          <div class="col-item">
            <div class="col2-item-title">
              <span>Name:</span>
            </div>
            <div class="col2-item-content">
              <input type="text" id="user-name-in-changeInf" name="name" path="" Placeholder="Name">
            </div>
          </div>

        </div>
        <hr>
        <div class="row-item">
          <div class="col-item">
            <div class="col1-item-title">
              <span>Age:</span>
            </div>
            <div class="col1-item-content">
              <input type="text" id="user-age-in-changeInf" name="age" path="" Placeholder=" Age"></input>
            </div>
          </div>
          <div class="col-item">
            <div class="col2-item-title">
              <span>BirthDay:</span>
            </div>
            <div class="col2-item-content">
              <input type="text" id="user-birthday-in-changeInf" name="birthday" path="" Placeholder=" BirthDay"></input>
            </div>
          </div>

        </div>
        <hr>
        <div class="row-item">
          <div class="col-item">
            <div class="col1-item-title">
              <span>Address:</span>
            </div>
            <div class="col1-item-content">
              <input type="text" id="user-address-in-changeInf" name="address" path="" Placeholder=" Address"></input>
            </div>
          </div>
          <div class="col-item">
            <div class="col2-item-title">
              <span>Phone Number:</span>
            </div>
            <div class="col2-item-content">
              <input type="text" id="user-phoneNumber-in-changeInf" name="phoneNumber" path="" Placeholder=" Phone Number"></input>
            </div>
          </div>

        </div>
        <hr>
        <div class="row-item">
          <div class="col-item">
            <div class="col1-item-title">
              <span>Account:</span>
            </div>
            <div class="col1-item-content">
              <input type="text" id="user-account-in-changeInf" name="account" path="" Placeholder=" Account"></input>
            </div>
          </div>
          <div class="col-item">
            <div class="col2-item-title">
              <span>Password:</span>
            </div>
            <div class="col2-item-content">
              <input type="password" id="user-password-in-change" name="password" path="" Placeholder=" Password"></input>
            </div>
          </div>
        </div>
        <hr>
        <div class="row-item pt-2">
          <button type="button" id="change-information" onclick="clickButtonSaveCreate()" style="padding: 6px 30px;" onclick="clickButtonSaveEditInf()" class="btn btn-primary">Save</button>
        </div>
      </div>      
      <div class="back-to-login mt-2" style="padding: 0px 18px;">
        <a href="login.php" style="color:rgb(21, 119, 246); text-decoration: underline;">Back</a>
      </div>
    </form>
  </div>
</main>
<!-- Chart library -->

<!-- Custom scripts -->
<script src="../js/SignUp.js"></script>
</body>

</html>