$(document).ready(function () {
    loadCustomerId();
    LoadItemIds();

});
function loadCustomerId(){
    let customers = []; // To store the fetched customer data

    // Fetch customer data
    $.ajax({
        url: "http://localhost:8080/shop/customer",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            // Extract the JSON array string from data
            const jsonString = data.substring(0, data.lastIndexOf(']') + 1);

            // Parse the JSON string into an array of customer objects
            customers = JSON.parse(jsonString);

            // Clear existing options in the select element except the first one
            $('#customer_id1').find('option:not(:first)').remove();

            // Iterate over the array of customer objects
            for (let emp of customers) {
                let empId = emp.id; // Assuming 'id' is the field for customer ID

                // Create a new option element for each customer ID
                let option = $('<option></option>').val(empId).text(empId);

                // Append the option to the select element
                $('#customer_id1').append(option);
            }
        },
        error: function() {
            alert("Failed to load customer data.");
        }
    });

    // Event listener for when a customer ID is selected
    $('#customer_id1').change(function() {
        // Get the selected customer ID
        const selectedCustomerId = $(this).val();

        // Find the customer object that matches the selected ID
        const selectedCustomer = customers.find(customer => customer.id === selectedCustomerId);

        // If a matching customer is found, set the customer name in the input field
        if (selectedCustomer) {
            $('#customer_name1').val(selectedCustomer.name); // Set the customer name
        } else {
            $('#customer_name1').val(''); // Clear the input if no customer is found
        }
    });
}

function LoadItemIds(){
    let items = []; // To store the fetched item data

    // Fetch item data
    $.ajax({
        url: "http://localhost:8080/shop/item",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            // Extract the JSON array string from data
            const jsonString = data.substring(0, data.lastIndexOf(']') + 1);

            // Parse the JSON string into an array of item objects
            items = JSON.parse(jsonString);

            // Clear existing options in the select element except the first one
            $('#item_code1').find('option:not(:first)').remove();

            // Iterate over the array of item objects
            for (let item of items) {
                let itemId = item.id; // Assuming 'id' is the field for item ID

                // Create a new option element for each item ID
                let option = $('<option></option>').val(itemId).text(itemId);

                // Append the option to the select element
                $('#item_code1').append(option);
            }
        },
        error: function () {
            alert("Error fetching items");
        }
    });

    // Event listener for when an item ID is selected
    $('#item_code1').change(function() {
        // Get the selected item ID
        const selectedItemId = $(this).val();

        // Find the item object that matches the selected ID
        const selectedItem = items.find(item => item.id === selectedItemId);

        // If a matching item is found, set the item details in the input fields
        if (selectedItem) {
            $('#item_name1').val(selectedItem.name); // Set the item name
            $('#price1').val(selectedItem.price);    // Set the item price
            $('#qty_on_hand').val(selectedItem.qty); // Set the item quantity
        } else {
            // Clear the input fields if no item is found
            $('#item_name1').val('');
            $('#price1').val('');
            $('#qty_on_hand').val('');
        }
    });
}