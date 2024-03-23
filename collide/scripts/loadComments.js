async function getAllCommentsInServer() {
    console.log("Fetching all comments in server...");

    const formData = new FormData();
    formData.append('serverId', 1);

    const response = await fetch("https://softboxcollide.glitch.me/get_all_comments_in_server", {
        method: "POST",
        mode: "cors",
        body: formData
    });

    const result = await response.json();
    console.log(result);
    return result;
}

document.addEventListener('DOMContentLoaded', getAllCommentsInServer);