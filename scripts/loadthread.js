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
    try {
      type = result[0].threadtype;
      return result[0].body;
    } catch {
      type = result.threadPart[0].threadtype;
      return result.threadPart[0].body;
     
    }

  }

  async function print_threads() {
    const threadsResponse = await view_threads();
    console.log('threadsResponse')
    const threadPostsContainer = document.getElementById('threadPostsContainer');

    if (threadsResponse && threadsResponse.length > 0) {
        console.log("Printing posts of all threads in server 1:");

        for (const thread of threadsResponse) {
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
        }
    } else {
        console.log("No threads found in server 1."); // error message
    }
}

// prints all threads upon loading
document.addEventListener('DOMContentLoaded', print_threads);