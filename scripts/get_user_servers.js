
// searches for all threads in a server
async function view_user_servers(userid) {

    console.log("Got here");

  
    const formData = new FormData();
    formData.append('userId', userid); 
  
    const response = await fetch("https://softboxcollide.glitch.me/get_all_servers_with_user", {
      method: "POST",
      mode: "cors",
      body: formData
    });
  

    const result = await response.json();
    console.log(result)
    return result;
  }

  