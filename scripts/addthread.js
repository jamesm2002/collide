// adds text thread
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
            alert("Text thread added successfully.");
            location.reload();
            closePopup();
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
    const file = fileInput.files[0];

    if (file) {
        console.log("Adding image thread...");

        const threadBody = document.getElementById('imageBody').value.toString();

        const formData = new FormData();
        formData.append('title', 'Your Title');
        formData.append('body', threadBody);
        formData.append('file', file);
        formData.append('serverId', serverid);
        formData.append('creatorId', userid);

        try {
            const response = await fetch("http://softboxcollide.glitch.me/add_image_thread", {
                method: "POST",
                mode: "cors",
                body: formData
            });

            if (response.ok) {
                alert("Image thread added successfully.");
                location.reload();
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