import CustomerModel from "../Model/CustomerModel.js";
import {customers}  from "../Db/db.js";

var recordIndex = undefined;
$("#Save").on('click', () => {
    var CustomerId = $(".CustomerId").val();
    var CustomerName = $(".CustomerName").val();
    var CustomerAddress = $(".CustomerAddress").val();
    var CustomerSalary = $(".CustomerSalary").val();

  /*  let customer = {
        id: CustomerId,
        name: CustomerName,
        address: CustomerAddress,
        salary: CustomerSalary,
    };*/
    let customer = new CustomerModel(CustomerId, CustomerName, CustomerAddress, CustomerSalary);


    customers.push(customer); // Push the new customer object to the customers array
    loadTable(); // Call the loadTable function to update the table
});

function loadTable() {
    $("#customer-tbl").empty();

    customers.forEach((item, index) => {
        var record = `<tr>
            <td class="custId">${item.id}</td>
            <td class="custName">${item.name}</td>
            <td class="custAddress">${item.address}</td>
            <td class="custSalary">${item.salary}</td>
        </tr>`;
        // Append the record to a table element
        $('#customer-tbl').append(record);
    });
}
$("#customer-tbl").on('dblclick', 'tr', function () {
    // event delegation
    recordIndex = $(this).index();
    let ID = $(this).find(".custId").text(); // Corrected ".studentId" instead of ".studenyId"
    let NAME = $(this).find(".custName").text(); // Corrected ".studentId" instead of ".studenyId"
    let ADDRESS = $(this).find(".custAddress").text(); // Corrected ".studentId" instead of ".studenyId"
    let SALARY = $(this).find(".custSalary").text(); // Corrected ".studentId" instead of ".studenyId"
    console.log(ID);
    console.log(NAME);
    console.log(ADDRESS);
    console.log(SALARY);

    $('.CustomerId').val(ID);
    $('.CustomerName').val(NAME);
    $('.CustomerAddress').val(ADDRESS);
    $('.CustomerSalary').val(SALARY);

    // Trigger click event on the "Add Customer" button to open the modal
    $('#addCustomerButton').click();
});

$("#Update").on('click', () => {
    // Check if a record is selected
    var customerId = $(".CustomerId").val();
    var customerName = $(".CustomerName").val();
    var customerAddress = $(".CustomerAddress").val();
    var customerSalary = $(".CustomerSalary").val();

    let customerObj = customers[recordIndex];
    /*let studentObj ={...students[recordIndex]} ;*//*clone the object*/
        customerObj.id =customerId;
        customerObj.name = customerName;
        customerObj.address = customerAddress;
        customerObj.salary = customerSalary;

    loadTable(); // Update the table after modifying the student object

});

$("#delete").on('click', () => {
    customers.splice(recordIndex,1);
    loadTable()
    $("#Reset").click();
});