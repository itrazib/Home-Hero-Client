import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const { signIngoogle, signInEmail} = useContext(AuthContext);

  const Navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const email = e.target.email.value;

    signInEmail(email, password)
    .then(result => {
      console.log(result.user)
      Navigate(location.state || '/')
    })
    .catch(err => {
      console.log(err.message)
    })
  };

  const handleGoogleSignIn = () => {
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-2 text-gradient">
          Login
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Don't have an account?{" "}
          <a
            onClick={() => Navigate("/register")}
            href="/register"
            className=" font-medium hover:underline text-gradient"
          >
            Register Now
          </a>
        </p>

        {/* Email */}
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="text-right mb-5">
            <a
              href="#"
              className="text-sm text-purple-600 hover:underline text-gradient"
            >
              Forgot password?
            </a>
          </div>

          {/* Sign In button */}
          <button className="w-full py-2  text-white font-semibold rounded-lg bg-gradient-to-r from-orange-400 via-pink-500 to-violet-600 shadow-lg hover:scale-105 transform transition">
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Sign-in */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-2 flex justify-center items-center gap-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
        >
          <FcGoogle className="text-xl" />
          <span className="font-medium">Sign In With Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
