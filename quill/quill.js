
// saves and creates a document thread
async function create_document() {
    console.log("Save clicked");

    // Get the updated content from Quill editor
    const updatedContent = quill.root.innerHTML;
    console.log("Updating document content");

    // Add a new document thread to the database
    console.log("Adding document thread...");
    const formData = new FormData();
    formData.append('title', 'Your Title');
    formData.append('body', 'test document saving');
    formData.append('serverId', 1);
    formData.append('creatorId', 1);
    formData.append('docLink', updatedContent);

    await fetch("https://softboxcollide.glitch.me/add_document_thread", {
        method: "POST",
        mode: "cors",
        body: formData
    });

    console.log("Document thread added successfully.");
}

// loads a document into the quill editor
async function load_thread() {
    console.log("Loading thread...");

    const formData = new FormData();
    formData.append('threadId', 18);

    const response = await fetch("https://softboxcollide.glitch.me/get_thread", {
        method: "POST",
        mode: "cors",
        body: formData
    });

    const result = await response.json();
    const doclink = result.docPart[0].doclink;

    // Set the content of the Quill editor with the fetched thread content
    quill.root.innerHTML = doclink;

    console.log("Thread loaded successfully.");
}

// saves an exisiting document
async function save_document() {
    console.log("saving thread...");

    const updatedContent = quill.root.innerHTML;
    
    const formData = new FormData();
    formData.append('threadId', 18);
    formData.append('newDocument', updatedContent)

    const response = await fetch("https://softboxcollide.glitch.me/change_document", {
        method: "POST",
        mode: "cors",
        body: formData
    });

    console.log("Thread saved successfully.");
}

// event listeners for the buttons
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('create-button').addEventListener('click', create_document);
    document.getElementById('load-button').addEventListener('click', load_thread);
    document.getElementById('save-button').addEventListener('click', save_document);
});