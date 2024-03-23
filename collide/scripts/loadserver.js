//searches for all servers
async function view_servers() {
    console.log("Got here");
  
    const formData = new FormData();
    formData.append('userId', 1); 
  
    const response = await fetch("https://softboxcollide.glitch.me/get_all_servers_with_user", {
      method: "POST",
      mode: "cors",
      body: formData
    });
  
    const result = await response.json();
    console.log(result)
    return result;
  }

  
// returns an array of all values for a thread
async function view_server_details(serverId) {
    console.log("Retrieving server details...");

    const formData = new FormData();
    formData.append('serverId', serverId);

    const response = await fetch("https://softboxcollide.glitch.me/get_server_by_id", {
        method: "POST",
        mode: "cors",
        body: formData
    });

    const result = await response.json();

    try {
        const server = {
            serverId: result[0].serverid,
            creatorId: result[0].creatorId,
            name: result[0].name,
            doclink: 'n/a'
        };
        return thread;
    } catch {
        try {
            const server = {
                serverId: resultPart[0].serverid,
                creatorId: resultPart[0].creatorId,
                name: resultPart[0].name,
                doclink: 'n/a'
            };
            return server;
        } catch (innerError) {
            console.error("Error processing result:", innerError);
            return { resultId: null, body: "Error retrieving result", resulttype: null, name: "Error", doclink: 'n/a' };
        }
    }
}


//prints all servers
async function printAllServers() {
    const serverResponse = await view_servers(); // Assuming this gets a list of servers
    const sidenavContainer = document.getElementById('sidenavContainer');

    if (serverResponse && serverResponse.length > 0) {
        console.log("Printing servers:");

        for (const server of serverResponse) {
            const serverId = server.serverid;
            const serverDetails = await view_servers(serverId); // Fetching details for a single server
            console.log(serverId);
            const postDiv = document.createElement('div');
            postDiv.classList.add('server-container');

            const threadBody = serverDetails.body; // Assuming serverDetails includes a body property

            const nameParagraph = document.createElement('p');
            nameParagraph.textContent = server.name; // Setting server name

            const br = document.createElement('br');

            // Check if a server has an associated page or document link
            if (server.doclink && server.doclink !== 'n/a') {
                const link = document.createElement('a');
                link.textContent = `More Info`;
                link.href = `server.html?serverId=${serverId}`;
                postDiv.appendChild(link); // Append link to the postDiv directly
            } else {
                const bodyParagraph = document.createElement('p');
                bodyParagraph.textContent = threadBody; // Displaying the thread body separately
                postDiv.appendChild(bodyParagraph);
            }

            postDiv.appendChild(nameParagraph);
            postDiv.appendChild(br);
            sidenavContainer.appendChild(postDiv);
        }
    } else {
        console.log("No servers found.");
    }
}

document.addEventListener('DOMContentLoaded', printAllServers);

