
//function to add a server
async function addServer() {
  // Correctly access the value of the input field
  const userId = localStorage.getItem("userId");
  const name = document.getElementById('name').value.toString();

  const formData = new FormData();
  formData.append('creatorId', userId); 
  formData.append('name', name); 

    await fetch("https://softboxcollide.glitch.me/add_server", {
      method: "POST",
      mode: "cors",
      body: formData
    });
//tells user it was successful
console.log("server added successfully.");
location.reload()
}

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
  console.log(result)
  return result;
}


//returns the name of each server
async function view_server() {

  const formData = new FormData();
  formData.append('userId', userId); 

  const response = await fetch("https://softboxcollide.glitch.me/get_all_servers_with_user", {
    method: "POST",
    mode: "cors",
    body: formData
  });

  const result = await response.json();
  console.log(result[0].formData)
  return result[0].formData;
}



