async function addUser() {
    
    // Get data from screen
    username = document.getElementById('usernameBox').value;
    email = document.getElementById('emailBox').value;
    firstname = document.getElementById('firstnameBox').value;
    surname = document.getElementById('surnameBox').value;
    password1 = document.getElementById('passwordBox1').value;
    password2 = document.getElementById('passwordBox2').value;

    if (username=="" || email=="" || firstname=="" || surname=="" || password1=="") {
        alert("Please fill in all fields.");
        return 1;
    }

    if (!document.getElementById('ageCheck').checked) {
        alert("You must be 13 or older to use this site. If you are older than 13, check the box to continue.");
        return 1;
    }

    if (password1 != password2) {
        alert("The two passwords you inserted do not match.");
        return 1;
    }



    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password1);
    formData.append('email', email);
    formData.append('gender', "");
    formData.append('firstname', firstname);
    formData.append('surname', surname);
    
    const response = await fetch("https://softboxcollide.glitch.me/add_new_user", {
    method: "POST",
    mode: "cors",
    body: formData
    });
    
    const result = await response.json();

    if (result.code == 'ER_DUP_ENTRY') {
        alert("An account with this email already exists");
        return 1;
    }

    alert("Registration Successful! You can now login!"); // only gets here if there are no errors
    return 0;
}

async function login() {
    
    // Get data from screen
    email = document.getElementById('emailBox').value;
    password = document.getElementById('passwordBox').value;

    // generate request body
    let formData = new FormData();
    formData.append('email', email);

    // send request
    const response = await fetch("https://softboxcollide.glitch.me/get_user_pass", {
    method: "POST",
    mode: "cors",
    body: formData
    });
    
    const result = await response.json();

    // check that email exists in database
    if (result.code == 'ER_DUP_ENTRY') {
        alert("An account with this email already exists");
        return 1;
    } 

    let userId = 0;
    try {
        if (password == result[0].password) {
            // get user's id
            let formData = new FormData();
            formData.append('email', email);

            const response = await fetch("https://softboxcollide.glitch.me/get_user_id", {
            method: "POST",
            mode: "cors",
            body: formData
            });
            
            const result = await response.json();
            userId = result;
        } else {
            alert("Incorrect password. Please check your password and try again.");
            return 1;
        }
    } catch {
        alert("An account does not exist using this email.");
        return 1;
    }

    localStorage.setItem("userId", userId);
    //console.log(localStorage.getItem("userId"));
    window.location.href = 'homepage.html';
    return 0;
  }
