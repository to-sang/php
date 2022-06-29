<!--<!DOCTYPE html>-->
<!--<html lang="en">-->
<!--<head>-->
<!--  <meta charset="UTF-8">-->
<!--  <meta http-equiv="X-UA-Compatible" content="IE=edge">-->
<!--  <meta name="viewport" content="width=device-width, initial-scale=1.0">-->
<!--  <title>Sign In</title>-->
<!--  <!-- Favicon -->-->
<!--  <link rel="shortcut icon" href="./img/svg/logo.svg" type="image/x-icon">-->
<!--  <!-- Custom styles -->-->
<!--  <link rel="stylesheet" href="./style.min.css">-->
<!--</head>-->
<!---->
<!--<body>-->
<!--  <div class="layer"></div>-->
<!--<main class="page-center" style="height: 80%;">-->
<!--  <article class="sign-up">-->
<!--    <h1 class="sign-up__title">Welcome back!</h1>-->
<!--    <p class="sign-up__subtitle">Sign in to your account to continue</p>-->
<!--    <form class="sign-up-form form" action="" method="">-->
<!--      <label class="form-label-wrapper">-->
<!--        <p class="form-label">Account</p>-->
<!--        <input class="form-input" type="email" id="email-login" placeholder="Enter your email" required>-->
<!--      </label>-->
<!--      <label class="form-label-wrapper">-->
<!--        <p class="form-label">Password</p>-->
<!--        <input class="form-input" type="password" id="password-login" placeholder="Enter your password" required>-->
<!--      </label>-->
<!--      <a class="link-info forget-link" href="signup.php">Do not have an account?</a>-->
<!--      <label class="form-checkbox-wrapper">-->
<!--        <input class="form-checkbox" type="checkbox" required>-->
<!--        <span class="form-checkbox-label">Remember me next time</span>-->
<!--      </label>-->
<!--      <button type="button" id="buttonClickLogin" onclick="handleLogin()"  class="form-btn primary-default-btn transparent-btn">Sign in</button>-->
<!---->
<!--    </form>-->
<!--  </article>-->
<!--</main>-->
<!--<!-- Chart library -->-->
<!--<!-- Custom scripts -->-->
<!--<script src="../js/login.js"></script>-->
<!--</body>-->
<!--</html>-->
<!---->
<?php
if (isset($_COOKIE["1"]))
    setcookie("1", null, -1, "/");
if (isset($_COOKIE["2"]))
    setcookie("2", null, -1, "/");
header("Location: ../../../layout/login.php");