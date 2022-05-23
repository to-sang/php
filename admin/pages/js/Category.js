
// http://localhost:8081
  var categoryApiGet = 'http://localhost:8080/categories/get-all-category';
  var categoryDelete = 'http://localhost:8080/categories/delete-category';
  var categoryEdit = 'http://localhost:8080/categories/edit-category';
  var categoryPost = 'http://localhost:8080/categories/create';
  var categoryGetById = 'http://localhost:8080/categories/get-by-id';
  
  function start() {
    getCategories(function (categories) {
      renderCategories(categories);
      renderCategoriesInFuits(categories);
    });
    if(document.getElementById("create-category") != null){
      handleCreateCategory(); // tạo category

    }
  }

  start();

// function

  function getCategories(callback){
    var options = {
      method: 'GET',
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
    };
    fetch(categoryApiGet,options)
    .then(function(response){
      return response.json();
    })
    .then(callback);
  }

function  renderCategories(categories){
  
  var htmls = categories.result.map(function(category){
    return `<tr id="category-item-${category.id}">
              <td>${category.id}</td>
              <td><data id="category-name-${category.id}" value="${category.name}"> ${category.name} </data></td>
              <td><data id="category-description-${category.id}" value="${category.description}"> ${category.description} </data></td>
              <td>
                <a class="btn btn-primary" onclick="onclickButtonEditCategory(${category.id})" href="../Chinh_sua_danh_muc/Category.html" ><i
                  class="far fa-edit"></i></a>
                <button type="button" onclick="handleDeleteCategory(${category.id})" class="btn btn-danger delete-product"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          `;
  });
  let html = htmls.join('');
  if(document.getElementById('table-show-data-category') != null)
    document.getElementById('table-show-data-category').innerHTML = html;
}
// hiển thị danh sách category ở fruit
function  renderCategoriesInFuits(categories){
  var htmls = categories.result.map(function(category){
    return `
            <option name="category-id-${category.id}" value="${category.id}" id="category-id-${category.id}"">${category.name}</option>
          `;
  });
  let html = htmls.join('');
  if(document.getElementById('show-all-categories') != null) {
    document.getElementById('show-all-categories').innerHTML = html;
  } else{
    document.getElementById('show-all-categories-input').innerHTML = html;
  }
}


  // xóa category
function handleDeleteCategory(id){
  var options = {
    method: 'DELETE',
    headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
              },
  };
  if(confirm("Are you sure delete?"))
    fetch(categoryDelete+'/'+id, options)
  .then(function(response) {
    response.json();
  })
  .then(function(){
    var categoryItem = document.querySelector('#category-item-'+id);
    if(categoryItem){
      categoryItem.remove();
      alert("Delete Success!");
    }
  });
}



  // post
function createCategory(data, callback){
  var options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
              },
    body: JSON.stringify(data)
  };
  fetch(categoryPost, options)
  .then(function(response) {
    if(!response.ok) alert('fail!!!')
    else{
      
    alert('Success!');
    response.json();
    }
  })
  .then(callback);
}

function handleCreateCategory(){
  var createBtn = document.querySelector('#create-category');
  createBtn.onclick = function(){
    var name = document.querySelector('input[name="categoryName"]').value;
    var description = document.querySelector('textarea[name="description"]').value;
    var formData = {
      description: description,
      name: name,
    };

    console.log(formData);
    createCategory(formData); 
  }
}

//edit category
function onclickButtonEditCategory(id){
  var categoryName = document.querySelector('#category-name-'+id).value;
  var categoryDescription = document.querySelector('#category-description-'+id).value;
  console.log(categoryName);
  console.log(categoryDescription);
  sessionStorage.setItem("category-idEdit",id);
  sessionStorage.setItem("category-name",categoryName);
  sessionStorage.setItem("category-description",categoryDescription);
  
}

if(document.querySelector('#category-name-in-category') != null)
    document.querySelector('#category-name-in-category').value = sessionStorage.getItem("category-name");
    if(document.querySelector('#summernote') != null)
    document.querySelector('#summernote').value = sessionStorage.getItem("category-description");

function renderCategoryById(category){
  category.result.map(function(){
    document.getElementById('categoryName').value = category.result.name;
    document.getElementById('categoryDescription').value = category.result.description;
  })
}


function handerEditCategory(data,id,callback){
  var options = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
              },
    body: JSON.stringify(data)
  };
  fetch(categoryEdit+'/'+id, options)
  .then(function(response) {
    if(response.ok) alert('Success');
    else alert('Fail')
    response.json();
  })
  .then(callback);
}

function editcategory(id){
      var category = document.querySelector('input[name="categoryName"]').value;
      console.log(category);
      var description = document.querySelector('textarea[name="description"]').value;

      var formData = {
        name: category,
        description: description,
      };
      handerEditCategory(formData,id)
}

function onclickButtonSaveEditCategory(){
  console.log(sessionStorage.getItem("category-idEdit"));
  editcategory(sessionStorage.getItem("category-idEdit"));
  sessionStorage.clear();
  
}