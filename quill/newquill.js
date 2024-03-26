// will create a new file for user

// saves and creates a document thread
async function create_document(serverid, userid) {
    console.log("Adding document thread...");

    const threadBody = document.getElementById('threadBodyDocument').value.toString();

    // Get the updated content from Quill editor
    const updatedContent = "<p></p>";
    console.log("Updating document content");

    // Add a new document thread to the database
    console.log("Adding document thread...");
    const formData = new FormData();
    formData.append('title', 'Your Title');
    formData.append('body', threadBody);
    formData.append('serverId', serverid);
    formData.append('creatorId', userid);
    formData.append('docLink', updatedContent);

    await fetch("https://softboxcollide.glitch.me/add_document_thread", {
        method: "POST",
        mode: "cors",
        body: formData
    });

    console.log("Document thread added successfully.");
}