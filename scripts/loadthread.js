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

// returns an array of all values for a thread
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
        const thread = {
            threadId: result[0].threadid,
            body: result[0].body,
            threadtype: result[0].threadtype,
            title: result[0].title
        };
        return thread;
    } catch {
        const thread = {
            threadId: result.threadPart[0].threadid,
            body: result.threadPart[0].body,
            threadtype: result.threadPart[0].threadtype,
            title: result.threadPart[0].title
        };
        return thread;
    }
}


// prints all threads
  async function print_threads() {
    const threadsResponse = await view_threads();
    console.log(threadsResponse)
    const threadPostsContainer = document.getElementById('threadPostsContainer');

    if (threadsResponse && threadsResponse.length > 0) {
        console.log("Printing posts of all threads in server 1:");

        for (const thread of threadsResponse) {
           
            const threadId = thread.threadid;
            
            const thread_value = await view_thread(threadId);
            console.log(thread_value.body);
            
            const threadBody = thread_value.body;

            const postDiv = document.createElement('div');
            postDiv.classList.add('post-container');

            const bodyParagraph = document.createElement('p');
            bodyParagraph.textContent = threadBody;

            postDiv.appendChild(bodyParagraph);
            threadPostsContainer.appendChild(postDiv);
        }
    } else {
        console.log("No threads found in server 1."); // error message
    }
}

// prints all threads upon loading
document.addEventListener('DOMContentLoaded', print_threads);