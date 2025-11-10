import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const Register = () => {
  const{ createUser, setUser,  signIngoogle } = useContext(AuthContext)
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const image = e.target.image.value;
    const user = {
      displayName : name,
      photoURL: image,
      email: email
    }
    // console.log(user)
     
    createUser(email, password)
    .then(result => {
      console.log(result.user)
      setUser(user)
      Navigate('/')
    })
    .catch(err => {
      console.log(err.message)
    })
  
  }
  
  const handleGoogleSignup = () => {
    console.log("clicks");
    signIngoogle()
      .then((result) => {
        console.log(result.user);
        Navigate(location.state || "/");
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 inter-font">
      <title>Register</title>
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-2 text-gradient">
          Register Now!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Already have an account?{" "}
          <a
            onClick={() => Navigate("/login")}
            href="/login"
            className="text-gradient font-medium hover:underline"
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
            />
          </div>

          {/* Register button */}
          <button className="w-full py-2  text-white font-semibold rounded-lg bg-gradient-to-r from-orange-400 via-pink-500 to-violet-600 shadow-lg hover:scale-105 transform transition">
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
        <button onClick={handleGoogleSignup} className="w-full py-2 flex justify-center items-center gap-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all">
          <FcGoogle className="text-xl" />
          <span className="font-medium">Sign Up With Google</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
