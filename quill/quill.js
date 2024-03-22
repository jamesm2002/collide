
// loads a document into the quill editor
async function load_thread() {
    console.log("Loading thread...");

    const formData = new FormData();
    formData.append('threadId', 14);

    const response = await fetch("https://softboxcollide.glitch.me/get_thread", {
        method: "POST",
        mode: "cors",
        body: formData
    });

    const result = await response.json();
    const doclink = result.docPart[0].doclink;
    console.log(result.docPart[0].doclink);

    quill.root.innerHTML = doclink;

    return(doclink)
}

// saves an exisiting document
async function save_document() {
    console.log("saving thread...");

    const updatedContent = quill.root.innerHTML;
    
    const formData = new FormData();
    formData.append('threadId', 14);
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
    document.getElementById('load-button').addEventListener('click', load_thread);
    document.getElementById('save-button').addEventListener('click', save_document);
});


