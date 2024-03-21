
// function to add a text thread
async function add_text() {
  console.log("Adding text thread...");

  const threadBody = document.getElementById('threadBody').value.toString();

  const formData = new FormData();
  formData.append('title', 'Your Title');
  formData.append('body', threadBody);
  formData.append('serverId', 1);
  formData.append('creatorId', 1);

await fetch("https://softboxcollide.glitch.me/add_text_thread", {
  method: "POST",
  mode: "cors",
  body: formData
});


// tells user post was created successfully
const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';

    setTimeout(closePopup, 2000);
}

// hides the pop up message
function closePopup() {
  
  const popupContainer = document.getElementById('popupContainer');
  popupContainer.style.display = 'none';
}
  

// searches for all threads in a server
async function view_threads() {
    console.log("Got here");
  
    const formData = new FormData();
    formData.append('serverId', 1); 
  
    const response = await fetch("https://softboxcollide.glitch.me/get_all_threads_in_server", {
      method: "POST",
      mode: "cors",
      body: formData
    });
  
    const result = await response.json();
    console.log(result)
    return result;
  }

// returns the body of each text thread
async function view_thread(threadId) {
    console.log("Got here");
  
    const formData = new FormData();
    formData.append('threadId', threadId);
  
    const response = await fetch("https://softboxcollide.glitch.me/get_thread", {
      method: "POST",
      mode: "cors",
      body: formData
    });
  
    const result = await response.json();
    console.log(result[0].body)
    return result[0].body;
  }

// prints all posts in a server
  async function printAllThreadPosts() {

    const threadsResponse = await view_threads(); 
    const threadPostsContainer = document.getElementById('threadPostsContainer');

    if (threadsResponse && threadsResponse.length > 0) {
        console.log("Printing posts of all threads in server 1:");
        
        threadsResponse.forEach(async thread => {
            const threadId = thread.threadid;
            const threadTitle = thread.title;
            const threadBody = await view_thread(threadId); 
            
            const postDiv = document.createElement('div');
            postDiv.classList.add('post-container');

            const titleHeader = document.createElement('h1');
            titleHeader.textContent = threadTitle;

            const bodyParagraph = document.createElement('p');
            bodyParagraph.textContent = threadBody;

            postDiv.appendChild(titleHeader);
            postDiv.appendChild(bodyParagraph);
            threadPostsContainer.appendChild(postDiv);
        });
    } else {
        console.log("No threads found in server 1."); // error message
    }
}

// prints all threads upon loading
document.addEventListener('DOMContentLoaded', printAllThreadPosts);


