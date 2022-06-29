<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Fruit</title>

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
</head>
<body class="hold-transition sidebar-mini">
<?php
require_once ("../../../php/checkroleadmin.php");
require_once ("../../../php/dbconnection.php");
$sql = "SELECT * FROM nguoidung WHERE idNguoiDung=".$_COOKIE['1'];
$result=$conn->query($sql);
$row = $result->fetch_assoc();
?>
<div class="wrapper">
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="../Hien_thi/home.php" class="nav-link">Home</a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Navbar Search -->
      <li class="nav-item">
        <a class="nav-link" data-widget="navbar-search" href="#" role="button">
          <i class="fas fa-search"></i>
        </a>
        <div class="navbar-search-block">
          <form class="form-inline">
            <div class="input-group input-group-sm">
              <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
              <div class="input-group-append">
                <button class="btn btn-navbar" type="submit">
                  <i class="fas fa-search"></i>
                </button>
                <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
      <li>
        <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                <i class="far fa-user-circle"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="../Hien_thi/ChangeInf.php">Change Information</a>
                <a class="dropdown-item" role="button" onclick="onClickButtonSignOut()" href="#"><i class="fas fa-sign-out-alt"></i>Log out(<data id="userNameLogin"></data>) </a>
                <!-- làm logout là chuyển về trang đăng nhập và xóa jwt. -->
            </div>
        </div>
    </li>
    </ul>
  </nav>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4" style="position: fixed; ">
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
      <img src="../../img/taday.jpg"
           alt="logo Web" class="brand-image img-circle elevation-3" style="opacity: 1;">
        <span class="brand-text font-weight-light"><?php echo $row['hoTen']?></span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="" id="img-avatar-user-login" style="width: 35px; height: 35px;" class="img-circle elevation-2" alt="Avatar Image">
        </div>
        <div class="info">
          <a href="#" class="d-block"><data id="userNameLogin2"></data></a>
        </div>
      </div>

      <!-- SidebarSearch Form -->
      <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
          <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item menu-open">
            <a href="#" class="nav-link active">
              <i class="fa-solid fa-file-circle-plus"></i>
              <p>
                Add or update
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="Faculty.php" class="nav-link ">
                  <i class="fa-solid fa-list-ul"></i>
                  <p>Faculty</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="Class.php" class="nav-link">
                  <i class="fa-solid fa-industry"></i>
                  <p>Class</p>
                </a>
              </li>        
              <li class="nav-item">
                <a href="News.php" class="nav-link">
                  <i class="fa-solid fa-file-invoice-dollar"></i>
                  <p>News</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="User.php" class="nav-link active">
                  <i class="fa-solid fa-user-gear"></i>
                  <p>User</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="Admin.php" class="nav-link">
                  <i class="fa-solid fa-user-gear"></i>
                  <p>Admin</p>
                </a>
              </li>
            </ul>
          </li>

          <li class="nav-item menu-open">
            <a href="#" class="nav-link">
              <i class="fa-solid fa-list-check"></i>
              <p>
                Management
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="../Hien_thi/Faculty.php" class="nav-link">
                  <i class="fa-solid fa-list-ul"></i>
                  <p>Faculty</p>
                </a>
              </li>
              
              <li class="nav-item">
                <a href="../Hien_thi/Class.php" class="nav-link">
                  <i class="fa-solid fa-industry"></i>
                  <p>Class</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../Hien_thi/News.php" class="nav-link">
                  <i class="fa-solid fa-file-invoice-dollar"></i>
                  <p>News</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="../Hien_thi/User.php" class="nav-link">
                  <i class="fa-solid fa-user-gear"></i>
                  <p>User</p>
                </a>
              </li>
            </ul>
          </li>
          
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Add or update</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content d-block" style="width: 100%;">
      
     <div class="m-auto" style="width: 80%;">
      <form class="p-2 form-management" id="" name="" action="" method="POST" style="border-radius: 5px; border: solid 1px #ccc; width: 100%;" enctype="multipart/form-data">
      <h2 class="mt-3" style="text-align: center; font-weight: 500; color: rgb(100, 87, 87);">USERS MANAGEMENT</h2>
        <div class="">
          <div class="form-group">
            <label for="">First Name</label><br>
            <input type="text" id="user-preName-in-user" name="preName" path="" Placeholder=" First name">
          </div>

          <div class="form-group">
            <label for="">Name</label><br>
            <input type="text" id="user-name-in-user" name="name" path="" Placeholder=" Name" value="" ></input>
          </div>
  
          <div class="form-group">
            <label for="">Age</label><br>
            <input type="text" id="user-age-in-user" name="age" path="" Placeholder=" Age"></input>
          </div>

          <div class="form-group">
            <label for="">Nationality</label><br>
            <input type="text" id="user-birthday-in-user" name="birthday" path="" Placeholder=" Nationality"></input>
          </div>

          <div class="form-group">
            <label for="">Address</label><br>
            <input type="text" id="user-address-in-user" name="address" path="" Placeholder=" Address"></input>
          </div>

          <div class="form-group">
            <label for="">Phone Number</label><br>
            <input type="text" id="user-phoneNumber-in-user" name="phoneNumber" path="" Placeholder=" Phone Number"></input>
          </div>

          <div class="form-group">
            <label for="">Account</label><br>
            <input type="text" id="user-account-in-user" name="account" path="" Placeholder=" Account"></input>
          </div>

          <div class="form-group">
            <label for="">Password</label><br>
            <input type="password" id="user-password-in-user" name="password" path="" Placeholder=" Password"></input>
          </div>
          <div class="form-group">
            <label for="">Identity Number</label><br>
            <input type="password" id="user-password-in-user" name="password" path="" Placeholder=" Identity Number"></input>
          </div>
          <div class="form-group" style="width: 95%;">
            <label for="">Avatar</label><br>
            <input type="file" class="form-control-file" id="avatar" name="avatar" multiple>
          </div>
        </div>
      
        <div class="form-group">
          <a href="#" id="create-user" class="btn btn-danger">Add New User</a>
          <button type="button" id="edit-user" onclick="clickButtonSaveEditInf()" class="btn btn-primary">Save User</button>
          <a href=""></a>
        </div>
      </form>
      </div>
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <footer class="main-footer">
    <div class="float-right d-none d-sm-block">
      
    </div>
    
  </footer>

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Add Content Here -->
  </aside>
  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

