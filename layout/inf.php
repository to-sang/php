<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Information</title>
    <link rel="stylesheet" href="../css/inf.css">
    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <!-- <link rel="stylesheet" href="../../plugins/fontawesome-free/css/all.min.css"> -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Theme style -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-bs4.css" rel="stylesheet">
  <!-- summernote -->
    <link rel="stylesheet" href="../../dist/css/adminlte.min.css">
    <link rel="stylesheet" href="../../dist/css/them.css">
    <link rel="stylesheet" href="../../dist/css/jquery-ui.min.css">
    <link rel="stylesheet" href="../css/inf.css">
    
</head>
<body>
<?php
require_once "../php/checkroleuser.php";
require "../php/dbconnection.php";
$sql = "SELECT * FROM nguoidung JOIN lop ON nguoidung.idLop = lop.idLop JOIN khoa ON lop.idKhoa = khoa.idKhoa WHERE idNguoiDung = '".$_COOKIE["2"]."'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$sql = "SELECT * FROM giaithuong WHERE idNguoiDung = '".$_COOKIE["2"]."'";
$result = $conn->query($sql);
?>
    <div class="header">
        <div class="header-mid">
            <div class="header-top">
                <div class="left">
                    <a href="inf.php" style="border-bottom:1px solid rgb(13, 114, 238);"><b>My Infor</b></a>
                    <a href="member.php">Member</a>
                    <a href="">Teacher</a>
                    <a href="">About</a>
                </div>
                <div class="right">
                    <button class="google">Google</button>
                    <button class="name"><?php echo $row["hoTen"] ?></button>
                </div>
            </div>
            <div class="header-bot">
                
            </div>
        </div>
    </div>
    <div class="body">
        <div class="body-left">
            <?php if ($row["avt"] != null){ ?>
          <img src="data:image/jpg;charset=utf8;base64,<?php echo base64_encode($row['avt']); ?>" class="avatar" alt="" srcset="">
            <?php } else { ?>
            <img src="../image/avtnull.png" class="avatar" alt="" srcset="">
            <?php } ?>
        </div>
        <div class="body-right">
            <div class="content-right-infor">
              <h4 style="text-align: center;">YOUR INFORMATION</h4>
              <div class="row-item">
                <div class="col-item">
                  <div class="col1-item-title">
                    <span>Name:</span>
                  </div>
                  <div class="col1-item-content">
                    <input type="text" id="fullname" name="fullname" path="" value="<?php echo $row["hoTen"]?>" readonly>
                  </div>
                </div>
                <div class="col-item">
                  <div class="col2-item-title">
                    <span>Class:</span>
                  </div>
                  <div class="col2-item-content">
                    <input type="text" id="classcode" name="classcode" value="<?php echo $row["maLop"]?>" readonly>
                  </div>
                </div>
    
              </div>
              <hr>
              <div class="row-item">
                <div class="col-item">
                  <div class="col1-item-title">
                    <span>Faculty:</span>
                  </div>
                  <div class="col1-item-content">
                    <input type="text" id="faculty" name="faculty" path="" value="<?php echo $row["tenKhoa"]?>" readonly></input>
                  </div>
                </div>
                <div class="col-item">
                  <div class="col2-item-title">
                    <span>BirthDay:</span>
                  </div>
                  <div class="col2-item-content">
                    <input type="text" id="birthday" name="birthday" path="" placeholder="Date of birth" value="<?php echo date_format(date_create($row["ngaySinh"]), 'd/m/Y')?>"></input>
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
                    <input type="text" id="address" name="address" path="" placeholder="Address" value="<?php echo $row["diaChi"]?>""></input>
                  </div>
                </div>
                <div class="col-item">
                  <div class="col2-item-title">
                    <span>Phone number:</span>
                  </div>
                  <div class="col2-item-content">
                    <input type="text" id="phoneNumber" name="phoneNumber" path="" placeholder="Phone number" value="<?php echo $row["soDienThoai"]?>"></input>
                  </div>
                </div>
    
              </div>
              <hr>
              <div class="row-item">
                <div class="col-item">
                  <div class="col1-item-title">
                    <span>Code:</span>
                  </div>
                  <div class="col1-item-content">
                    <input type="text" id="code" name="code" path="" value="<?php echo $row["maNguoiDung"]?>" readonly></input>
                  </div>
                </div>
                <div class="col-item">
                  <div class="col2-item-title">
                    <span>Nationality:</span>
                  </div>
                  <div class="col2-item-content">
                    <input type="text" id="nationality" name="nationality" path="" placeholder="Nationality" value="<?php echo $row["quocTich"]?>"></input>
                  </div>
                </div>
    
              </div>
              <hr>
              <div class="row-item">
                <div class="col-item">
                  <div class="col1-item-title">
                    <span>School Year:</span>
                  </div>
                  <div class="col1-item-content">
                    <input type="text" id="khoa" name="khoa" path="" value="<?php echo $row["khoa"]?>" readonly></input>
                  </div>
                </div>
                <div class="col-item">
                  <div class="col2-item-title">
                    <span>Identity Number:</span>
                  </div>
                  <div class="col2-item-content">
                    <input type="text" id="identitycard" name="identitycard" path="" Placeholder="Identity number" value="<?php echo $row["soCMNDCCCD"]?>"></input>
                  </div>
                </div>
    
              </div>
              
              <div class="row-item">
                <button type="button" id="change-information" onclick="clickButtonSaveEditInf()" class="btn btn-primary" style="margin: 25px;">Save Edit</button>
              </div>
            </div>
        </div>
    </div>
    <div class="after-body">
        <h2>Outstanding Achievements</h2>
        <div class="cover">
          <div class="item-parents">
              <div class="item-children1">
                  Number
              </div>
              <div class="item-children2">
                Prize
              </div>
              <div class="item-children3">
                Fields
              </div>
              <div class="item-children4">
                Scale
              </div>
              <div class="item-children5">
                Year
              </div>
          </div>
            <?php $cnt = 1; while ($row=$result->fetch_assoc()){ ?>
          <div class="item-parents">
              <div class="item-children1">
                  <?php
                  echo $cnt++;
                  ?>
              </div>
              <div class="item-children2">
                  <?php
                  echo $row['tenGiai'];
                  ?>
              </div>
              <div class="item-children3">
                  <?php
                  echo $row['khoiThi'];
                  ?>
              </div>
              <div class="item-children4">
                  <?php
                  echo $row['quyMo'];
                  ?>
              </div>
              <div class="item-children5">
                  <?php
                  echo $row['namThi'];
                  ?>
              </div>
          </div>
            <?php } $conn->close();?>
        </div>
    </div>
</body>
</html>