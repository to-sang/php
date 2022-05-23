// http://localhost:8081
var billGet = 'http://localhost:8080/bill-details';
var billPost = 'http://localhost:8080/bill-details';
var billDetailsGetByIdUser = 'http://localhost:8080/bill-details';
var billDetailsGetById = 'http://localhost:8080/bill-details';
var billGetByTime = 'http://localhost:8080/bill-details/date'
function start() {
  getBills(function (bills) {
    console.log(bills);
    renderBills(bills);
  });
}

start();


  // get-all-bill

  function getBills(callback){
    var options = {
      method: 'GET',
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
    };
    fetch(billGet,options)
    .then(function(response){
      return response.json();
    })
    .then(callback);
  }

  function  renderBills(bills){
    var htmls = bills.result.map(function(bill){
      handleBillsDetailsByIdBill(bill.id);
      return `
      <tr id="bill-item-${bill.id}">
      <td>${bill.id}</td>
      <td>${bill.user.preName} ${bill.user.name}</td>
      <td>${bill.customer.name}</td>
      <td>
        <button type="button" class="btn btn-info show-bd">
          <i class="fa-solid fa-circle-info" onclick="showBillDetails(${bill.id})"></i>
          <div class="bill-details" id="bill-details-${bill.id}" >
            <div class="form-bill-details">
              <div class="title m-3"> <h2>BILL DETAILS</h2></div>
              <h6>Date: ${bill.dateCreated}</h6>
                <div class="inf-customer">
                  <div> 
                    <b>Full Name</b>  <span>: ${bill.customer.name}</span> <br>
                    <b>Email</b>      <span>:  ${bill.customer.email}</span> <br>
                    <b>Code</b>      <span>:  ${bill.code}</span> <br>
                  </div> 

                  <div>
                    <b>Address</b> <span>:  ${bill.customer.address}</span>
                    <br>

                    <b>Phone Number</b> <span>:  ${bill.customer.phoneNumber}</span>
                  </div>
                </div>
                <div class="buy-list">
                  <form class="" id="" name="" action="" method="">
                    <table class=" mt-5" id="">
                    <thead>
                      <tr>
                        <th style="width: 5%">
                          STT
                        </th>
                        <th>
                          Name
                        </th>
                        <th>
                          Avatar
                        </th>
                        <th>
                          Price
                        </th>
                        <th>
                          Quantity
                        </th>
                        <th>Into money</th>
                      </tr>
                    </thead>
                    <tbody id="table-show-data-bills-details-${bill.id}">
                      
                    </tbody>
                    <tfoot id="table-show-data-bills-details-footer-${bill.id}">
                      
                    </tfoot>
                    </table>
                  </form>
                </div>
                <div>
                  <h6 style="margin: 25px;">
                    Created By: <span>${bill.user.name}</span>
                  </h6>
                </div>
              </div> 
          </div>
        </button>
      </td>
    </tr>
    `;
    
    });
    
    let html = htmls.join('');
    if(document.getElementById('table-show-data-bill') != null){
      document.getElementById('table-show-data-bill').innerHTML = html;
    }
  }

  // chi tiết đơn hàng ( danh sách fruit trong đơn hàng)
function handleBillsDetailsByIdBill(id,callback){
  var options ={
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
  };
  fetch(billDetailsGetById+"/"+id+"/detail", options)
  .then(function(response){
    return response.json();
  })
  .then(function(billsDetails){
    renderBillsDetailsByIdBill(billsDetails);
  })
  .then(callback);
}

function  renderBillsDetailsByIdBill(billsDetails){
  var count = 0;
  var id = '';
  var totalPrice = 0;
  var htmls = billsDetails.result.billDetails.map(function(billDetails){
    var intomoney = billDetails.fruit.priceOut*billDetails.amount;
    totalPrice = totalPrice + intomoney;
    count++;
    id = billDetails.billDetailId.idBill;
    return `
          <tr>
            <td>${count}</td>
            <td>${billDetails.fruit.name}</td>
            <td><img src="${billDetails.fruit.avatar}" style="width: 100px" alt=""></td>
            <td>${billDetails.fruit.priceOut}</td>
            <td>${billDetails.amount}</td>
            <td>${intomoney}</td>
          </tr>
          `;
  });
  var tfooter = `
  <tr style="text-align: center;">
  <td>Tổng Tiền: </td>
  <td colspan="4"></td>
  <td>${totalPrice}</td>
</tr>
  `
  let html = htmls.join('');
  var render = document.querySelector('#table-show-data-bills-details-'+id);
  if( document.querySelector('#table-show-data-bills-details-'+id) != null)
  render.innerHTML = html;
  var renderFooter = document.querySelector('#table-show-data-bills-details-footer-'+id);
  if(document.querySelector('#table-show-data-bills-details-footer-'+id) != null)
  renderFooter.innerHTML = tfooter;
}

// get all bill by idUser

