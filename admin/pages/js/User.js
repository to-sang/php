  var userGet = 'http://localhost:8080/users/get-all-user';
  var userDelete = 'http://localhost:8080/users/delete';
  var userEdit = 'http://localhost:8080/users/editUser';
  var userEditAvatar = 'http://localhost:8080/users/edit-avatar';
  var userPost = 'http://localhost:8080/api/auth/signup-user';
  var userGetById = 'http://localhost:8080/users/get-by-id';
  var userGetByName = 'http://localhost:8080/users/get-all-by-name';
  var idEditData ;
function start() {
  getUsers(function (users) {
    console.log(users);
    renderUsers(users);
    
  });
  if(document.getElementById("create-user") != null)
  handleCreateUser();
}
start();
// get-all

function getUsers(callback){
  var options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
              },
  };
  fetch(userGet,options)
  .then(function(response){
    return response.json();
  })
  .then(callback);
}

function  renderUsers(users){
  var htmls = users.result.map(function(user){
    return `
          <tr id="user-item-${user.id}">
              <td><data value="${user.id}" id="data-for-edit-${user.id}">${user.id}</data></td>
              <td>${user.preName} ${user.name}</td>
              <td>${user.age}</td>
              <td>${user.address}</td>
              <td>${user.phoneNumber}</td>
              <td>${user.birthday}</td>
              <td>${user.account}</td>
              <td><p id="show-user-password">${user.password}</p></td>
              <td><img src="${user.avatar}" alt="" width="100px"></td>
              <td>
                  <a class="btn btn-primary" onclick="clickButtonEditInf(${user.id})" href="../Chinh_sua_danh_muc/User.php" id="edit-user-${user.id}" ><i
                  class="far fa-edit"></i>
                  
                  </a>
                  <button type="button" onclick="handleDeleteUser(${user.id})" class="btn btn-danger delete-product"><i class="fas fa-trash-alt"></i></button>
              </td>
          </tr>
      `;
  });
  let html = htmls.join('');
  if(document.getElementById('table-show-data-user')!=null)
    document.getElementById('table-show-data-user').innerHTML = html;
}

// hiển thị danh sách user ở bill
// function  renderUsersInBill(users){
//   var htmls = users.result.map(function(user){
//     return `
//             <option value="${user.id}" id="user-id-${user.id}">${user.preName}  ${user.name}</option>
//           `;
//   });
//   let html = htmls.join('');
  
//     if(document.querySelector('#show-data-user-input') == null)
//       document.getElementById('show-all-users-input').innerHTML = html;
// }
// đã chỉnh sửa(28/4)

var showUserNameInBill = ` <option value="${localStorage.getItem('userId')}" id="user-id-${localStorage.getItem('userId')}">${localStorage.getItem('userPreName')}  ${localStorage.getItem('userName')}</option>`
if(document.querySelector('#show-all-users-input') != null)
       document.getElementById('show-all-users-input').innerHTML = showUserNameInBill;


// post

function createUser(data, callback){
  var options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
    },
    body: JSON.stringify(data)
  };
  fetch(userPost, options)
  .then(function(response) {
    if(!response.ok) alert('Fail!!!')
    else{
    alert('Success!');
    response.json();
    }
  })
  .then(callback);
}

  function handleCreateUser(){
    var createBtn = document.querySelector('#create-user');
    createBtn.onclick = function(){
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

      console.log(formData);
      createUser(formData)
  }
}

// delete
function handleDeleteUser(id){
  var options = {
    method: 'DELETE',
    headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
    },
  };
  if(confirm("Are you sure delete?"))
    fetch(userDelete+'/'+id, options)
  .then(function(response) {
    response.json();
    console.log(response);
  })
  .then(function(){
    var userItem = document.querySelector('#user-item-'+id);
    if(userItem){
      userItem.remove();
      alert("Delete Success!");
    }
  });
}

  // find by id user ý tưởng là find by id xong render ra
function clickButtonSearch(){
  var id = document.querySelector('input[name="keyword-search-user"]').value;
  console.log(id);
  var idcheck = parseInt(id);
  if(idcheck > 0){
    handleFilterUsersById(id);
  } else
  handleGetUserByName(id);
}

