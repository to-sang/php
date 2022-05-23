<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Member</title>
    <!-- Google Font: Source Sans Pro -->
    <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback"
    />
    <!-- Font Awesome -->
    <!-- <link rel="stylesheet" href="../../plugins/fontawesome-free/css/all.min.css"> -->
    <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
            integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
    />
    <!-- Theme style -->
    <link
            href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-bs4.css"
            rel="stylesheet"
    />
    <!-- summernote -->
    <link rel="stylesheet" href="../../dist/css/adminlte.min.css" />
    <link rel="stylesheet" href="../../dist/css/them.css" />
    <link rel="stylesheet" href="../../dist/css/jquery-ui.min.css" />
    <link rel="stylesheet" href="../css/member.css" />
</head>
<body>
<?php
require_once "../php/checkroleuser.php";
require_once "../php/dbconnection.php";
$sql = "SELECT hoTen FROM nguoidung WHERE idNguoiDung = '".$_COOKIE["2"]."'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$sql = "SELECT * FROM nguoidung JOIN lop ON nguoidung.idLop = lop.idLop JOIN khoa ON lop.idKhoa = khoa.idKhoa WHERE idQuyen = 2";
$result = $conn->query($sql);
?>
<div class="header">
    <div class="header-mid">
        <div class="header-top">
            <div class="left">
                <a href="inf.php">My Infor</a>
                <a href="member.php" style="border-bottom: 1px solid rgb(13, 114, 238)"
                ><b>Member</b></a
                >
                <a href="">Teacher</a>
                <a href="">About</a>
            </div>
            <div class="right">
                <button class="google">Google</button>
                <button class="name"><?php echo $row["hoTen"] ?></button>
            </div>
        </div>
        <div class="header-bot"></div>
    </div>
</div>
<div class="after-body">
    <h2>Member</h2>
    <div class="cover">
        <div class="item-parents">
            <div class="item-children1">
                Number
            </div>
            <div class="item-children2">
                Student Code
            </div>
            <div class="item-children3">
                Name
            </div>
            <div class="item-children4">
                Avatar
            </div>
            <div class="item-children5">
                School Year
            </div>
            <div class="item-children6">
                Faculty
            </div>
        </div>
        <?php
        $cnt=1;
        while ($row=$result->fetch_assoc()){
            ?>
            <div class="item-parents">
                <div class="item-children1">
                    <?php
                    echo $cnt++;
                    ?>
                </div>
                <div class="item-children2">
                    <?php
                    echo $row['maNguoiDung'];
                    ?>
                </div>
                <div class="item-children3">
                    <?php
                    echo $row['hoTen'];
                    ?>
                </div>
                <div class="item-children4">
                    <?php if ($row["avt"] != null){ ?>
                        <img src="data:image/jpg;charset=utf8;base64,<?php echo base64_encode($row['avt']); ?>" class="avatar" alt="" srcset="">
                    <?php } else { ?>
                        <img src="../image/avtnull.png" class="image-avatar" alt="" srcset="">
                    <?php } ?>
                </div>
                <div class="item-children5">
                    <?php
                    echo $row['khoa'];
                    ?>
                </div>
                <div class="item-children6">
                    <?php
                    echo $row['tenKhoa'];
                    ?>
                </div>
            </div>
            <?php
        }
        ?>
    </div>
</div>
</body>
</html>
