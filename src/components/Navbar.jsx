import React, { useContext, useEffect, useState } from "react";

import { CubeTransparentIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import { UserContext } from "../utils/userContext";

export default function Navbar() {
  const navigate = useNavigate();

  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const location = useLocation();
  const [contextUser, setContextUser] = useContext(UserContext);

  const [currentPage, setCurrentPage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("false");

  useEffect(() => {
    const page = location.pathname.split("/")[1];
    setCurrentPage(page);
    Axios.defaults.headers.common = {
      Authorization: `Bearer ${contextUser.authToken}`,
    };
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  const handleLogout = () => {
    setContextUser({
      ...contextUser,
      isLoggedIn: false,
      username: "",
      authToken: "",
    });
    localStorage.removeItem("$AUTH_TOKEN");
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center">
          <CubeTransparentIcon className="w-12 text-gray-900 mr-3" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-gray-900">
            Neural Classify
          </span>
        </a>
        <button
          onClick={handleClick}
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm  rounded-lg md:hidden  focus:ring-2 hover:bg-gray-700 focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={
            nav
              ? "w-full md:block md:w-auto"
              : "hidden w-full md:block md:w-auto"
          }
        >
          <ul className="flex flex-col p-4 mt-4 border font-bold rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
            <li>
              <a
                onClick={() => navigate("/")}
                className={
                  currentPage === ""
                    ? "block py-2 pl-3 pr-4 rounded md:p-0 text-white md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
                    : "block py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
                }
              >
                Home
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/about")}
                className={
                  currentPage === "about"
                    ? "block py-2 pl-3 pr-4 rounded md:p-0 text-white md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
                    : "block py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
                }
              >
                About
              </a>
            </li>
            {isLoggedIn === "true" && (
              <>
              <li>
                <a
                  onClick={() => navigate("/predict")}
                  className={
                    currentPage === "predict"
                      ? "block py-2 pl-3 pr-4 rounded md:p-0 text-white md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
                      : "block py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
                  }
                >
                  Predict
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/upload")}
                  className={
                    currentPage === "upload"
                      ? "block py-2 pl-3 pr-4 rounded md:p-0 text-white md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
                      : "block py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
                  }
                >
                  Upload to Dataset
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/uploads")}
                  className={
                    currentPage === "uploads"
                      ? "block py-2 pl-3 pr-4 rounded md:p-0 text-white md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
                      : "block py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
                  }
                >
                  Uploads
                </a>
              </li>
              </>
            )}
            <li className="border border-y-white" />
            <li className="border border-y-white" />
            {isLoggedIn === "false" || isLoggedIn === null ? (
              <>
                <li>
                  <a
                    onClick={() => navigate("/signup")}
                    className={
                      currentPage === "signup"
                        ? "block py-2 pl-3 pr-4 rounded md:p-0 text-white md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
                        : "block py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
                    }
                  >
                    Sign Up
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/login")}
                    className={
                      currentPage === "login"
                        ? "block py-2 pl-3 pr-4 rounded md:p-0 text-white md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
                        : "block py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
                    }
                  >
                    Login
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="flex gap-2 text-orange-400">
                  <UserCircleIcon className="w-6 h-6 relative bottom-0.5" />
                  {contextUser.username}
                </li>
                <li
                  className="block py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
