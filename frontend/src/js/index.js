document.addEventListener("DOMContentLoaded", () => {
    const loginBtnRedirect = document.getElementsByClassName("authBtn1")[0];
    const signupBtnRedirect = document.getElementsByClassName("authBtn1")[1];
    const loginBtnRedirect2 = document.getElementsByClassName("authBtn2")[0];
    const signupBtnRedirect2 = document.getElementsByClassName("authBtn2")[1];
    const appLogo = document.getElementsByClassName("appLogo")[0];

    loginBtnRedirect.onclick = () => {
        window.location.href = "./pages/login.html";
    }

    loginBtnRedirect2.onclick = () => {
        window.location.href = "./pages/login.html";
    }

    signupBtnRedirect.onclick = () => {
        window.location.href = "./pages/signup.html";
    }

    signupBtnRedirect2.onclick = () => {
        window.location.href = "./pages/signup.html";
    }

    appLogo.onclick = () => {
        window.location.href = "./index.html";
    }

});