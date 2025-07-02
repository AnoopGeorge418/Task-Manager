document.addEventListener("DOMContentLoaded", () => {
    const forgotPasswordBtn = document.getElementsByClassName("forgotPassword")[0];
    const signUpBtn = document.getElementsByClassName("signUpLinkText")[0];
    const loginBtn = document.getElementById("loginBtn");

    // forgotPassword Logic
    forgotPasswordBtn.onclick = () => {
        window.location.href = './forgotPassword.html';
    }

    // signUo Logic
    signUpBtn.onclick = () => {
        window.location.href = './signup.html';
    }

    // loginBtn Logic
    loginBtn.onclick = () => {
        try {
            const userEmail = document.getElementById("userEmail").value.trim();
            const userPassword = document.getElementById("userPassword").value; 

            // loading users
            const users = JSON.parse(localStorage.getItem("userCredentials")) || [];

            // checking if user exisys and password matches
            const validUser = users.find(user => user.email === userEmail && user.password === userPassword);
            if (validUser) {
                alert(`✅ Welcome, ${validUser.username}!`);
                window.location.href = "./dashboard.html"
            } else {
                throw new Error(`Invalid email or password!`)
            }
        } catch(err){
            console.log(err);
        }
        
    }
});