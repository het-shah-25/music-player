import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import useAxios from "../../app/hook/useAxios";

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const { post } = useAxios();
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP. Check Your Mail for OTP");
      return;
    }

    try {
      await post("/auth/validate-otp", {
        email: localStorage.getItem("email"),
        otp,
      });
      localStorage.removeItem("email");
      navigate("/login");
    } catch (error) {
      notification.error({
        message: "OTP Verification Failed",
        description:
          error.message ||
          "An error occurred during OTP verification. Please try again.",
      });
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendDisabled(true);
      await post("/auth/resend-otp", { email: localStorage.getItem("email") });
      notification.success({
        message: "OTP Resent",
        description: "A new OTP has been sent to your email.",
      });
      // Re-enable resend button after a delay (e.g., 30 seconds)
      setTimeout(() => setResendDisabled(false), 30000);
    } catch (error) {
      notification.error({
        message: "Failed to Resend OTP",
        description:
          error.message ||
          "An error occurred while resending OTP. Please try again.",
      });
      setResendDisabled(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          OTP Verification
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter 6-digit OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              maxLength="6"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
          >
            Verify OTP
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Didn't receive the code?{" "}
          <a
            href="#"
            onClick={handleResendOtp}
            className={`text-purple-600 hover:text-purple-700 font-medium ${
              resendDisabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={resendDisabled}
          >
            {resendDisabled ? "Resend OTP in 30s" : "Resend OTP"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
