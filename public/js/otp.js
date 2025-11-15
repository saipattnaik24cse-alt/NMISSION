document.addEventListener("DOMContentLoaded", () => {
  const mobileForm = document.getElementById("mobile-form");
  const otpForm = document.getElementById("otp-form");
  const loginStep = document.getElementById("login-step");
  const otpStep = document.getElementById("otp-step");
  const otpInput = document.getElementById("otp-input");
  const otpInfo = document.getElementById("otp-info");

  let generatedOTP = null;
  let userMobile = null;

  // Step 1: Generate OTP
  mobileForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    userMobile = document.getElementById("mobile").value;
    if (!userMobile || userMobile.length < 10) {
      alert("Please enter a valid 10-digit mobile number!");
      return;
    }

    try {
      const response = await fetch("/generate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: userMobile })
      });
      const data = await response.json();
      generatedOTP = data.otp;

      loginStep.style.display = "none";
      otpStep.style.display = "flex";
      otpInfo.innerHTML = `<b>Demo OTP:</b> ${generatedOTP} <br>(for testing purpose)`;
    } catch (err) {
      console.error("Error generating OTP:", err);
    }
  });

  // Step 2: Verify OTP
  otpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const enteredOTP = otpInput.value;

    const response = await fetch("/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: userMobile, otp: enteredOTP })
    });

    const data = await response.json();

    if (data.success) {
      alert("✅ OTP Verified! Logged in successfully!");
      window.location.href = "/";
    } else {
      alert("❌ Incorrect OTP. Please try again.");
    }
  });
});
