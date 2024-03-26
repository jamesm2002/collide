// saves and creates a document thread
async function create_document(serverid, userid) {
    console.log("Adding document thread...");

    const threadBody = document.getElementById('threadBodyDocument').value.toString();

    const updatedContent = "<p></p>";

    const formData = new FormData();
    formData.append('title', 'Your Title');
    formData.append('body', threadBody);
    formData.append('serverId', serverid);
    formData.append('creatorId', userid);
    formData.append('docLink', updatedContent);

    try {
        const response = await fetch("https://softboxcollide.glitch.me/add_document_thread", {
            method: "POST",
            mode: "cors",
            body: formData
        });

        if (response.ok) {
            alert("Document thread added successfully.");
            
            location.reload();
        } else {
            console.error("Failed to add document thread.");
        }
    } catch (error) {
        console.error("Error:", error);
    }

    console.log("Document thread added successfully.");
}