$(document).ready(function () {
    loadCustomerId();
    LoadItemIds();
    generateCurrentDate();
    TableClick();
});

function generateCurrentDate(){
    $("#order_date").val(new Date().toISOString().slice(0, 10));
}

function loadCustomerId(){
    let customers = [];

    $.ajax({
        url: "http://localhost:8080/shop/customer",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            const jsonString = data.substring(0, data.lastIndexOf(']') + 1);
            customers = JSON.parse(jsonString);
            $('#customer_id1').find('option:not(:first)').remove();
            for (let emp of customers) {
                let empId = emp.id;
                let option = $('<option></option>').val(empId).text(empId);
                $('#customer_id1').append(option);
            }
        },
        error: function() {
            alert("Failed to load customer data.");
        }
    });

    $('#customer_id1').change(function() {
        const selectedCustomerId = $(this).val();
        const selectedCustomer = customers.find(customer => customer.id === selectedCustomerId);
        if (selectedCustomer) {
            $('#customer_name1').val(selectedCustomer.name);
        } else {
            $('#customer_name1').val('');
        }
    });
}

function LoadItemIds(){
    let items = [];

    $.ajax({
        url: "http://localhost:8080/shop/item",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            const jsonString = data.substring(0, data.lastIndexOf(']') + 1);
            items = JSON.parse(jsonString);
            $('#item_code1').find('option:not(:first)').remove();
            for (let item of items) {
                let itemId = item.id;
                let option = $('<option></option>').val(itemId).text(itemId);
                $('#item_code1').append(option);
            }
        },
        error: function () {
            alert("Error fetching items");
        }
    });

    $('#item_code1').change(function() {
        const selectedItemId = $(this).val();
        const selectedItem = items.find(item => item.id === selectedItemId);
        if (selectedItem) {
            $('#item_name1').val(selectedItem.name);
            $('#price1').val(selectedItem.price);
            $('#qty_on_hand').val(selectedItem.qty);
        } else {
            $('#item_name1').val('');
            $('#price1').val('');
            $('#qty_on_hand').val('');
        }
    });
}
function AddItemTable() {
    var item_code = $("#item_code1").val();
    var item_name = $("#item_name1").val();
    var price = parseFloat($("#price1").val());
    var QtyOnHand = parseInt($("#qty_on_hand").val(), 10);
    var getQty = parseInt($("#getQty").val(), 10);

    // Check if getQty is greater than QtyOnHand
    if (getQty > QtyOnHand) {
        alert("Invalid quantity: Requested quantity exceeds quantity on hand.");
        return; // Exit the function if the quantity is invalid
    }

    // Check if all fields are filled in properly before adding to the table
    if (!item_code || !item_name || isNaN(price) || isNaN(QtyOnHand) || isNaN(getQty)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    // Create a new row with the item data
    var newRow = `
        <tr>
            <td>${item_code}</td>
            <td>${item_name}</td>
            <td>${price.toFixed(2)}</td> <!-- Format price to 2 decimal places -->
            <td>${QtyOnHand}</td>
            <td>${getQty}</td>
        </tr>
    `;

    // Append the new row to the table body
    $("#itemTable1").append(newRow);

    // Clear the input fields after adding the row
    $("#item_code1").val('');
    $("#item_name1").val('');
    $("#price1").val('');
    $("#qty_on_hand").val('');
    $("#getQty").val('');
}

function TableClick(){
    $('#itemTable1').on('click', 'tr', function () {
        // Get the data from the clicked row
        var item_code = $(this).find('td:eq(0)').text();
        var item_name = $(this).find('td:eq(1)').text();
        var price = parseFloat($(this).find('td:eq(2)').text());
        var QtyOnHand = $(this).find('td:eq(3)').text();
        var getqty = parseFloat($(this).find('td:eq(4)').text());

        // Calculate the total
        var total = getqty * price;

        // Set the total value in the input field
        $("#total").val(total.toFixed(2)); // Formats the total to 2 decimal places
    });


}