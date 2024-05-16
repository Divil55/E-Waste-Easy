import React, { useState } from "react";
import Navbar from "./Navbar";
import logo from "../logo.svg";
import "./login.css";
import { storeTokensInCookie } from "./Cookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [loginType, setLoginType] = useState("user");
  const toggleLoginType = (type) => {
    setLoginType(type);
  };
  const showToastMessage = () => {
    toast.success("Successfully Logged In !", { autoClose: 1600 });
  };
  const showErrorMessage = () => {
    toast.error("Invalid Username or Password !", { autoClose: 1600 });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(Object.fromEntries(formData).email);

    try {
      let url = "";
      if (loginType === "user") {
        url = "http://localhost:5000/userlogin";
      } else if (loginType === "dealer") {
        url = "http://localhost:5000/dealerlogin";
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (response.ok) {
        // Handle successful login
        console.log("Login successful");
        storeTokensInCookie(Object.fromEntries(formData).userName);
        showToastMessage();
        if (loginType == "user") {
          setTimeout(() => {
            window.location.href = "http://localhost:3000";
          }, 2000);
        } else {
          window.location.href = "http://localhost:3000/dealer/dashboard";
        }
      } else {
        // Handle login error
        console.error("Failed to login");
        showErrorMessage();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="login-box">
        <div className="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={logo}
              alt="Your Company"
            ></img>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex justify-center mb-4">
              <button
                className={`${
                  loginType === "user"
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
                } px-20  py-2 rounded-l-md`}
                onClick={() => toggleLoginType("user")}
              >
                User
              </button>
              <button
                className={`${
                  loginType === "dealer"
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
                } px-20 py-2 rounded-r-md`}
                onClick={() => toggleLoginType("dealer")}
              >
                Dealer
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="userName"
                    name="userName"
                    type="userName"
                    autoComplete="userName"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></input>
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div class="text-sm">
                    <a
                      href="#"
                      class="font-semibold text-green-600 hover:text-green-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div class="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></input>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member? 
              <a
                href="#"
                className="font-semibold leading-6 text-green-600 hover:text-green-500"
              >
                Sign-Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
