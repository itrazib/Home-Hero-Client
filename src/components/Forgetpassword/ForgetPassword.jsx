import React, { useContext, useState } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const ForgetPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire("Oops!", "Please enter your email address!", "warning");
      return;
    }

    resetPassword(email)
      .then(() => {
        Swal.fire(
          "Email Sent!",
          "Check your inbox for a password reset link.",
          "success"
        );
        setEmail("");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", error.message, "error");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100 inter-font">
      <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-2 text-gradient">
          Reset Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email and we’ll send you a reset link.
        </p>

        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-orange-400 via-pink-500 to-violet-600 shadow-lg hover:scale-105 transform transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
