import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const Register = () => {
  const { createUser, setUser, signIngoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const image = e.target.image.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long and contain one uppercase and one lowercase letter."
      );
      return; 
    } else {
      setError(""); 
    }

    const user = {
      displayName: name,
      photoURL: image,
      email: email,
    };

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        setUser(user);
        Navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  const handleGoogleSignup = () => {
    signIngoogle()
      .then((result) => {
        console.log(result.user);
        Navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100 inter-font">
      <title>Register</title>
      <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-2xl p-8 transform hover:scale-105 transition duration-300">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-2 text-gradient">
          Register Now!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Already have an account?{" "}
          <a
            onClick={() => Navigate("/login")}
            className="text-gradient font-medium hover:underline cursor-pointer"
          >
            Login Now
          </a>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="Enter image URL"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

          {/* Register button */}
          <button
            type="submit"
            className="w-full py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-orange-400 via-pink-500 to-violet-600 shadow-lg hover:scale-105 transform transition"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Sign Up */}
        <button
          onClick={handleGoogleSignup}
          className="w-full py-2 flex justify-center items-center gap-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
        >
          <FcGoogle className="text-xl" />
          <span className="font-medium">Sign Up With Google</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
