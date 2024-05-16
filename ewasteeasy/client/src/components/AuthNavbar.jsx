import React from "react";
import logo from "../logo.svg";
import profilePhoto from "../assets/images/profile.png";
import { useState } from "react";
import { destroyCookie } from "nookies";

const handleLogout = () => {
  // Delete the authData cookie
  destroyCookie(null, "authData", { path: "/" });

  // Redirect to login page
  window.location.href = "http://localhost:3000";
};

const Navbar = () => {
  const [colorChange, setColorChange] = useState("");

  const changeNavbarColor = () => {
    if (window.scrollY >= 1) {
      setColorChange("bg-white shadow-md");
    } else {
      setColorChange("");
    }
  };

  window.addEventListener("scroll", changeNavbarColor);

  return (
    <header
      className={
        "sticky top-0 z-50 text-gray-600 body-font test-nav " + colorChange
      }
    >
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={logo} alt="logo" />
          <span className="ml-3 text-xl">E-Waste Easy</span>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
          <a href="/" className="mr-5 hover:text-green-600">
            Home
          </a>
          <a href="/about" className="mr-5 hover:text-green-600">
            About
          </a>
          <a href="/dispose" className="mr-5 hover:text-green-600">
            Dispose
          </a>
          <a href="/blogs" className="mr-5 hover:text-green-600">
            Blogs
          </a>
          <a href="/points" className="mr-5 hover:text-green-600">
            Rewards
          </a>
          <a href="/profile" className="mr-5 hover:text-green-600">
            Profile
          </a>
        </nav>
        <div className="relative">
          {/* <img
            className="w-10 h-10 rounded-full cursor-pointer"
            src={profilePhoto}
            alt="Rounded avatar"
            onClick={toggleDropdown}
          /> */}
          <a
            onClick={handleLogout}
            href="/"
            className="inline-flex items-center bg-gray-100 border-0 py-2 px-5 focus:outline-none hover:bg-red-400 rounded text-base mt-4 md:mt-0 mr-8"
          >
            Logout
          </a>
          {/* {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-md overflow-hidden shadow-md z-10">
              <button
                onClick={handleLogout}
                className="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )} */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
