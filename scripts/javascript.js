userId = localStorage.getItem("userId");

async function getViewServerDetailsAndPrintName(serverId) {
    // Ensure you have the serverId when you call this function
    const formData = new FormData();
    formData.append('serverId', serverId);

    try {
        const response = await fetch("https://softboxcollide.glitch.me/get_server_by_id", {
            method: "POST",
            mode: "cors",
            body: formData
        });

        const result = await response.json();

        // Assuming the API returns an array and you're interested in the first item
        let serverName = "Server name not found";
        if (Array.isArray(result) && result.length > 0) {
            serverName = result[0].name; // Access the name of the first server object if it's an array
        } else if (result.name) {
            serverName = result.name; // Directly access the name if the result is a single server object
        }

        // Update the DOM with the fetched server name
        document.getElementById('serverName').textContent = serverName;
    } catch (error) {
        console.error("Error fetching server details:", error);
        // Handle the error (e.g., show an error message in the UI)
        document.getElementById('serverName').textContent = "Error loading server name";
    }
}

async function getuserinfo() {
    const userId = localStorage.getItem("userId"); // Ensure 'userId' is retrieved correctly from localStorage
    const formData = new FormData();
    formData.append('userId', userId);

    const response = await fetch("https://softboxcollide.glitch.me/get_user_info", {
        method: "POST",
        mode: "cors",
        body: formData
    });

    const result = await response.json();

    // Assuming the result is an array and you're interested in the first item
    // If your endpoint always returns a single user object, adjust accordingly.
    let username = "";
    if (Array.isArray(result) && result.length > 0) {
        username = result[0].username; // Access the username of the first object if it's an array
    } else if (result.username) {
        username = result.username; // Directly access the username if the result is a single object
    }


    // Update the DOM with the fetched username
    document.getElementById('username').textContent = username;

    return result; // Return the fetched result
}


function toggleMenu(){
    let subMenu = document.getElementById("subMenu");
    subMenu.classList.toggle("open-menu");
}


function handleUserPicClick() {
    toggleMenu();
    getuserinfo();
}

function openserverPopup() {
    document.getElementById("serverContainer").style.display = "flex";
}


function closeserverPopup() {
    document.getElementById("serverContainer").style.display = "none";
}

function openPopup() {
    document.getElementById("popupContainer").style.display = "flex";
}

function closePopup() {
    document.getElementById("popupContainer").style.display = "none";
}

function opengeneralPopup() {
    document.getElementById("chat-Container").style.display = "block";
    document.getElementById("allpost").style.display = "none";
    document.getElementById("settings").style.display = "none";
}

function openhomePopup() {
    document.getElementById("chat-Container").style.display = "none";
    document.getElementById("allpost").style.display = "flex";
    document.getElementById("settings").style.display = "none";
}

function opensettingsPopup() {
    document.getElementById("chat-Container").style.display = "none";
    document.getElementById("allpost").style.display = "none";
    document.getElementById("settings").style.display = "flex";
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


