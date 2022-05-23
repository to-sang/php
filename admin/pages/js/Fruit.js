  var fruitGet = 'http://localhost:8080/fruits';
  var fruitDelete = 'http://localhost:8080/fruits';
  var fruitEdit = 'http://localhost:8080/fruits';
  var fruitPost = 'http://localhost:8080/fruits';
  var fruitGetById = 'http://localhost:8080/fruits';
  var fruitGetByCategory = 'http://localhost:8080/fruits';
  var fruitGetByManufacture = 'http://localhost:8080/fruits';
  var fruitGetByTime = 'http://localhost:8080/fruits/days';
  var fruitGetByName = 'http://localhost:8080/fruits';
  var fruitEditAvatar= 'http://localhost:8080/fruits';
  function start() {
    getFruits(function (fruits) {
      console.log(fruits);
      renderFruits(fruits);
      rendeFruitsInBill(fruits);
    });
    if(document.getElementById("create-fruit") != null)
      handleCreateFruit();
  }

  start();

  // get-all
  function getFruits(callback){
    var options = {
      method: 'GET',
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
    };
    fetch(fruitGet,options)
    .then(function(response){
      return response.json();
    })
    .then(callback);
  }

  function  renderFruits(fruits){
    var htmls = fruits.result.map(function(fruit){
      return `
            <tr id="fruit-item-${fruit.id}">
              <td>${fruit.id}</td>
              <td>${fruit.name}</td>
              <td>${fruit.priceIn}</td>
              <td>${fruit.priceOut}</td>
              <td>${fruit.amount}</td>
              <td>${fruit.expiry}</td>
              <td><img src="${fruit.avatar}" width="100px"></td>
              <td>${fruit.description}</td>
              <td>
                <a class="btn btn-primary" onclick="onclickButtonEditFruit(${fruit.id})" href="../Chinh_sua_danh_muc/Fruit.html"><i
                  class="far fa-edit"></i></a>
                <button type="button"  onclick="handleDeleteFruit(${fruit.id})" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
            `;
    });
    let html = htmls.join('');
    if(document.getElementById('table-show-data') != null){
      document.getElementById('table-show-data').innerHTML = html;
    }
  }

// lhiển thị danh sách fruits ở trang create bill
  function  rendeFruitsInBill(fruits){
    var rowCount = $('#table-fruit-amount tr').length-1;
    var id = rowCount;
    var htmls = fruits.result.map(function(fruit){
      return `
             <option value="${fruit.id}" id="fruit-id-${fruit.id}">${fruit.name}</option>
            `;
    });
    let html = htmls.join('');
    var data =  document.querySelector('#show-all-fruits-input-'+id);
    if(document.querySelector('#show-all-fruits-input-'+id) != null)
    data.innerHTML = html;
  }
  function addMoreFruits(){
    var rowCount = $('#table-fruit-amount tr').length;
    getFruits(function (fruits) {
      rendeFruitsInBill(fruits,rowCount);
    });
  }

// post
  function createFruit(data,id, callback){
    var options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
      body: JSON.stringify(data)
    };
    fetch(fruitPost+"/"+id, options)
    .then(function(response) {
      if(!response.ok) alert('Fail!!!')
      else{
      alert('Success!');
      response.json();
      }
    })
    .then(callback);
  }

  // post fruits (chưa làm post ảnh)
  function handleCreateFruit(){
    var createBtn = document.querySelector('#create-fruit');
    createBtn.onclick = function(){
      var id= parseInt(document.querySelector('select[name="categoryName"]').value);
      var idManufacture = parseInt(document.querySelector('select[name="manufactureName"]').value);
      var name = document.querySelector('input[name="name"]').value;
      var priceIn =parseInt( document.querySelector('input[name="priceIn"]').value);
      var priceOut = parseInt(document.querySelector('input[name="priceOut"]').value);
      var amount = parseInt(document.querySelector('input[name="amount"]').value);
      var expiry = document.querySelector('input[name="expiry"]').value;
      var description = document.querySelector('textarea[name="description"]').value;
      var formData = {
        amount: amount,
        description: description,
        expiry: expiry,
        idCategories:[id],
        name: name,
        priceIn: priceIn,
        priceOut: priceOut,
      };

      createFruit(formData,idManufacture)
  }
}

// delete
function handleDeleteFruit(id){
  var options = {
    method: 'DELETE',
    headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
  };
  if(confirm("Are you sure delete?"))
    fetch(fruitDelete+'/'+id, options)
  .then(function(response) {
    response.json();
  })
  .then(function(){
    var fruitItem = document.querySelector('#fruit-item-'+id);
    if(fruitItem){
      fruitItem.remove();
      alert("Delete Success!");
    }
  });
}

// filter by category name 
function clickButtonSearchCategory(){
  var idCategory = document.querySelector('select[name="show-all-categories"]').value;
  console.log(idCategory);
  handleGetFruitByCategory(idCategory);
}

function handleGetFruitByCategory(idCategory, callback){
  var options ={
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
  };
  fetch(fruitGetByCategory+"/"+idCategory+"/getFruit", options)
  .then(function(response){
    console.log(response);
    return response.json();
  })
  .then(function(categories){
    // nếu search khác rỗng thì gọi đè dữ liệu
    if(document.querySelector('select[name="show-all-categories"]').value != null){
      renderFruits(categories);
    }
  })
  .then(callback);

}

// filter by manufacture 
function clickButtonSearchManufacture(){
  var idManufacture= document.querySelector('select[name="show-all-manufacturers"]').value;
  handleGetFruitByManufacture(idManufacture);
}

