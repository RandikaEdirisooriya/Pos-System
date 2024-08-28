$(document).ready(function () {
loadtbl();

    $('#customertble').on('click', 'tr', function () {
        // Get the data from the clicked row
        var customer_id = $(this).find('td:eq(0)').text();
        var customer_name = $(this).find('td:eq(1)').text();
        var address = $(this).find('td:eq(2)').text();
        var contact = $(this).find('td:eq(3)').text();
        var email = $(this).find('td:eq(4)').text();

        // Set the input fields with the row data
        $("#customer_id").val(customer_id);
        $("#customer_name").val(customer_name);
        $("#address").val(address);
        $("#contact").val(contact);
        $("#email").val(email);



    });
});



function SaveCustomer(){
    var customer_name = $("#customer_name").val();
    var address = $("#address").val();
    var contact = $("#contact").val();
    var email = $("#email").val();

    console.log(customer_name,address,contact,email)
    $.ajax({
        method:"POST",
        contentType:"application/json",
        url:"http://localhost:8080/shop/customer",
        async:true,
        data:JSON.stringify({
            "id": "",
            "name": customer_name,
            "address": address,
            "contact": contact,
            "email":email

        }),
        success:function (data){

            alert(data)
loadtbl();
        },
        error:function (){
            alert("Error")
        }
    })
}

function UpdateCustomer(){
    var customer_id = $("#customer_id").val();
    var customer_name = $("#customer_name").val();
    var address = $("#address").val();
    var contact = $("#contact").val();
    var email = $("#email").val();

    console.log(customer_name,address,contact,email)
    $.ajax({
        method:"PUT",
        contentType:"application/json",
        url:"http://localhost:8080/shop/customer",
        async:true,
        data:JSON.stringify({
            "id": customer_id,
            "name": customer_name,
            "address": address,
            "contact": contact,
            "email":email

        }),
        success:function (data){

            alert(data)
            loadtbl();

        },
        error:function (){
            alert("Error")
        }
    })
}

function loadtbl(){
    $.ajax({
        url: "http://localhost:8080/shop/customer",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            // Extract the JSON array string from data
            const jsonString = data.substring(0, data.lastIndexOf(']') + 1);

            // Parse the JSON string into an array of customer objects
            const customers = JSON.parse(jsonString);

            // Clear existing rows in the table body
            $('#customertble').empty();

            // Iterate over the array of customer objects
            for (let emp of customers) {
                let empId = emp.id;
                let name = emp.name;
                let address = emp.address;
                let contact = emp.contact;
                let email = emp.email;

                // Create a new table row with customer data
                let row = `<tr>
                    <td>${empId}</td>
                    <td>${name}</td>
                    <td>${address}</td>
                    <td>${contact}</td>
                    <td>${email}</td>
                </tr>`;

                // Append the row to the table body
                $('#customertble').append(row);
            }

            // Log the processed customer array to the console for debugging
            console.log(customers);
        },
        error: function () {
            alert("Error");
        }
    });
}
function DeleteCustomer(){
    var customer_id = $("#customer_id").val();
    var customer_name = $("#customer_name").val();
    var address = $("#address").val();
    var contact = $("#contact").val();
    var email = $("#email").val();

    $.ajax({
        method:"DELETE",
        contentType:"application/json",
        url:"http://localhost:8080/shop/customer",
        async:true,
        data:JSON.stringify({
            "id": customer_id,
            "name": customer_name,
            "address": address,
            "contact": contact,
            "email":email

        }),
        success:function (data){

            alert(data)
            loadtbl();

        },
        error:function (){
            alert("Error")
        }
    });
}