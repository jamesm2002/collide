async function getuserinfo() {
    const formData = new FormData();
    formData.append('userId', userId); // Make sure `userId` is defined or retrieved from somewhere

    const response = await fetch("https://softboxcollide.glitch.me/get_user_info", {
        method: "POST",
        mode: "cors",
        body: formData
    });
    

    const result = await response.json();
    // Assuming the username field in the result is named 'username'
    if (result.username) {
        document.getElementById('username').textContent = result.username;
    }
    return result;
}

function toggleMenu(){
    let subMenu = document.getElementById("subMenu");
    subMenu.classList.toggle("open-menu");
}


function handleUserPicClick() {
    toggleMenu();
    getuserinfo();
}
