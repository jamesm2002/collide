
async function add_member(serverid) {
    const emailInput = document.getElementById("emailInput");
    const userEmail = emailInput.value.trim();

    const formData = new FormData();
    formData.append('serverId', serverid); 
    formData.append('email', userEmail); 

    try {
        const response = await fetch("https://softboxcollide.glitch.me/add_user_to_server", {
            method: "POST",
            mode: "cors",
            body: formData
        });

        if (response.ok) {
            emailInput.value = "";
            
            alert("User added successfully!");
        } else {
            alert("Error adding user: " + response.statusText);
        }
    } catch (error) {
        alert("An error occurred: " + error.message);
    }
}