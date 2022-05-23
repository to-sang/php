
var signUpUser = 'http://localhost:8080/api/auth/signup-user';


function createUser(data,callback){
    var options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch(signUpUser, options)
    .then(function(response) {
      if(response.ok) alert('Success');
      else alert('Fail')
      response.json();
    })
    .then(callback);
  }


  function handleCreateUser(){
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
      createUser(formData);
      console.log(formData);
}
  
function clickButtonSaveCreate(){
    handleCreateUser();
  }