<!-- jQuery -->
<script src="../../plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="../../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="../../dist/js/adminlte.min.js"></script>
<!-- jQuery Knob -->
<script src="../../plugins/jquery-knob/jquery.knob.min.js"></script>
<!-- Sparkline -->
<script src="../../plugins/sparklines/sparkline.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="../../dist/js/demo.js"></script>
<!-- Page specific script -->
<script src="../../js_admin/them.js"></script>
<!-- include summernote css/js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-bs4.js"></script>
<script src="../../js_admin/jquery-ui.js"></script>
<script src="../js/User.js"></script>
<script src="../js/login.js"></script>

<script>
    $(document).on('click', '.check-img', function(){
      var imgId = $(document).find('.img-1 .abc').val();
      console.log(imgId);
      $(document).find('.abcx').attr('src', imgId);
    })
    function count() {
      var index = $('#table-product tr').length;
      return index + 1;
    }
</script>
<script>
  $(document).ready(function () {
      $('#summernote').summernote();
  });
</script>
<script>
  // Yêu cầu JQUERY UI thay thế INPUT text có id="txtNgayThangNamSinh" thành công cụ chọn ngày tháng Date Picker
  $('#startDate').datepicker(
    {
      showButtonPanel: true,    // option hiển thị nút "Today", "Done"
      dateFormat: 'dd/mm/yy'    // option Định dạng format ngày tháng; d: Day Ngày; m: Month tháng; y: Year năm
    }
  );
  $('#endDate').datepicker(
    {
      showButtonPanel: true,    // option hiển thị nút "Today", "Done"
      dateFormat: 'dd/mm/yy'    // option Định dạng format ngày tháng; d: Day Ngày; m: Month tháng; y: Year năm
    }
  );
</script>
</body>
</html>
