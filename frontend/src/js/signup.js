document.addEventListener("DOMContentLoaded", () => {
  const forgotPasswordBtn = document.getElementsByClassName("forgotPassword")[0];
  const signUpBtn = document.getElementsByClassName("signUpLinkText")[0];
  const loginBtn = document.getElementById("loginBtn");

  // forgotPassword Logic
  forgotPasswordBtn.onclick = () => {
    window.location.href = './forgotPassword.html';
  };

  // signUp Logic
  signUpBtn.onclick = () => {
    window.location.href = './signup.html';
  };

  // loginBtn Logic
  loginBtn.onclick = async () => {
    const userEmail = document.getElementById("userEmail").value.trim();
    const userPassword = document.getElementById("userPassword").value;

    if (!userEmail || !userPassword) {
      alert("⚠️ Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: userEmail, password: userPassword })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`✅ Welcome, ${data.user.username}!`);
        window.location.href = "./dashboard.html";
      } else {
        alert(`❌ ${data.msg || "Login failed"}`);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("❌ Server error while logging in.");
    }
  };

  // signupBtn Logic (moved from signup.js)
  const signUpBtnElement = document.getElementById("signupBtn1");
  if (signUpBtnElement) {
    signUpBtnElement.onclick = async () => {
      const userName = document.getElementById("userName").value.trim();
      const userEmail = document.getElementById("userEmail").value.trim();
      const userPassword = document.getElementById("userPassword").value;
      const userConfirmedPassword = document.getElementById("userConfirmPassword").value;

      if (!userName || !userEmail || !userPassword || !userConfirmedPassword) {
        alert("⚠️ All fields are required.");
        return;
      }

      if (userPassword !== userConfirmedPassword) {
        alert("❌ Passwords do not match.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username: userName, email: userEmail, password: userPassword })
        });

        const data = await response.json();

        if (response.ok) {
          alert("✅ Account created successfully!");
          window.location.href = "./login.html";
        } else {
          alert(`❌ ${data.msg || "Signup failed"}`);
        }
      } catch (err) {
        alert("❌ Server error during signup.");
        console.error("Signup error:", err);
      }
    };
  }
});
