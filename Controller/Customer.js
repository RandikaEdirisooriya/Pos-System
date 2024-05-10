var customers = [];

$("#Save").on('click', () => {
    var CustomerId = $(".CustomerId").val();
    var CustomerName = $(".CustomerName").val();
    var CustomerAddress = $(".CustomerAddress").val();
    var CustomerSalary = $(".CustomerSalary").val();

    let customer = {
        id: CustomerId,
        name: CustomerName,
        address: CustomerAddress,
        salary: CustomerSalary,
    };

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
