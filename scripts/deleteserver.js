async function deleteserver() {
    console.log("Deleting server...");

    const formData = new FormData();
    formData.append('serverId', 7);

        const response = await fetch("https://softboxcollide.glitch.me/delete_server", {
            method: "POST",
            mode: "cors",
            body: formData
        });
        
}
