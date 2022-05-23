
  var manufactureGet = 'http://localhost:8080/manufacture/get-all-manufacture';
  var manufactureDelete = 'http://localhost:8080/manufacture/delete-manufacture';
  var manufactureEdit = 'http://localhost:8080/manufacture/edit-manufacture';
  var manufacturePost = 'http://localhost:8080/manufacture/create';
  var manufactureGetById = 'http://localhost:8080/manufacture';
  var manufactureGetByName = 'http://localhost:8080/manufacture/find-by-name-manufacture';
  
  function start() {
    getManufacture(function (manufacture) {
      console.log(manufacture);
      renderManufacture(manufacture);
      renderManufactureInFruits(manufacture);
    });
    if(document.getElementById("create-manufacture") != null) {
      handleCreateManufacture();
    }
  }

  start();
  // get-all

  function getManufacture(callback){
    var options = {
      method: 'GET',
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
    };
    fetch(manufactureGet,options)
    .then(function(response){
      return response.json();
    })
    .then(callback);
  }

  function  renderManufacture(manufacture){
    
    var htmls = manufacture.result.map(function(manufacture){
      return `
            <tr id="manufacture-item-${manufacture.id}">
                <td><data id="manufacture-id-${manufacture.id}" value="${manufacture.id}"> ${manufacture.id} </data></td>
                <td><data id="manufacture-name-${manufacture.id}" value="${manufacture.name}"> ${manufacture.name} </data></td>
                <td><data id="manufacture-address-${manufacture.id}" value="${manufacture.address}"> ${manufacture.address} </data></td>
                <td><data id="manufacture-phoneNumber-${manufacture.id}" value="${manufacture.phoneNumber}"> ${manufacture.phoneNumber} </data></td>
                <td>
                    <a class="btn btn-primary"  href="../Chinh_sua_danh_muc/Manufacture.html" onclick="onclickButtonEditManufacture(${manufacture.id})"><i
                    class="far fa-edit"></i></a>
                    <button type="button" onclick="handleDeleteManufacture(${manufacture.id})" class="btn btn-danger delete-product"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>
        `;
    });
    let html = htmls.join('');
    if(document.getElementById('table-show-data-manufacture') != null)
      document.getElementById('table-show-data-manufacture').innerHTML = html;
  }


  // all manufacture in Fruit

  function  renderManufactureInFruits(manufacture){
    
    var htmls = manufacture.result.map(function(manufacture){
      return `
        <option value="${manufacture.id}" id="manufacture-id-${manufacture.id}">${manufacture.name}</option>
        `;
    });
    let html = htmls.join('');
    
    if(document.getElementById('show-all-manufacturers') != null){
      document.getElementById('show-all-manufacturers').innerHTML = html;
    }
    else if(document.getElementById('show-all-manufacturers-input') != null){
      document.getElementById('show-all-manufacturers-input').innerHTML = html;
    } 
  }

// delete
function handleDeleteManufacture(id){
    var options = {
      method: 'DELETE',
      headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
    };
    if(confirm("Are you sure delete?"))
      fetch(manufactureDelete+'/'+id, options)
    .then(function(response) {
      response.json();
    })
    .then(function(){
      var manufactureItem = document.querySelector('#manufacture-item-'+id);
      if(manufactureItem){
        manufactureItem.remove();
        alert("Delete Success!");
      }
    });
  }

// post
function createManufacture(data, callback){
    var options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
      body: JSON.stringify(data)
    };
    fetch(manufacturePost, options)
    .then(function(response) {
      if(!response.ok) alert('Fail!!!')
      else{
      alert('Success!');
      response.json();
      }
    })
    .then(callback);
  }

function handleCreateManufacture(){
var createBtn = document.querySelector('#create-manufacture');
createBtn.onclick = function(){
    var name = document.querySelector('input[name="name"]').value;
    var address = document.querySelector('input[name="address"]').value;
    var phone = document.querySelector('input[name="phoneNumber"]').value;
    var formData = {
    address: address,
    name: name,
    phoneNumber: phone,
    };

    console.log(formData);
    createManufacture(formData)
}
}



// get manufacture by id

