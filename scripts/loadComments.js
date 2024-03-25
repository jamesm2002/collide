// Run the function when the page is fully loaded


async function getAllCommentsInServer() {
    console.log("Fetching all comments in server...");

    const formData = new FormData();
    formData.append('serverId', 1);

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
            commentCard.classList.add('comment__card');

            // User initial or picture
            const picDiv = document.createElement('div');
            picDiv.classList.add('pic', 'center__display');
            // You can adjust this to actually show a user picture or initial

            // Comment information section
            const commentInfoDiv = document.createElement('div');
            commentInfoDiv.classList.add('comment__info');

            // User nickname
            const userNickname = document.createElement('small');
            userNickname.classList.add('nickname');
            userNickname.textContent = comment.userName; // Assuming userName is the correct property

            // User comment
            const userComment = document.createElement('p');
            userComment.classList.add('comments');
            userComment.textContent = comment.userComment; // Assuming userComment is the correct property

            // Comment bottom section (like & reply)
            const commentBottomDiv = document.createElement('div');
            commentBottomDiv.classList.add('comment__bottom');

            // Like icon
            const likeIcon = document.createElement('div');
            likeIcon.classList.add('heart__icon--comment');
            likeIcon.innerHTML = `<i class="far fa-heart"></i>`; // This sets the icon, adjust as needed

            // Reply button
            const replyButton = document.createElement('button');
            replyButton.textContent = 'Reply';

            // Assemble the comment card
            commentBottomDiv.appendChild(likeIcon);
            commentBottomDiv.appendChild(replyButton);

            commentInfoDiv.appendChild(userNickname);
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
document.addEventListener('DOMContentLoaded', getAllCommentsInServer);
document.addEventListener('DOMContentLoaded', printAllComments);