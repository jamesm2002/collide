

function toggleMenu(){
    let subMenu = document.getElementById("subMenu");
    subMenu.classList.toggle("open-menu");
}
//function changeStatus() {
// Get the element with the id "statusSpan"
//var statusSpan = document.getElementById("statusSpan");

// Check if the current status is "Active" and change it to "Busy"
//if (statusSpan.textContent.trim() === "Active") {
//    statusSpan.textContent = "Busy";
//} else {
//    // If it's not "Active", change it back to "Active"
//    statusSpan.textContent = "Active";
//}
//}
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

function toggleSvgColor() {
    // Select all like buttons
    const svgButtons = document.querySelectorAll('.like-button');

    // Iterate over each button and attach the click event listener
    svgButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the path element within this button
            const svgPath = this.querySelector('path');

            // Toggle the color
            const currentColor = svgPath.getAttribute('fill');
            const newColor = currentColor === 'red' ? 'none' : 'red';
            svgPath.setAttribute('fill', newColor);
        });
    });
}

// Call the function to attach event listeners
toggleSvgColor();


window.onscroll = function() {
    showBackToTopButton();
};

function showBackToTopButton() {
    var button = document.getElementById("backToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
}

// Scroll to the top when the button is clicked
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}


function previewPhoto() {
    const photoInput = document.getElementById("photoInput");
    const previewImage = document.getElementById("previewImage");

    // Check if a file is selected
    if (photoInput.files.length > 0) {
        const selectedFile = photoInput.files[0];

        // Validate file type (optional)
        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (validImageTypes.includes(selectedFile.type)) {
            // Read the file and display a preview
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = "block";
            };
            reader.readAsDataURL(selectedFile);
        } else {
            alert("Invalid file type. Please select a valid image file.");
        }
    } else {
        alert("Please select a file before uploading.");
    }
}

