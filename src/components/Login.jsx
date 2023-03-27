import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../utils/Axios';
import { UserContext } from '../utils/userContext';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Login() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [contextUser, setContextUser] = userContext;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    try {
      Axios.post("/api/v1/users/login", { email, password }).then((res) => {
        console.log(res);
        navigate("/predict");
        setContextUser({...contextUser, isLoggedIn: true, username: res.data.user.name, authToken: res.data.token })
        Axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        localStorage.setItem("$AUTH_TOKEN", res.data.token);
        localStorage.setItem("$USER_ID", res.data.user._id);
        localStorage.setItem("username", res.data.user.name);
        localStorage.setItem("isLoggedIn", "true");
      }).catch((err) => {
        console.log(err);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Similar to ./SignUp.jsx component but with different form fields
  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-177px)] bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h7a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Login
                </button>
                <div className="mt-2 text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a
                    onClick={() => navigate("/signup")}
                    className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline cursor-pointer"
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
