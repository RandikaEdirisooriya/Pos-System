$(document).ready(function() {
    var isFirstTime = true; // Flag to track if it's the first time

    $("#CustomerBtn").on('click', () => {
        $(".customer").css({ display: "block" });
        $(".Item, .OrderPlacement, .orderDetails, .Home").hide();
    });

    $("#ItemBtn").on('click', () => {
        $(".Item").css({ display: "block" });
        $(".customer, .OrderPlacement, .orderDetails, .Home").hide();
    });

    $("#OrderPlacement").on('click', () => {
        $(".OrderPlacement").css({ display: "block" });
        $(".customer, .Item, .orderDetails, .Home").hide();
    });

    $("#OrderDetails").on('click', () => {
        $(".orderDetails").css({ display: "block" });
        $(".customer, .Item, .OrderPlacement, .Home").hide();
    });

    // Check if it's the first time, then show ".Home" and hide other sections
    if (isFirstTime) {
        $(".Home").show();
        $(".customer, .Item, .OrderPlacement, .orderDetails").hide();
        isFirstTime = false; // Set the flag to false so it doesn't execute again
    }
});