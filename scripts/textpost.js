
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
  