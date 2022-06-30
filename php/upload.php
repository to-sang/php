<?php 

if (isset($_POST['submit']) && isset($_FILES['my_image'])) {
	include "dbconnection.php";

	echo "<pre>";
	print_r($_FILES['my_image']);
	echo "</pre>";

	$img_name = $_FILES['my_image']['name'];
	$img_size = $_FILES['my_image']['size'];
	$tmp_name = $_FILES['my_image']['tmp_name'];
	$error = $_FILES['my_image']['error'];

	if ($error === 0) {
		if ($img_size > 10485760) {
			$em = "Kích thước ảnh quá lớn.";
		    header("Location: ../layout/inf.php?error=".rawurlencode($em));
		}else {
			$img_ex = pathinfo($img_name, PATHINFO_EXTENSION);
			$img_ex_lc = strtolower($img_ex);

			$allowed_exs = array("jpg", "jpeg", "png");

			if (in_array($img_ex_lc, $allowed_exs)) {
				$new_img_name = uniqid("IMG-", true).'.'.$img_ex_lc;
				$img_upload_path = '../uploads/'.$new_img_name;
				move_uploaded_file($tmp_name, $img_upload_path);

				// Insert into Database
                $sql = "SELECT avt FROM nguoidung WHERE idNguoiDung = '" . $_COOKIE["2"] . "'";
                $result = $conn->query($sql);
                $preimg = $result->fetch_assoc();
                if ($preimg['avt'] != null) {
                    $file_pointer = fopen("../uploads/$preimg", 'w+');
                    unlink($file_pointer);
                }
				$sql = "UPDATE nguoidung SET avt = '$new_img_name' where idNguoiDung = ".$_COOKIE['2'];
				mysqli_query($conn, $sql);
				header("Location: ../layout/inf.php");
			}else {
				$em = "Vui lòng chọn file ảnh.";
		        header("Location: ../layout/inf.php?error=".rawurlencode($em));
			}
		}
	}else {
		$em = "Lỗi không xác định!";
		header("Location: ../layout/inf.php?error=".rawurlencode($em));
	}

}else {
	header("Location: ../layout/inf.php");
}