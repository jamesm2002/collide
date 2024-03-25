const submitBtn = document.querySelector('.submit__btn')
const userName = document.querySelector('#user')
const count = document.querySelector('.count')
const commentsCont = document.querySelector('.comments__container')
submitBtn.addEventListener('click', submitFeedback)


feedbackArr = []
let positiveFeedback = false
let likesCount = 0

function submitFeedback(e){
    // get user name
    // get feedback
    const commentForm = comment.value 
    // if inputs are not empty
    if(commentForm !== ''){
        // create new feedback
        newFeedback = {
            "id": Math.floor((Math.random() * 1000)+ 1),
            "userComment": commentForm,
            "typeOfFeedback": positiveFeedback
        }
        // add new feedback to array
        feedbackArr.push(newFeedback)
        // if liked add to count
        if(positiveFeedback === true){
            addLikes()
        }
        // clear inputs 
        resetForm()
        // add feedback to list
        addFeedback(newFeedback)
    }


    e.preventDefault()
}

function resetForm(){
    comment.value = ''
    positiveFeedback = false
}

function addFeedback(item){
    // select first letter of the user name
    // create new div
    const div = document.createElement('div')
    // add class
    div.classList = 'comment__card'
    // add id
    div.id = item.id 
    // add html
    div.innerHTML = `
    <div class="pic center__display">
                </div>
                <div class="comment__info">
                    <small class="nickname">
                        123123123
                    </small>
                    <p class="comment">
                        ${item.userComment}
                    </p>
                    <div class="comment__bottom">
                        <div class="heart__icon--comment">
                            ${item.typeOfFeedback ? `<i class="fas fa-heart positive"></i>` : `<i class="far fa-heart"></i>`}
                        </div>
                        <h6>
                            Reply
                        <h6>
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
    formData.append('serverId', 1);
    formData.append('userId', 1);
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