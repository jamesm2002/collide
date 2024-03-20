

document.getElementById("loginform").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;


    var data = {
        username: username,
        password: password
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {

                console.log("Login successful!");
                window.location.href = "/homepage.html";
            } else {

                console.error("Login failed!");
                alert("Invalid username or password. Please try again.");
            }
        }
    };

    xhr.send(JSON.stringify(data));
});