document.addEventListener("DOMContentLoaded", () => {
    const navLoginBtn = document.getElementsByClassName("authBtn1")[0];
    const navSignUpBtn = document.getElementsByClassName("authBtn1")[1];

    const ctaLoginBtn = document.getElementsByClassName("authBtn2")[0];
    const ctaSignUpBtn = document.getElementsByClassName("authBtn2")[1];

    // Navbar Login Button Logic
    navLoginBtn.onclick = () => {
        window.location.href = "./pages/login.html";
    } 

    // Navbar SignUp Button Logic
    navSignUpBtn.onclick = () => {
        window.location.href = "./pages/signup.html"
    }

    // CTA Login Button Logic
    ctaLoginBtn.onclick = () => {
        window.location.href = "./pages/login.html"
    }

    // CTA Signup Button Logic
    ctaSignUpBtn.onclick = () => {
        window.location.href = "./pages/signup.html"
    }

});