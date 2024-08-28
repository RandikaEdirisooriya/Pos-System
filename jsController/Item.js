$(document).ready(function () {
    loadtbl();


    $('#itemtbl').on('click', 'tr', function () {
        // Get the data from the clicked row
        var item_code = $(this).find('td:eq(0)').text();
        var price = $(this).find('td:eq(2)').text();
        var item_name = $(this).find('td:eq(1)').text();
        var QtyOnHand = $(this).find('td:eq(3)').text();


        // Set the input fields with the row data
        $("#item_code").val(item_code);
        $("#price").val(price);
        $("#item_name").val(item_name);
        $("#QtyOnHand").val(QtyOnHand);




    });

});


function loadtbl(){
    $.ajax({
        url: "http://localhost:8080/shop/item",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            // Extract the JSON array string from data
            const jsonString = data.substring(0, data.lastIndexOf(']') + 1);

            // Parse the JSON string into an array of customer objects
            const items = JSON.parse(jsonString);

            // Clear existing rows in the table body
            $('#itemtbl').empty();

            // Iterate over the array of customer objects
            for (let emp of items) {
                let empId = emp.id;
                let name = emp.name;
                let price = emp.price;
                let qty = emp.qty;


                // Create a new table row with customer data
                let row = `<tr>
                    <td>${empId}</td>
                    <td>${name}</td>
                    <td>${price}</td>
                    <td>${qty}</td>
                  
                </tr>`;

                // Append the row to the table body
                $('#itemtbl').append(row);
            }

            // Log the processed customer array to the console for debugging

        },
        error: function () {
            alert("Error");
        }
    });
}

function SaveItem(){
    var item_name = $("#item_name").val();
    var price = $("#price").val();
    var QtyOnHand = $("#QtyOnHand").val();



    $.ajax({
        method:"POST",
        contentType:"application/json",
        url:"http://localhost:8080/shop/item",
        async:true,
        data:JSON.stringify({
            "id": "",
            "name": item_name,
            "price": price,
            "qty": QtyOnHand

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
function UpdateItem(){

    var item_code = $("#item_code").val();
    var item_name = $("#item_name").val();
    var price = $("#price").val();
    var QtyOnHand = $("#QtyOnHand").val();



    $.ajax({
        method:"PUT",
        contentType:"application/json",
        url:"http://localhost:8080/shop/item",
        async:true,
        data:JSON.stringify({
            "id": item_code,
            "name": item_name,
            "price": price,
            "qty": QtyOnHand

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
function deleteItem(){
    var item_code = $("#item_code").val();
    var item_name = $("#item_name").val();
    var price = $("#price").val();
    var QtyOnHand = $("#QtyOnHand").val();

    $.ajax({
        method:"DELETE",
        contentType:"application/json",
        url:"http://localhost:8080/shop/item",
        async:true,
        data:JSON.stringify({
            "id": item_code,
            "name": item_name,
            "price": price,
            "qty": QtyOnHand

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
