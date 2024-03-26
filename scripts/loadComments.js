// Run the function when the page is fully loaded
async function getAllCommentsInServer() {
    console.log("Fetching all comments in server...");

    const formData = new FormData();
    formData.append('serverId', serverId);

    const response = await fetch("https://softboxcollide.glitch.me/get_all_comments_in_server", {
        method: "POST",
        mode: "cors",
        body: formData
    });

    const result = await response.json();
    console.log(result);
    return result;
}

async function printAllComments() {
    const commentsResponse = await getAllCommentsInServer(); // Gets a list of comments
    const commentsContainer = document.getElementById('theContainer');

    if (commentsResponse && commentsResponse.length > 0) {
        commentsResponse.forEach(comment => {
            // Create the main comment card container
            const commentCard = document.createElement('div');
            commentCard.classList.add('comment-card');

            // User picture
            const picDiv = document.createElement('div');
            picDiv.classList.add('pic');
            // Directly setting SVG string as innerHTML of picDiv
            picDiv.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 90 90">
                    <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 45 22.007 c 8.899 0 16.14 7.241 16.14 16.14 c 0 8.9 -7.241 16.14 -16.14 16.14 c -8.9 0 -16.14 -7.24 -16.14 -16.14 C 28.86 29.248 36.1 22.007 45 22.007 z M 45 83.843 c -11.135 0 -21.123 -4.885 -27.957 -12.623 c 3.177 -5.75 8.144 -10.476 14.05 -13.341 c 2.009 -0.974 4.354 -0.958 6.435 0.041 c 2.343 1.126 4.857 1.696 7.473 1.696 c 2.615 0 5.13 -0.571 7.473 -1.696 c 2.083 -1 4.428 -1.015 6.435 -0.041 c 5.906 2.864 10.872 7.591 14.049 13.341 C 66.123 78.957 56.135 83.843 45 83.843 z" fill="black"/>
                </svg>
            `;


            // Comment information section
            const commentInfoDiv = document.createElement('div');
            commentInfoDiv.classList.add('comment__info');

            const userNickname = document.createElement('small');
            userNickname.classList.add('nickname');
            userNickname.textContent = `User ${comment.userid}`;

            const userComment = document.createElement('p');
            userComment.classList.add('comments');
            userComment.textContent = comment.message;

            // Comment bottom section (like, reply, delete)
            const commentBottomDiv = document.createElement('div');
            commentBottomDiv.classList.add('comment__bottom');

            // Like icon
            const likeIcon = document.createElement('div');
            likeIcon.classList.add('heart__icon--comment');
            likeIcon.innerHTML = `<i class="far fa-heart"></i>`;

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            // Add an event listener to this button
            deleteButton.addEventListener('click', function() {
                deleteGeneralComment(comment.generalcommentid).then(() => {
                    // Optionally, remove the comment from the DOM after deletion
                    commentCard.remove();
                    // Or refresh the comments list, if you prefer
                });
            });

            // Assemble the comment card
            commentBottomDiv.appendChild(likeIcon);
            commentBottomDiv.appendChild(deleteButton);

            picDiv.appendChild(userNickname);
            commentInfoDiv.appendChild(userComment);
            commentInfoDiv.appendChild(commentBottomDiv);

            commentCard.appendChild(picDiv);
            commentCard.appendChild(commentInfoDiv);

            // Finally, append the comment card to the container
            commentsContainer.appendChild(commentCard);
        });
    } else {
        console.log("No comments found.");
    }
}


document.addEventListener('DOMContentLoaded', printAllComments);