
// function to add a text thread
async function add_text() {
    console.log("Adding text thread...");
  
    const threadBody = document.getElementById('threadBody').value.toString();
  
    const formData = new FormData();
    formData.append('title', 'Your Title');
    formData.append('body', threadBody);
    formData.append('serverId', 1);
    formData.append('creatorId', 1);
  
  await fetch("https://softboxcollide.glitch.me/add_text_thread", {
    method: "POST",
    mode: "cors",
    body: formData
  });
  
  
  // tells user post was created successfully
  const successMessage = document.getElementById('successMessage');
      successMessage.style.display = 'block';
  
      setTimeout(closePopup, 2000);
  }
  
  // hides the pop up message
  function closePopup() {
    
    const popupContainer = document.getElementById('popupContainer');
    popupContainer.style.display = 'none';
  }


  // function to add images 
  async function add_image() {
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
        formData.append('serverId', 1);
        formData.append('creatorId', 1);

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