function clickButtonSearch(){
  var id = document.querySelector('input[name="keyword-search-manufacture"]').value;
  console.log(id);
  var idNumber = parseInt(id);
    if(idNumber > 0){
      handleGetManufactureById(id);
    }
    else
      handleGetManufactureByName(id);
}
function handleGetManufactureById(id, callback){
  var options ={
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
  };
  fetch(manufactureGetById+"/"+id, options)
  .then(function(response){
    console.log(response);
    if(!response.ok) alert('No Manufacture');
    return response.json();
  })
  .then(function(manufacture){
    // nếu search khác rỗng thì gọi đè dữ liệu
    if(document.querySelector('input[name="keyword-search-manufacture"]').value != null){
      var htmls = renderManufactureById(manufacture);
      document.getElementById('table-show-data-manufacture').innerHTML = htmls;
    }
  })
  .then(callback);

}
function  renderManufactureById(manufacture){
    return `
        <tr id="manufacture-item-${manufacture.result.id}">
            <td>${manufacture.result.id}</td>
            <td>${manufacture.result.name}</td>
            <td>${manufacture.result.phoneNumber}</td>
            <td>${manufacture.result.address}</td>
            <td>
                <a class="btn btn-primary"  href="/admin/product/edit"><i
                class="far fa-edit"></i></a>
                <button type="button" onclick="handleDeleteManufacture(${manufacture.id})" class="btn btn-danger delete-product"><i class="fas fa-trash-alt"></i></button>
            </td>
        </tr>
      `;
}

//get manufacture by Name
function handleGetManufactureByName(name, callback){
  var options ={
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
  };
  fetch(manufactureGetByName+"/?name="+name, options)
  .then(function(response){
    console.log(response);
    if(!response.ok) alert('No Manufacture');
    return response.json();
  })
  .then(function(manufacture){
    // nếu search khác rỗng thì gọi đè dữ liệu
    renderManufactureByName(manufacture);

  })
  .then(callback);

}
function  renderManufactureByName(manufacture){
    
  var htmls = manufacture.result.map(function(manufacture){
    return `
          <tr id="manufacture-item-${manufacture.id}">
              <td>${manufacture.id}</td>
              <td>${manufacture.name}</td>
              <td>${manufacture.phoneNumber}</td>
              <td>${manufacture.address}</td>
              <td>
                  <a class="btn btn-primary"  href="/admin/product/edit"><i
                  class="far fa-edit"></i></a>
                  <button type="button" onclick="handleDeleteManufacture(${manufacture.id})" class="btn btn-danger delete-product"><i class="fas fa-trash-alt"></i></button>
              </td>
          </tr>
      `;
  });
  let html = htmls.join('');
  if(document.querySelector('input[name="keyword-search-manufacture"]').value != null){
    document.getElementById('table-show-data-manufacture').innerHTML = html;
  }
}


// edit Manufacture
function onclickButtonEditManufacture(id){
  var manufactureName = document.querySelector('#manufacture-name-'+id).value;
  var manufactureAddress = document.querySelector('#manufacture-address-'+id).value;
  var manufacturePhoneNumber = document.querySelector('#manufacture-phoneNumber-'+id).value;
  
  sessionStorage.setItem("manufacture-idEdit",id);
  sessionStorage.setItem("manufacture-name",manufactureName);
  sessionStorage.setItem("manufacture-address",manufactureAddress);
  sessionStorage.setItem("manufacture-phoneNumber",manufacturePhoneNumber);  
}

if(document.querySelector('#manufacture-name-in-manufacture') != null)
    document.querySelector('#manufacture-name-in-manufacture').value = sessionStorage.getItem("manufacture-name");
if(document.querySelector('#manufacture-address-in-manufacture') != null)
  document.querySelector('#manufacture-address-in-manufacture').value = sessionStorage.getItem("manufacture-address");
if(document.querySelector('#manufacture-phoneNumber-in-manufacture') != null)
  document.querySelector('#manufacture-phoneNumber-in-manufacture').value = sessionStorage.getItem("manufacture-phoneNumber");


function handerEditManufacture(data,id,callback){
  var options = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
    body: JSON.stringify(data)
  };
  fetch(manufactureEdit+'/'+id, options)
  .then(function(response) {
    if(response.ok) alert('Success');
    else alert('Fail')
    response.json();
  })
  .then(callback);
}

function editManufacture(id){
  var manufactureName = document.querySelector('input[name="name"]').value;
  var address = document.querySelector('input[name="address"]').value;
  var phoneNumber = document.querySelector('input[name="phoneNumber"]').value;
      
      var formData = {
        address: address,
        name: manufactureName,
        phoneNumber: phoneNumber

      };
      handerEditManufacture(formData,id)
}

function onclickButtonSaveEditManufacture(){
  editManufacture(sessionStorage.getItem("manufacture-idEdit"));
  sessionStorage.clear();
  
}