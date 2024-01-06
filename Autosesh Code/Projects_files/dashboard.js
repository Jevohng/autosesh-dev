document.addEventListener("DOMContentLoaded", function () {
    // Get the profile icon element by its class
    var profileIcon = document.querySelector(".icon-container i");


    // Get the dropdown menu element by its ID
    var dropdownMenu = document.getElementById("dropdown-menu");

    // Toggle the menu when clicking on the profile icon
    profileIcon.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the event from bubbling up
    if (dropdownMenu.style.display === "block") {
        dropdownMenu.style.display = "none";
    } else {
        dropdownMenu.style.display = "block";
    }
});


    // Close the menu when clicking outside of it
    document.addEventListener("click", function (event) {
        if (!event.target.matches(".icon-container") && !event.target.matches(".dropdown-content")) {
            dropdownMenu.style.display = "none";
        }
    });

    // Prevent the menu from closing when clicking inside it
    dropdownMenu.addEventListener("click", function (event) {
        event.stopPropagation();
    });
});