function clickButtonEditInf(idEdit){
  idEditData = idEdit;
  sessionStorage.setItem("idProductEdit",idEdit);
  } 
  if(sessionStorage.getItem("idProductEdit") != null)
    handleUsersByIdEdit(sessionStorage.getItem("idProductEdit"));

// lưu tại id localStorage 


function handleFilterUsersById(id, callback){
  var options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
    },
  };
  fetch(userGetById+"/"+id, options)
  .then(function(response){
    console.log(response);
    if(!response.ok) {
      alert('No user');
    }
    return response.json();
  })
  .then(function(user){
    // nếu search khác rỗng thì gọi đè dữ liệu
    if(document.querySelector('input[name="keyword-search-user"]').value != null){
      var htmls = renderUserById(user);
      document.getElementById('table-show-data-user').innerHTML = htmls;
    }
  })
  .then(callback);

}
function  renderUserById(user){
    return `
          <tr id="user-item-${user.result.id}">
              <td>${user.result.id}</td>
              <td>${user.result.preName} ${user.result.name}</td>
              <td>${user.result.age}</td>
              <td>${user.result.address}</td>
              <td>${user.result.phoneNumber}</td>
              <td>${user.result.birthday}</td>
              <td>${user.result.account}</td>
              <td><span id="show-user-password">${user.result.password}</span></td>
              <td><img src="${user.result.avatar}" alt="" width="100px"></td>
              <td>
                  <a class="btn btn-primary" href="#"><i
                  class="far fa-edit"></i></a>
                  <button type="button" onclick="handleDeleteUser(${user.id})" class="btn btn-danger delete-product"><i class="fas fa-trash-alt"></i></button>
              </td>
          </tr>
      `;
}

// sửa users
function handleUsersByIdEdit(id, callback){
  var options ={
    method: 'GET',
    headers: {'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
    },
  };
  fetch(userGetById+"/"+id, options)
  .then(function(response){
    console.log(response);
    if(!response.ok) alert('No user');
    return response.json();
  })
  .then(function(user){
      if(document.querySelector("user-preName-in-user") == null)
      renderInfUserById(user);
    // nếu search khác rỗng thì gọi đè dữ liệu
  })
  .then(callback);
}

function  renderInfUserById(user){
  if(document.querySelector('#user-preName-in-user') != null)
    document.querySelector('#user-preName-in-user').value = user.result.preName;
  if(document.querySelector('#user-name-in-user') != null)
    document.querySelector('#user-name-in-user').value = user.result.name;
  if(document.querySelector('#user-age-in-user') != null)
    document.querySelector('#user-age-in-user').value = user.result.age;
  if(document.querySelector('#user-birthday-in-user') != null)
    document.querySelector('#user-birthday-in-user').value = user.result.birthday;
  if(document.querySelector('#user-address-in-user') != null)
    document.querySelector('#user-address-in-user').value = user.result.address;
  if(document.querySelector('#user-phoneNumber-in-user') != null)
    document.querySelector('#user-phoneNumber-in-user').value = user.result.phoneNumber;
  if(document.querySelector('#user-account-in-user') != null)
    document.querySelector('#user-account-in-user').value = user.result.account;
  if(document.querySelector('#user-password-in-user') != null)
    document.querySelector('#user-password-in-user').value = user.result.password;

}

//get user by Name
function handleGetUserByName(name, callback){
  var options ={
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
  };
  fetch(userGetByName+"/?name="+name, options)
  .then(function(response){
    console.log(response);
    if(!response.ok) alert('No user');
    return response.json();
  })
  .then(function(users){
    // nếu search khác rỗng thì gọi đè dữ liệu
    if(document.querySelector('#keyword-search-user').value != null)
      renderUsers(users);

  })
  .then(callback);

}


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
  
function postFile(id) {

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
    console.log('Success:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });

}

// khi click nút lưu 
function clickButtonSaveEditInf(){
  editUser(sessionStorage.getItem("idProductEdit"));
  postFile(sessionStorage.getItem("idProductEdit"));
  sessionStorage.clear();
}