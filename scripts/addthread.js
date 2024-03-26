async function add_text(serverid, userid) {
    console.log("Adding text thread...");
    const threadBody = document.getElementById('threadBody').value.toString();
  
    const formData = new FormData();
    formData.append('title', 'Your Title');
    formData.append('body', threadBody);
    formData.append('serverId', serverid);
    formData.append('creatorId', userid);
  
    try {
        const response = await fetch("https://softboxcollide.glitch.me/add_text_thread", {
            method: "POST",
            mode: "cors",
            body: formData
        });

        if (response.ok) {
           
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';

            setTimeout(closePopup, 2000);
        } else {
            console.error("Failed to add text thread.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}



  // function to add images 
  async function add_image(serverid, userid) {
    const fileInput = document.getElementById('file_input');
    const file = fileInput.files[0]; // Get the selected file

    if (file) {
        console.log("Adding image thread...");

        const threadBody = document.getElementById('imageBody').value.toString();

        // Create FormData object to send data to the server
        const formData = new FormData();
        formData.append('title', 'Your Title');
        formData.append('body', threadBody);
        formData.append('file', file);
        formData.append('serverId', serverid);
        formData.append('creatorId', userid);

        try {
            // Send POST request to the server
            const response = await fetch("http://softboxcollide.glitch.me/add_image_thread", {
                method: "POST",
                mode: "cors",
                body: formData
            });

            // Check if the request was successful
            if (response.ok) {
                console.log("Image added successfully.");
                //document.addEventListener('DOMContentLoaded', print_thread(thread, threadPostsContainer));
            } else {
                console.error("Failed to add image.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    } else {
        console.error("No file selected.");
    }
}
