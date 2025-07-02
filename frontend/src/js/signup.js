document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementsByClassName("loginLink")[0];
    const signUpBtn = document.getElementById("signupBtn1");

    // 🔁 Redirect to login page
    loginBtn.onclick = () => {
        window.location.href = "./login.html";
    }

    // signUp Btn Logic
    signUpBtn.onclick = () => {
        try {
            // Gettting all inputs from users
            const userName = document.getElementById("userName").value.trim();
            const userEmail = document.getElementById("userEmail").value.trim();
            const userPassword = document.getElementById("userPassword").value;
            const userConfirmedPassword = document.getElementById("userConfirmPassword").value;

            // checking if user missed any feilds
            if (!userName || !userEmail | !userPassword || !userConfirmedPassword) {
                throw new Error("All fields are required.");
            }

            // 🔐 Password match check
            if (userPassword !== userConfirmedPassword) {
                throw new Error("Password didn't matched!");
            }

            // 📦 Fetch users from localStorage
            let users = JSON.parse(localStorage.getItem("userCredentials")) || [];

            // ❌ Check for duplicate email
            const exists = users.some(user => user.email === userEmail);
            if (exists) {
                throw new Error(`Email already exists. Please login.`);
            }

            users.push({
                username: userName,
                email: userEmail,
                password: userPassword
            });

            localStorage.setItem("userCredentials", JSON.stringify(users));

            alert("✅ Account created successfully!");
            console.log("User added:", { userName, userEmail });

            window.location.href = "./login.html";

        } catch (err) {
            alert(`Error: ${err.message}`);
            console.log(`Signup Error: ${err.name, err.message}`);;
        } finally {
            console.log(`Signup attempt complete. Cleaned up!`);
            
        }
    }
});


// TODO: // 3. export the usercredentials to login - use localstorage 
