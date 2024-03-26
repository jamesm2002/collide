const  serverId = localStorage.getItem("serverId");
async function deleteserver() {

    console.log('Deleting server...');

    const formData = new FormData();
    formData.append('serverId', serverId);

        const response = await fetch("https://softboxcollide.glitch.me/delete_server", {
            method: "POST",
            mode: "cors",
            body: formData
        });
        console.log(`Deleted ${serverId}`);
}


