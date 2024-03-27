// adds comments to threads
async function add_thread_comment(threadid, userid, text) {
    console.log("Adding comment...");
  
    const formData = new FormData();
    formData.append('threadId', threadid); 
    formData.append('userId', userid);
    formData.append('message', text);  
  
    try {
        const response = await fetch("https://softboxcollide.glitch.me/add_thread_comment", {
            method: "POST",
            mode: "cors",
            body: formData
        });

        if (response.ok) {
            location.reload();
            console.log("Comment added successfully!");
        } else {
            console.error("Failed to add comment:", response.statusText);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// loads all thread comments
async function get_thread_comment(threadid) {
    console.log("Adding comment...");
  
    const formData = new FormData();
    formData.append('threadId', threadid); 
  
    try {
        const response = await fetch("https://softboxcollide.glitch.me/get_all_comments_on_thread", {
            method: "POST",
            mode: "cors",
            body: formData
        });

        if (response.ok) {
            console.log("Comment loaded successfully!");
            const result = await response.json();
            console.log(result)
    return result;
        } else {
            console.error("Failed to add comment:", response.statusText);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

