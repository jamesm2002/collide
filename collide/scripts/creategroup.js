//function to add a server

async function addServer() {
  console.log("Adding server");

  const serverId = document.getElementById('serverId').value.toString();

  const formData = new FormData();
  formData.append('serverId', serverId);
  formData.append('creatorId', 1);

await fetch("https://softboxcollide.glitch.me/add_server", {
  method: "POST",
  mode: "cors",
  body: formData
});
//tells user it was successful
console.log("server added successfully.");
}



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


//returns the name of each server
async function view_server() {
  console.log("Got here");

  const formData = new FormData();
  formData.append('userId', 1); 

  const response = await fetch("https://softboxcollide.glitch.me/get_all_servers_with_user", {
    method: "POST",
    mode: "cors",
    body: formData
  });

  const result = await response.json();
  console.log(result[0].formData)
  return result[0].formData;
}

//prints all servers
async function printAllServer() {
  const serverResponse = await view_servers(); // This is an array of server objects.
  const sidenavContainer = document.getElementById('sidenavContainer');

  if (serverResponse && serverResponse.length > 0) {
    console.log("Printing servers:");

    serverResponse.forEach(server => {
      const serverName = server.name; // Correctly access the name property of each server object.

      const postDiv = document.createElement('div');
      postDiv.classList.add('sidenavcontainer');
      
      const bodyParagraph = document.createElement('p');
      bodyParagraph.textContent = serverName; // Display the server name.

      const serverButton = document.createElement('button');
      serverButton.textContent = `Open ${server.name}`; // Display the server name on the button.

      // Use an event listener for the click event to open a new window/tab with server details
      serverButton.addEventListener('click', () => openServerPage(server.serverid, server.name));

      postDiv.appendChild(bodyParagraph); // Append the paragraph with the server name.
      postDiv.appendChild(serverButton); // Append the button to postDiv
      sidenavContainer.appendChild(postDiv); // Append the div to the sidenavContainer.
    });
  } else {
    console.log("No servers found."); // Error message if no servers were found.
  }
}


document.addEventListener('DOMContentLoaded', printAllServer);


