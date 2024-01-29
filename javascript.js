

function toggleMenu(){
    let subMenu = document.getElementById("subMenu");
    subMenu.classList.toggle("open-menu");
}
function changeStatus() {
// Get the element with the id "statusSpan"
var statusSpan = document.getElementById("statusSpan");

// Check if the current status is "Active" and change it to "Busy"
if (statusSpan.textContent.trim() === "Active") {
    statusSpan.textContent = "Busy";
} else {
    // If it's not "Active", change it back to "Active"
    statusSpan.textContent = "Active";
}
}
function openPopup() {
    document.getElementById("popupContainer").style.display = "flex";
}

function closePopup() {
    document.getElementById("popupContainer").style.display = "none";
}
function changeStatus() {
    // Get the element with the id "statusSpan"
    var statusSpan = document.getElementById("statusSpan");

    // Check if the current status is "Active" and change it to "Busy"
    if (statusSpan.textContent.trim() === "Active") {
        statusSpan.textContent = "Busy";
    } else {
        // If it's not "Active", change it back to "Active"
        statusSpan.textContent = "Active";
    }
}