function clickButtonSearch(){
  var id = document.querySelector('input[name="keyword-search-bill"]').value;
    handleGetBillByIdUser(id);
    handleGetBillById(id);
}
function handleGetBillByIdUser(id, callback){
  var options ={
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
  };
  fetch(billDetailsGetByIdUser+"/"+id, options)
  .then(function(response){
    console.log(response);
    if(!response.ok) alert('No Bill with id user '+id);
    return response.json();
  })
  .then(function(bills){
    // nếu search khác rỗng thì gọi đè dữ liệu
    if(document.querySelector('input[name="keyword-search-bill"]').value != null){
      renderBills(bills);
        }
  })
  .then(callback);

}

function handleGetBillById(id, callback){
  var options ={
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
  };
  fetch(billDetailsGetById+"/"+id+"/detail", options)
  .then(function(response){
    console.log(response);
    if(!response.ok) alert('No Bill with idBill '+id);
    return response.json();
  })
  .then(function(bill){
    // nếu search khác rỗng thì gọi đè dữ liệu
    if(document.querySelector('input[name="keyword-search-bill"]').value != null){
      var htmls = renderBillById(bill);
      document.getElementById('table-show-data-bill').innerHTML = htmls;
        }
  })
  .then(callback);

}

function  renderBillById(bill){
    handleBillsDetailsByIdBill(bill.result.id);
    return `
    <tr id="bill-item-${bill.result.id}">
    <td>${bill.result.id}</td>
    <td>${bill.result.user.name}</td>
    <td>${bill.result.customer.name}</td>
    <td>
      <button type="button" class="btn btn-info show-bd">
        <i class="fa-solid fa-circle-info" onclick="showBillDetails(${bill.result.id})"></i>
        <div class="bill-details" id="bill-details-${bill.result.id}" >
          <div class="form-bill-details">
            <div class="title m-3"> <h2>BILL DETAILS</h2></div>
            <h6>Date: ${bill.result.dateCreated}</h6>
              <div class="inf-customer">
                <div> 
                  <b>Full Name</b>  <span>: ${bill.result.customer.name}</span> <br>
                  <b>Email</b>      <span>:  ${bill.result.customer.email}</span> <br>
                  <b>Code</b>      <span>:  ${bill.result.code}</span> <br>
                </div> 

                <div>
                  <b>Address</b> <span>:  ${bill.result.customer.address}</span>
                  <br>

                  <b>Phone Number</b> <span>:  ${bill.result.customer.phoneNumber}</span>
                </div>
              </div>
              <div class="buy-list">
                <form class="" id="" name="" action="" method="">
                  <table class=" mt-5" id="">
                  <thead>
                    <tr>
                      <th style="width: 5%">
                        STT
                      </th>
                      <th>
                        Name
                      </th>
                      <th>
                        Avatar
                      </th>
                      <th>
                        Price
                      </th>
                      <th>
                        Quantity
                      </th>
                      <th>Into money</th>
                    </tr>
                  </thead>
                  <tbody id="table-show-data-bills-details-${bill.result.id}">
                    
                  </tbody>
                  </table>
                </form>
              </div>
              <div>
                <h6 style="margin: 25px;">
                  Created By: <span>${bill.result.user.name}</span>
                </h6>
              </div>
            </div> 
        </div>
      </button>
    </td>
  </tr>
  `;
}

// get by time
function clickButtonFilterByTime(){
  var start = document.querySelector('input[name="filter-startDate"]').value;
  var end = document.querySelector('input[name="filter-endDate"]').value;
  handleGetBillByTime(start,end);
}

function handleGetBillByTime(startDate,endDate, callback){
  var options ={
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
  };
  fetch(billGetByTime+"?start="+startDate+"&end="+endDate, options)
  .then(function(response){
    console.log(response);
    if(!response.ok) alert('No bill in this time.');
    return response.json();
  })
  .then(function(bills){
    // nếu search khác rỗng thì gọi đè dữ liệu
    if(document.querySelector('input[name="filter-startDate"]').value != null 
      && document.querySelector('input[name="filter-endDate"]').value != null
    ){
      renderBills(bills);
    }
  })
  .then(callback);

}


// post
function createBill(data,idUser,idCustomer, callback){
  var options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Bearer'),
                },
    body: JSON.stringify(data)
  };
  fetch(billPost+"/"+idUser+"/"+idCustomer, options)
  .then(function(response) {
    if(!response.ok) alert('Fail!!!')
    else{
    alert('Success!');
    response.json();
    }
  })
  .then(callback);
}

function handleCreateBill(){
  var idCustomer= parseInt(document.querySelector('select[name="customerId"]').value);
  var idUser = parseInt(document.querySelector('select[name="userId"]').value);
  var n = parseInt($('#table-fruit-amount tr').length);
  console.log(n);
  var formData;
  var id;
  var amount;
  var arrayData = [n];
  for (var i = 1; i <n; i++) {
    id = document.querySelector('#show-all-fruits-input-'+i).value;
    amount = document.querySelector(`#amount-fruit-`+i).value;
    arrayData[i-1] = {idFruit: id, amount: amount}
  }
    formData = arrayData;
    console.log(formData,idUser,idCustomer);
    createBill(formData,idUser,idCustomer);
}
