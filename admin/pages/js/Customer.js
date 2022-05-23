
  var customerGet = 'http://localhost:8080/customers/get-all-customer';
  var customerDelete = 'http://localhost:8080/customers/delete-customer';
  var customerEdit = 'http://localhost:8080/customers/edit-customer';
  var customerPost = 'http://localhost:8080/customers/create';
  var customerGetById = 'http://localhost:8080/customers/get-by-id';
  

  function start() {
    getCustomers(function (customers) {
      console.log(customers);
      renderCustomers(customers);
      renderCustomersInFuits(customers);
    });
    if(document.getElementById("create-customer") != null)
    handleCreateCustomer();
  }
  start();
  // get-all
  function getCustomers(callback){
    var options = {
      method: 'GET',
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
    };
    fetch(customerGet,options)
    .then(function(response){
      return response.json();
    })
    .then(callback);
  }

  function  renderCustomers(customers){
    var htmls = customers.result.map(function(customer){
      return `
            <tr id="customer-item-${customer.id}">
              <td>${customer.id}</td>
              <td><data id="customer-name-${customer.id}" value="${customer.name}"> ${customer.name} </data></td>
              <td><data id="customer-address-${customer.id}" value="${customer.address}"> ${customer.address} </data></td>
              <td><data id="customer-phoneNumber-${customer.id}" value="${customer.phoneNumber}"> ${customer.phoneNumber} </data></td>
              <td><data id="customer-email-${customer.id}" value="${customer.email}"> ${customer.email} </data></td>
             

              <td>
                <a class="btn btn-primary" href="../Chinh_sua_danh_muc/Customer.html" onclick="onclickButtonEditCustomer(${customer.id})"><i
                  class="far fa-edit"></i></a>
                <button type="button"  onclick="handleDeleteCustomer(${customer.id})" class="btn btn-danger delete-product"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
            `;
    });
    let html = htmls.join('');
    if(document.getElementById('table-show-data-customer') != null)
    document.getElementById('table-show-data-customer').innerHTML = html;
  }

   // hiển thị danh sách customers ở fruit
   function  renderCustomersInFuits(customers){
    var htmls = customers.result.map(function(customer){
      return `
             <option value="${customer.id}" id="customer-id-${customer.id}">${customer.name}</option>
            `;
    });
    let html = htmls.join('');
    if(document.getElementById('show-all-customers-input') != null)
      document.getElementById('show-all-customers-input').innerHTML = html;

  }
  // post
  function createCustomer(data, callback){
    var options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
      body: JSON.stringify(data)
    };
    fetch(customerPost, options)
    .then(function(response) {
      if(!response.ok) alert('fail!!!')
      else{
      alert('Success!');
      response.json();
      }
    })
    .then(callback);
  }

  function handleCreateCustomer(){
    var createBtn = document.querySelector('#create-customer');
    createBtn.onclick = function(){
      var name = document.querySelector('input[name="customerName"]').value;
      var address = document.querySelector('input[name="customerAddress"]').value;
      var phone = document.querySelector('input[name="customerPhone"]').value;
      var email = document.querySelector('input[name="customerEmail"]').value;
      var formData = {
        address: address,
        email: email,
        name: name,
        phoneNumber: phone,
      };

      console.log(formData);
      createCustomer(formData)
  }
}

// delete
function handleDeleteCustomer(id){
  var options = {
    method: 'DELETE',
    headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
  };
  if(confirm("Are you sure delete?"))
    fetch(customerDelete+'/'+id, options)
  .then(function(response) {
    response.json();
  })
  .then(function(){
    var customerItem = document.querySelector('#customer-item-'+id);
    if(customerItem){
      customerItem.remove();
      alert("Delete Success!");
    }
  });
}

// edit Customer
function onclickButtonEditCustomer(id){
  var customerName = document.querySelector('#customer-name-'+id).value;
  var customerAddress = document.querySelector('#customer-address-'+id).value;
  var customerPhoneNumber = document.querySelector('#customer-phoneNumber-'+id).value;
  var customerEmail = document.querySelector('#customer-email-'+id).value;
  
  sessionStorage.setItem("customer-idEdit",id);
  sessionStorage.setItem("customer-name",customerName);
  sessionStorage.setItem("customer-address",customerAddress);
  sessionStorage.setItem("customer-phoneNumber",customerPhoneNumber);  
  sessionStorage.setItem("customer-email",customerEmail);
}

if(document.querySelector('#customer-name-in-customer') != null)
    document.querySelector('#customer-name-in-customer').value = sessionStorage.getItem("customer-name");
    if(document.querySelector('#customer-address-in-customer') != null)
    document.querySelector('#customer-address-in-customer').value = sessionStorage.getItem("customer-address");
  if(document.querySelector('#customer-phoneNumber-in-customer') != null)
    document.querySelector('#customer-phoneNumber-in-customer').value = sessionStorage.getItem("customer-phoneNumber");
    if(document.querySelector('#customer-email-in-customer') != null)
  document.querySelector('#customer-email-in-customer').value = sessionStorage.getItem("customer-email");


function handerEditCustomer(data,id,callback){
  var options = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
    body: JSON.stringify(data)
  };
  fetch(customerEdit+'/'+id, options)
  .then(function(response) {
    if(response.ok) alert('Success');
    else alert('Fail')
    response.json();
  })
  .then(callback);
}

function editCustomer(id){
  var customerName = document.querySelector('input[name="customerName"]').value;
  var address = document.querySelector('input[name="customerAddress"]').value;
  var phoneNumber = document.querySelector('input[name="customerPhone"]').value;
  var email = document.querySelector('input[name="customerEmail"]').value;
      
      var formData = {
        address: address,
        name: customerName,
        phoneNumber: phoneNumber,
        email: email,


      };
      handerEditCustomer(formData,id)
}

function onclickButtonSaveEditCustomer(){
  editCustomer(sessionStorage.getItem("customer-idEdit"));
  sessionStorage.clear();
  
}
