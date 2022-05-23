<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="../css/login.css">
</head>
<body>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    require_once("../php/dbconnection.php");
    $usn = $_POST["uname"];
    $paw = $_POST["psw"];
    $sql = "SELECT idNguoiDung, idQuyen FROM nguoidung WHERE taiKhoan = '"
        .$usn."' AND matKhau = '".$paw."'";
    $result = $conn->query($sql);
    $bug = false;
    if ($result->num_rows == 0)
        $bug = true;
    else
    {
        $bug = false;
        $row = $result->fetch_assoc();
        $conn->close();
        $ccname = $row["idQuyen"];
        $ccvalue = $row["idNguoiDung"];
        if (isset($_COOKIE["1"]))
            setcookie("1", null, -1, "/");
        if (isset($_COOKIE["2"]))
            setcookie("2", null, -1, "/");
        setcookie($ccname, $ccvalue, time() + 21600, "/");
        if ($ccname == "2")
            header("Location: inf.php");
        else
            header("Location: ../admin/pages/Hien_thi/home.php");
        exit();
    }
}
?>
    <form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" class="form-login">
        <div class="imgcontainer">
          <img src="img_avatar2.png" alt="Avatar" class="avatar">
        </div>
      
        <div class="container">
          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="uname" required>
      
          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required>
          <button type="submit">Login</button>
          <label>
            <input type="checkbox" checked="checked" name="remember"> Remember me
          </label>
        </div>
        <?php
        if (isset($bug))
            if ($bug)
                echo "<p style=\"color: red\">Tài khoản hoặc mật khẩu không chính xác</p>";
        ?>
        <div class="container" style="background-color:#f1f1f1">
          <button type="button" class="cancelbtn">Cancel</button>
          <span class="psw">Forgot <a href="#">password?</a></span>
        </div>
      </form>
</body>
</html>