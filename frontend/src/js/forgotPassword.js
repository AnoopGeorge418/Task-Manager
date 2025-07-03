document.addEventListener("DOMContentLoaded", () => {
  const sendOtpBtn = document.getElementById("sendOtpBtn");
  const verifyOtpBtn = document.getElementById("verifyOtpBtn");
  const resetPasswordBtn = document.getElementById("resetPasswordBtn");

  const forgotEmail = document.getElementById("forgotEmail");
  const otpInput = document.getElementById("otpInput");
  const newPassword = document.getElementById("newPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const message = document.getElementById("message");

  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");

  let generatedOtp = "";

  // STEP 1: Send OTP
  sendOtpBtn.onclick = () => {
    const forgotEmailInput = forgotEmail.value.trim();

    if (forgotEmailInput === "") {
      alert("⚠️ Please enter your registered email address.");
      return;
    }

    // Simulate sending OTP
    generatedOtp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    console.log("Generated OTP (simulated):", generatedOtp);

    // Store email in localStorage (or add to list if needed)
    let getEmail = JSON.parse(localStorage.getItem("UserEmailForForgotPassword")) || [];
    getEmail.push(forgotEmailInput);
    localStorage.setItem("UserEmailForForgotPassword", JSON.stringify(getEmail));

    // Show OTP step
    step1.classList.add("hidden");
    step2.classList.remove("hidden");
    message.textContent = `✅ OTP sent to your email (pretend). Check console for the code.`;
  };

  // STEP 2: Verify OTP
  verifyOtpBtn.onclick = () => {
    const otpEntered = otpInput.value.trim();

    if (otpEntered === "") {
      alert("⚠️ Please enter the OTP.");
      return;
    }

    if (otpEntered === generatedOtp) {
      message.textContent = "✅ OTP verified. Please reset your password.";
      step2.classList.add("hidden");
      step3.classList.remove("hidden");
    } else {
      alert("❌ Incorrect OTP. Try again.");
    }
  };

  // STEP 3: Reset password
  resetPasswordBtn.onclick = () => {
    const pass1 = newPassword.value.trim();
    const pass2 = confirmPassword.value.trim();

    if (pass1 === "" || pass2 === "") {
      alert("⚠️ Password fields cannot be empty.");
      return;
    }

    if (pass1 !== pass2) {
      alert("❌ Passwords do not match.");
      return;
    }

    // Simulate updating password in localStorage (just for frontend phase)
    const emails = JSON.parse(localStorage.getItem("UserEmailForForgotPassword")) || [];
    const latestEmail = emails[emails.length - 1];

    const userPasswords = JSON.parse(localStorage.getItem("UserPasswords")) || {};
    userPasswords[latestEmail] = pass1;
    localStorage.setItem("UserPasswords", JSON.stringify(userPasswords));

    message.textContent = "🔒 Password successfully reset! You can now log in.";
    window.location.href = './login.html'
    step3.classList.add("hidden");
  };
});
