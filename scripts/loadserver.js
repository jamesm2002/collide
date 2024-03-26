const userId = localStorage.getItem("userId");
//searches for all servers
async function view_servers() {
  
    const formData = new FormData();
    formData.append('userId', userId); 
  
    const response = await fetch("https://softboxcollide.glitch.me/get_all_servers_with_user", {
      method: "POST",
      mode: "cors",
      body: formData
    });
  
    const result = await response.json();
    return result;
  }


// returns an array of all values for a thread
async function view_server_details(serverId) {

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
            return server;
        } catch (innerError) {
            console.error("Error processing result:", innerError);
            return { serverId: null, creatorId: null, name: "Error", description:"Error", doclink: 'n/a' };
        }
    }


//prints all servers
async function printAllServers() {
    const serverResponse = await view_servers(); // Assuming this gets a list of servers
    const sidenavContainer = document.getElementById('sidenavContainer');

    if (serverResponse && serverResponse.length > 0) {

        for (const server of serverResponse) {
            
            const serverId = server.serverid;
            
            const server_value = await view_server_details(serverId); // Fetching details for a single server
            
            const serverBody = server_value.name;

            const postDiv = document.createElement('div');
            postDiv.classList.add('server-container');

            const nameParagraph = document.createElement('p');
            const br = document.createElement('br');

            // Check if a server has an associated page or document link
            const link = document.createElement('a');
            link.textContent = `${server.name}`;
            link.href = `server.html?serverId=${serverId}`;
            nameParagraph.appendChild(link); // Append link to the postDiv directly
            
            link.addEventListener('click', function() {
                localStorage.setItem("serverId", serverId);
            });
            
            postDiv.appendChild(nameParagraph);
            postDiv.appendChild(br);
            sidenavContainer.appendChild(postDiv);
            
        }
    } else {
        console.log("No servers found.");
    }
}



document.addEventListener('DOMContentLoaded', printAllServers);

