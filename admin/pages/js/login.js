var login = "http://localhost:8080/api/auth/login";
var userGetById = "http://localhost:8080/users/get-by-id";
function start() {
  handleUsersById(parseInt(localStorage.getItem("userId")));
  if (localStorage.getItem("userId") != null) {
    if (localStorage.getItem("userName") == null) {
      setTimeout(function () {
        window.location.reload();
      }, 500);
    }
  }
}
start();

function userLogin(data) {
  var options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  fetch(login, options)
    .then(function (response) {
      if (!response.ok) alert("Fail!!!");
      else {
        alert("Success!!");
        return response.json();
      }
    })
    .then(function (data) {
      localStorage.setItem("Bearer", data.result.jwt);
      localStorage.setItem("userId", data.result.userId);
      console.log(localStorage.getItem("Bearer"));
      console.log(localStorage.getItem("userId"));
      window.location = "http://127.0.0.1:5500/pages/Hien_thi/home.html";
      handleUsersById(parseInt(localStorage.getItem("userId")));
    });
}

function handleUsersById(id, callback) {
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("Bearer"),
    },
  };
  fetch(userGetById + "/" + id, options)
    .then(function (response) {
      // if(!response.ok) alert('Fail!!!'); // sửa ngày 04/05
      return response.json();
    })
    .then(function (user) {
      localStorage.setItem("userName", user.result.name);
      localStorage.setItem("userPreName", user.result.preName);
      localStorage.setItem("userAge", user.result.age);
      localStorage.setItem("userBirthday", user.result.birthday);
      localStorage.setItem("userAddress", user.result.address);
      localStorage.setItem("userPhoneNumber", user.result.phoneNumber);
      localStorage.setItem("userAccount", user.result.account);
      localStorage.setItem("userPassword", user.result.password);
      localStorage.setItem("userAvatar", user.result.avatar);
      console.log(localStorage.getItem("userId"));
    })
    .then(callback);
}

var fullName =
  localStorage.getItem("userPreName") + " " + localStorage.getItem("userName");
document.querySelector("#userNameLogin").innerHTML = fullName;
document.querySelector("#userNameLogin2").innerHTML = fullName;
document.getElementById("img-avatar-user-login").src =
  localStorage.getItem("userAvatar");

if (document.getElementById("avatar-change") != null)
  document.getElementById("avatar-change").src =
    localStorage.getItem("userAvatar");

document.getElementById("user-preName-in-changeInf").value =
  localStorage.getItem("userPreName");
document.getElementById("user-name-in-changeInf").value =
  localStorage.getItem("userName");

// lấy ra id user ở bills

document.getElementById("user-age-in-changeInf").value =
  localStorage.getItem("userAge");
document.getElementById("user-birthday-in-changeInf").value =
  localStorage.getItem("userBirthday");
document.getElementById("user-address-in-changeInf").value =
  localStorage.getItem("userAddress");
document.getElementById("user-phoneNumber-in-changeInf").value =
  localStorage.getItem("userPhoneNumber");
document.getElementById("user-account-in-changeInf").value =
  localStorage.getItem("userAccount");
document.getElementById("user-password-in-change").value =
  localStorage.getItem("userPassword");

function handleLogin() {
  var username = document.getElementById("email-login").value;
  var password = document.getElementById("password-login").value;
  var formData = {
    username: username,
    password: password,
  };
  console.log(formData);
  userLogin(formData);
}

//  phần đăng xuất
function onClickButtonSignOut() {
  localStorage.clear();
  window.location = "../Hien_thi/login.php";
}
