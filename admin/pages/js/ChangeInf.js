var userEdit = 'http://localhost:8080/users/editUser';
var userEditAvatar = 'http://localhost:8080/users/edit-avatar';
// edit user 
function handerEditUser(data,id,callback){
    var options = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
      body: JSON.stringify(data)
    };
    fetch(userEdit+'/'+id, options)
    .then(function(response) {
      if(response.ok) alert('Success');
      else alert('Fail')
      response.json();
    })
    .then(callback);
  }


  function editUser(id){
      var preName = document.querySelector('input[name="preName"]').value;
      var name = document.querySelector('input[name="name"]').value;
      var age = document.querySelector('input[name="age"]').value;
      var birthday = document.querySelector('input[name="birthday"]').value;
      var address = document.querySelector('input[name="address"]').value;
      var phone = document.querySelector('input[name="phoneNumber"]').value;
      var account = document.querySelector('input[name="account"]').value;
      var password = document.querySelector('input[name="password"]').value;
      var formData = {
        account: account,
        address: address,
        age: age,
        birthday: birthday,
        name: name,
        password: password,
        phoneNumber: phone,
        preName: preName,
      };
      handerEditUser(formData,id);
}
  
function clickButtonSaveEditInf(){
    editUser(localStorage.getItem("userId"));
  }


function editAvatar(id) {

  const formData = new FormData();
  const photos = document.querySelector('input[type="file"][multiple]');
  for (let i = 0; i < photos.files.length; i++) {
    formData.append(`avatar`, photos.files[i]);
  }
  fetch(userEditAvatar+'/'+id, {
  method: 'PATCH',
  headers: {
  'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
  },
  body: formData,
  })
  .then(response => response.json())
  .then(result => {
    alert('Success');
    localStorage.setItem('userAvatar',result.result.avatar);
    // localStorage.setItem('userAvatar',photos.files[0]);
    document.getElementById('img-avatar-user-login').src = localStorage.getItem('userAvatar');
    document.getElementById('avatar-change').src = localStorage.getItem('userAvatar');

    console.log('Success:', result);
  })
  .catch(error => {
    alert('Error');
    console.error('Error:', error);
  });

}

function clickButtonSaveEditAvatar(){
    editAvatar(localStorage.getItem("userId"));
  }



// mai lam phan trang
// làm đăng xuất
// chỉnh sửa header
// làm đăng ký admin
// làm đăng ký user 