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

  let userEmail = "";

  // STEP 1: Send OTP
  sendOtpBtn.onclick = async () => {
    const forgotEmailInput = forgotEmail.value.trim();

    if (forgotEmailInput === "") {
      alert("⚠️ Please enter your registered email address.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmailInput })
      });

      const data = await res.json();

      if (res.ok) {
        message.textContent = "✅ OTP sent to your email (check console for now)";
        console.log("Generated OTP:", data.otp); // Simulated for frontend testing

        userEmail = forgotEmailInput;
        step1.classList.add("hidden");
        step2.classList.remove("hidden");
      } else {
        alert(data.msg || "Something went wrong.");
      }
    } catch (err) {
      alert("❌ Failed to send OTP");
      console.error(err);
    }
  };

  // STEP 2: Verify OTP
  verifyOtpBtn.onclick = async () => {
    const otpEntered = otpInput.value.trim();

    if (otpEntered === "") {
      alert("⚠️ Please enter the OTP.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, otp: otpEntered })
      });

      const data = await res.json();

      if (res.ok) {
        message.textContent = "✅ OTP verified. Please reset your password.";
        step2.classList.add("hidden");
        step3.classList.remove("hidden");
      } else {
        alert(data.msg || "❌ Incorrect OTP");
      }
    } catch (err) {
      alert("❌ Failed to verify OTP");
      console.error(err);
    }
  };

  // STEP 3: Reset password
  resetPasswordBtn.onclick = async () => {
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

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, newPassword: pass1 })
      });

      const data = await res.json();

      if (res.ok) {
        message.textContent = "🔒 Password successfully reset!";
        window.location.href = "./login.html";
      } else {
        alert(data.msg || "❌ Failed to reset password");
      }
    } catch (err) {
      alert("❌ Server error while resetting password");
      console.error(err);
    }
  };
});
