// searches for all threads in a server
async function view_threads() {
  
    const formData = new FormData();
    formData.append('serverId', 1); 
  
    const response = await fetch("https://softboxcollide.glitch.me/get_all_threads_in_server", {
      method: "POST",
      mode: "cors",
      body: formData
    });
  
    const result = await responsexjson();
    console.log(result)
    return result;
  }

// returns an array of all values for a thread
async function view_thread(threadId) {
  
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
            title: result[0].title,
            doclink: 'n/a'
        };
        return thread;
    } catch {
        try {
            const thread = {
                threadId: result.threadPart[0].threadid,
                body: result.threadPart[0].body,
                threadtype: result.threadPart[0].threadtype,
                title: result.threadPart[0].title,
                doclink: result.docPart[0].doclink
            };
            return thread;
        } catch (innerError) {
            console.error("Error processing thread:", innerError);
            return { threadId: null, body: "Error retrieving thread", threadtype: null, title: "Error", doclink: 'n/a' };
        }
    }
}


// prints all threads 
  async function print_threads() {
    const threadsResponse = await view_threads();
    const threadPostsContainer = document.getElementById('threadPostsContainer');

    if (threadsResponse && threadsResponse.length > 0) {
        console.log("Printing posts of all threads in server 1:");

        for (const thread of threadsResponse) {
           
            const threadId = thread.threadid;
            
            const thread_value = await view_thread(threadId);

            const threadBody = thread_value.body;

            const postDiv = document.createElement('div');
            postDiv.classList.add('post-container');

            const bodyParagraph = document.createElement('p');
            
            if (thread_value.doclink && thread_value.doclink !== 'n/a') {
                // If doclink exists and is not 'n/a', assume it's a document file
                const link = document.createElement('a');
                link.textContent = "View Document";
                link.href = `quill/quill.html?threadId=${threadId}`;
                bodyParagraph.appendChild(link);
            } else {
                bodyParagraph.textContent = threadBody;
            }

            postDiv.appendChild(bodyParagraph);
            threadPostsContainer.appendChild(postDiv);
        }
    } else {
        console.log("No threads found in server 1."); // error message
    }
}

// prints all threads upon loading
document.addEventListener('DOMContentLoaded', print_threads);