function handleGetFruitByManufacture(idManufacture, callback){
  var options ={
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
  };
  fetch(fruitGetByManufacture+"/"+idManufacture+"/get-all", options)
  .then(function(response){
    return response.json();
  })
  .then(function(manufacturers){
    // nếu search khác rỗng thì gọi đè dữ liệu
    if(document.querySelector('select[name="show-all-manufacturers"]').value != null){
      renderFruits(manufacturers);
    }
  })
  .then(callback);

}

function clickButtonFilterByTime(){
  var start = document.querySelector('input[name="filter-startDate-fruit"]').value;
  var end = document.querySelector('input[name="filter-endDate-fruit"]').value;
  handleGetFruitByTime(start,end);
}

function handleGetFruitByTime(startDate,endDate, callback){
  var options ={
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
  };
  fetch(fruitGetByTime+"?afterDate="+startDate+"&beforeDate="+endDate, options)
  .then(function(response){
    if(!response.ok) alert('No fruit is created in this time.');
    return response.json();
  })
  .then(function(fruits){
    // nếu search khác rỗng thì gọi đè dữ liệu
    if(document.querySelector('input[name="filter-startDate-fruit"]').value != null 
      && document.querySelector('input[name="filter-endDate-fruit"]').value != null
    ){
      renderFruits(fruits);
    }
  })
  .then(callback);

}

function clickButtonSearchFruit(){
  var id = document.querySelector('input[name="keyword-search-fruit"]').value;
  var idcheck = parseInt(id);
  console.log(id);
  if(idcheck > 0){
  } else
  handleGetFruitByName(id);
}

//get fruit by name
function handleGetFruitByName(name, callback){
  var options ={
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
  };
  fetch(fruitGetByName+"/name?name="+name, options)
  .then(function(response){
    if(!response.ok) alert('No fruit');
    return response.json();
  })
  .then(function(fruits){
    // nếu search khác rỗng thì gọi đè dữ liệu
    if(document.querySelector('#keyword-search-fruit').value != null)
      renderFruits(fruits);

  })
  .then(callback);

}

// edit fruit
// edit INf
function handleGetIdFruitEdit(id, callback){
  var options ={
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
  };
  fetch(fruitGetById+"/"+id, options)
  .then(function(response){
    if(!response.ok) alert('No fruit');
    return response.json();
  })
  .then(function(fruit){
    if(document.querySelector("fruit-name-in-fruit") == null)
    renderInfFruitEdit(fruit);
    // nếu search khác rỗng thì gọi đè dữ liệu
  })
  .then(callback);
}

function  renderInfFruitEdit(fruit){
  document.querySelector('#show-all-manufacturers-input').value = "default";
  if(document.querySelector('#fruit-name-in-fruit') != null)
    document.querySelector('#fruit-name-in-fruit').value = fruit.result.name;
  if(document.querySelector('#fruit-priceIn-in-fruit') != null)
    document.querySelector('#fruit-priceIn-in-fruit').value = fruit.result.priceIn;
  if(document.querySelector('#fruit-priceOut-in-fruit') != null)
    document.querySelector('#fruit-priceOut-in-fruit').value = fruit.result.priceOut;
  if(document.querySelector('#fruit-amount-in-fruit') != null)
    document.querySelector('#fruit-amount-in-fruit').value = fruit.result.amount;
  if(document.querySelector('#fruit-expiry-in-fruit') != null)
    document.querySelector('#fruit-expiry-in-fruit').value = fruit.result.expiry;
  if(document.querySelector('#summernote') != null)
    document.querySelector('#summernote').value = fruit.result.description;

}


function onclickButtonEditFruit(id){
  sessionStorage.setItem("idFruitEdit",id);
}

if(sessionStorage.getItem("idFruitEdit")  != null)
handleGetIdFruitEdit(sessionStorage.getItem("idFruitEdit"));

function handerEditFruit(data,id,callback){
  var options = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
    body: JSON.stringify(data)
  };
  fetch(fruitEdit+'/'+id, options)
  .then(function(response) {
    if(response.ok) {
      alert('Success');
      
  }
    else alert('Fail')
    response.json();
  })
  .then(callback);
}

function editFruit(id){

      var idCategory= parseInt(document.querySelector('select[name="categoryName"]').value);
      var name = document.querySelector('input[name="name"]').value;
      var priceIn =parseInt( document.querySelector('input[name="priceIn"]').value);
      var priceOut = parseInt(document.querySelector('input[name="priceOut"]').value);
      var amount = parseInt(document.querySelector('input[name="amount"]').value);
      var expiry = document.querySelector('input[name="expiry"]').value;
      var description = document.querySelector('textarea[name="description"]').value;
      var formData = {
        amount: amount,
        description: description,
        expiry: expiry,
        idCategories:[idCategory],
        name: name,
        priceIn: priceIn,
        priceOut: priceOut,
      };
    handerEditFruit(formData,id)
}

function postFileFruit(id) {
  const formData = new FormData();
  const photos = document.querySelector('#avatar-fruit');
  for (let i = 0; i < photos.files.length; i++) {
    formData.append(`avatar`, photos.files[i]);
  }
  
  fetch(fruitEditAvatar+'/'+id+'/avatar', {
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

function onclickButtonSaveEdit(){
  editFruit(sessionStorage.getItem("idFruitEdit"));
  postFileFruit(sessionStorage.getItem("idFruitEdit"));
  window.location="http://127.0.0.1:5500/NCKH/admin/pages/Hien_thi/Fruit.html";
  sessionStorage.clear();

}