
const submitBtn = document.querySelector('.submit__btn')
const userName = document.querySelector('#user')
const count = document.querySelector('.count')
const commentsCont = document.querySelector('.commentscont')
submitBtn.addEventListener('click', submitFeedback)


feedbackArr = []
let positiveFeedback = false
let likesCount = 0

function submitFeedback(e) {
    // get user name
    // get feedback
    const commentForm = comment.value
    // if inputs are not empty
    if (commentForm !== '') {
        // create new feedback
        newFeedback = {
            "id": Math.floor((Math.random() * 1000) + 1),
            "userComment": commentForm,
            "typeOfFeedback": positiveFeedback
        }
        // add new feedback to array
        feedbackArr.push(newFeedback)
        // if liked add to count
        if (positiveFeedback === true) {
            addLikes()
        }
        // clear inputs 
        resetForm()
        // add feedback to list
        addFeedback(newFeedback)
    }


    e.preventDefault()
}

function resetForm() {
    comment.value = ''
    positiveFeedback = false
}

function addFeedback(item) {
    const userId = localStorage.getItem("userId");
    // select first letter of the user name
    // create new div
    const div = document.createElement('div')
    // add class
    div.classList = 'comment-card'
    // add id
    div.id = item.id
    // add html
    div.innerHTML = `
    <div class="pic">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 90 90">
        <path
            d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 45 22.007 c 8.899 0 16.14 7.241 16.14 16.14 c 0 8.9 -7.241 16.14 -16.14 16.14 c -8.9 0 -16.14 -7.24 -16.14 -16.14 C 28.86 29.248 36.1 22.007 45 22.007 z M 45 83.843 c -11.135 0 -21.123 -4.885 -27.957 -12.623 c 3.177 -5.75 8.144 -10.476 14.05 -13.341 c 2.009 -0.974 4.354 -0.958 6.435 0.041 c 2.343 1.126 4.857 1.696 7.473 1.696 c 2.615 0 5.13 -0.571 7.473 -1.696 c 2.083 -1 4.428 -1.015 6.435 -0.041 c 5.906 2.864 10.872 7.591 14.049 13.341 C 66.123 78.957 56.135 83.843 45 83.843 z"
            fill="black"></path>
    </svg>
    <small class="nickname">User ${userId}</small>
</div>
<div class="comment__info">
    <p class="comments">${item.userComment}</p> <!-- Dynamic userComment -->
    <div class="comment__bottom">
        <div class="heart__icon--comment">
            <i class="far fa-heart"></i>
        </div>
        <button>Delete</button>
    </div>
</div>
    `
    
    // insert feedback into the list
    commentsCont.insertAdjacentElement('beforeend', div)
}
async function addGeneralComment() {
    console.log("Adding general comment...");

    const message = document.getElementById('comment').value.toString();

    const formData = new FormData();
    formData.append('serverId', serverId);
    formData.append('userId', userId);
    formData.append('message', message);

    await fetch("https://softboxcollide.glitch.me/add_general_comment", {
        method: "POST",
        mode: "cors",
        body: formData
    });

    // Success message or handling could be implemented here.
    console.log("General comment added successfully");
}

async function deleteGeneralComment(generalCommentId) {
    console.log("Deleting general comment...");

    const formData = new FormData();
    formData.append('generalCommentId', generalCommentId);

    await fetch("https://softboxcollide.glitch.me/delete_general_comment", {
        method: "POST",
        mode: "cors",
        body: formData
    });

    // Success message or handling could be implemented here.
    console.log("General comment deleted successfully");
}