// searches for all threads in a server
async function view_threads(serverid) {


  
    const formData = new FormData();
    formData.append('serverId', serverid); 
  
    const response = await fetch("https://softboxcollide.glitch.me/get_all_threads_in_server", {
      method: "POST",
      mode: "cors",
      body: formData
    });
  

    const result = await response.json();

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

    // assigns values to each thread based on threadtype
    let threadType;
    try {
        threadType = result[0].threadtype;
    } catch {
        threadType = result.threadPart[0].threadtype;
    }
    
    let thread;
    
    switch (threadType) {
        case 'Text':
            thread = {
                threadId: result[0].threadid,
                userId: result[0].creatorid,
                body: result[0].body,
                threadtype: threadType,
                title: result[0].title,
                doclink: 'n/a',
                image: 'n/a'
            };
            break;
        case 'Doc':
            thread = {
                threadId: result.threadPart[0].threadid,
                body: result.threadPart[0].body,
                userId: result.threadPart[0].creatorid,
                threadtype: threadType,
                title: result.threadPart[0].title,
                doclink: result.docPart[0].doclink,
                image: 'n/a'
            };
            break;
        case 'Image':
            thread = {
                threadId: result.threadPart[0].threadid,
                userId: result.threadPart[0].creatorid,
                body: result.threadPart[0].body,
                threadtype: threadType,
                title: result.threadPart[0].title,
                doclink:'n/a',
                image: result.imagePart && result.imagePart.length > 0 ? result.imagePart[0].image : 'n/a'
            };
            break;
        default:
            thread = {
                threadId: 1000000000000000000000000,
                body: 'error',
                threadtype: 'error',
                title: 'error',
                doclink: 'n/a',
                image: 'n/a'
            };
            break;
    }

    return thread;
}



// prints all threads 
async function print_threads(serverid) {
    const threadsResponse = await view_threads(serverid);
    const threadPostsContainer = document.getElementById('threadPostsContainer');

    if (threadsResponse && threadsResponse.length > 0) {
        for (let i = threadsResponse.length - 1; i >= 0; i--) {
            const thread = threadsResponse[i];
            print_thread(thread, threadPostsContainer);
        }
    } else {
    }
};

// prints an individual thread 
async function print_thread(thread, container) {
    const threadId = thread.threadid;
    const thread_value = await view_thread(threadId);
    
    const threadBody = thread_value.body;

    const postDiv = document.createElement('div');
    postDiv.classList.add('post-container');

    // Create user info div
    const user_info = await get_user_info(thread_value.userId);
    const userInfoDiv = document.createElement('div');
    userInfoDiv.classList.add('user-info');
    
    // Add username
    const usernameSpan = document.createElement('span');
    usernameSpan.classList.add('username');
    usernameSpan.textContent = user_info[0].username;
    userInfoDiv.appendChild(usernameSpan);

    postDiv.appendChild(userInfoDiv);

    // Create post body container div
    const postBodyContainer = document.createElement('div');
    postBodyContainer.classList.add('post-body-container');

    // Add post body paragraph
    const bodyParagraph = document.createElement('p');
    bodyParagraph.textContent = threadBody;
    postBodyContainer.appendChild(bodyParagraph);

    // Append post body container to post div
    postDiv.appendChild(postBodyContainer);

    // adds comments
    var thread_comments = await get_thread_comment(threadId);
    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('comments-container');

    if (thread_comments.length > 0) {
        for (let i = 0; i < thread_comments.length; i++) {
            const comment = thread_comments[i];
            const user_info_comment = await get_user_info(comment.userid);

            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');

            const usernameSpan = document.createElement('span');
            usernameSpan.textContent = user_info_comment[0].username + ': ';
            usernameSpan.classList.add('comment-username');
            commentDiv.appendChild(usernameSpan);

            const commentTextSpan = document.createElement('span');
            commentTextSpan.textContent = comment.message;
            commentTextSpan.classList.add('comment-text');
            commentDiv.appendChild(commentTextSpan);

            commentsContainer.appendChild(commentDiv);
        }
    } else {
        const noCommentsMessage = document.createElement('p');
        noCommentsMessage.textContent = "No comments yet for this thread.";
        commentsContainer.appendChild(noCommentsMessage);
    }

// Append the comments container to the postDiv
postDiv.appendChild(commentsContainer);
    // comments
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add comment...';
    commentInput.classList.add('comment-input');

    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comment';
    commentButton.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        if (commentText !== '') {
            console.log(`Adding comment "${commentText}" to thread ${threadId}`);
            add_thread_comment(threadId, userId, commentText);
            commentInput.value = '';
            
        }
    });

    postDiv.appendChild(commentInput);
    postDiv.appendChild(commentButton);

    // logic for delete button
    const loggedInUserId = parseInt(localStorage.getItem("userId")); 
    const threadUserId = thread_value.userId; // Assuming thread_value.userId is also a string

    if (loggedInUserId === threadUserId) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', async () => {
            await delete_thread(thread_value.threadId);
            postDiv.remove();
        });
        postDiv.appendChild(deleteButton);
    }

    // creates different threads based on types
    if (thread_value.threadtype === 'Image') {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        postBodyContainer.appendChild(imageContainer); 
        await get_image(thread_value.image, imageContainer);
    } else if (thread_value.doclink && thread_value.doclink !== 'n/a') {
        const link = document.createElement('a');
        link.textContent = threadBody;
        link.href = `quill/quill.html?threadId=${threadId}`;
        postBodyContainer.appendChild(link);
    } else {
        bodyParagraph.textContent = threadBody;
    }

    container.appendChild(postDiv);
}

// gets the image from the database
async function get_image(image, postDiv) {
  
    let formData = new FormData();
    let imageName = image;
    formData.append('imageName', imageName);

    const response = await fetch("http://softboxcollide.glitch.me/get_image", {
        method: "POST",
        mode: "cors",
        body: formData
    });
    
    const imageBlob = await response.blob();
    const imageURL = URL.createObjectURL(imageBlob);

    const imageElement = document.createElement("img");
    imageElement.src = imageURL;
    imageElement.classList.add('post-image');

    postDiv.appendChild(imageElement);
    }

// gets the users info
async function get_user_info(userId) {
    const formData = new FormData();
    formData.append('userId', userId);

    const response = await fetch("http://softboxcollide.glitch.me/get_user_info", {
        method: "POST",
        mode: "cors",
        body: formData
    });

    const result = await response.json();
    
    return result;
    
}

async function delete_thread(threadId) {
    const formData = new FormData();
    formData.append('threadId', threadId);

    const response = await fetch("http://softboxcollide.glitch.me/delete_thread", {
        method: "POST",
        mode: "cors",
        body: formData
    });
}
