import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AuthNavbar from "./AuthNavbar";
import "./login.css";
import { getToken, getUserName } from "./Cookies";
import Accordion from "./Accordian";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrackingComponent from "./TrackingComponent";

export const UserProfile = () => {
  const [loginType, setLoginType] = useState("password");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [statusData, setStatusData] = useState();

  useEffect(() => {
    // Check if token exists in cookies
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    console.log(statusData);
  }, [statusData]);

  const showToastMessage = (msg) => {
    toast.success("Successfully " + msg, { autoClose: 3000 });
  };

  const showDangerMessage = () => {
    toast.error("Please Login to change details", { autoClose: 3000 });
  };

  const fetchStatus = async () => {
    try {
      const userName = await getUserName();
      const user = userName.token;
      console.log(user);
      const response = await fetch(
        `http://localhost:5000/user-profile/${user}`
      );
      if (response.ok) {
        console.log("Successful retrival");
        const data = await response.json();
        setStatusData(data);
      } else {
        console.error("Failed to fetch pickup requests");
      }
    } catch (error) {
      console.error("Error fetching pickup requests:", error);
    }
  };

  const toggleLoginType = (type) => {
    setLoginType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!isAuthenticated) {
      showDangerMessage();
      return;
    }
    const userName = await getUserName();
    const user = userName.token;
    try {
      let url = "";
      if (loginType === "password") {
        url = `http://localhost:5000/change-password/${user}`;
      } else if (loginType === "mobile") {
        url = `http://localhost:5000/change-mobile-number/${user}`;
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (response.ok) {
        if (loginType === "password") {
          console.log("Successfully changed password");
          showToastMessage("changed password!");
          //   alert("changed password");
        } else {
          // console.log("Successfully changed password");
          showToastMessage("changed mobile number!");
        }
      } else {
        console.error("Failed to change");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {isAuthenticated ? <AuthNavbar /> : <Navbar />}
      <ToastContainer />
      <h1 className="text-2xl text-center font-bold mt-8">
        Status of Requests
      </h1>
      {!statusData && <h2 className="text-xl text-center mt-8">No Requests</h2>}
      {statusData && (
        <div className="overflow-x-auto px-4 mx-72">
          <Accordion
            data={statusData.dropRequests.map((request) => ({
              title: `Status of the drop request("${request._id.slice(20)}")`,
              content: (
                <div>
                  <div className="flex flex-col gap-10 h-max items-center">
                    <TrackingComponent
                      currentStepNumber={
                        request.status === 3 ? 6 : request.status
                      }
                      type="drop"
                    />
                  </div>
                </div>
              ),
            }))}
          />
          <Accordion
            data={statusData.pickupRequests.map((request) => ({
              title: `Status of the pickup request("${request._id.slice(20)}")`,
              content: (
                <div>
                  <div className="flex flex-col gap-10 h-max items-center">
                    <TrackingComponent
                      currentStepNumber={
                        request.status === 3 ? 6 : request.status
                      }
                      type="pickup"
                    />
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      )}
      <div className="">
        <div className="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Update your profile
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto m:w-full sm:max-w-m">
            <div className="flex justify-center mb-4">
              <button
                className={`${
                  loginType === "password"
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
                } px-20 py-2 rounded-l-md`}
                onClick={() => toggleLoginType("password")}
              >
                Change Password
              </button>
              <button
                className={`${
                  loginType === "mobile"
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
                } px-20 py-2 rounded-r-md`}
                onClick={() => toggleLoginType("mobile")}
              >
                Change Mobile Number
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {loginType === "password" && (
                <div>
                  <label
                    htmlFor="password"
                    className="block text-m font-medium leading-6 text-gray-900"
                  >
                    Current Password
                  </label>
                  <div className="mt-2 my-6">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></input>
                  </div>
                  <label
                    htmlFor="password"
                    className="block text-m font-medium leading-6 text-gray-900"
                  >
                    New Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></input>
                  </div>
                </div>
              )}

              {loginType === "mobile" && (
                <div>
                  <label
                    htmlFor="oldMobile"
                    className="block text-m font-medium leading-6 text-gray-900"
                  >
                    Current Mobile Number
                  </label>
                  <div className="mt-2 my-6">
                    <input
                      id="oldMobile"
                      name="oldMobile"
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></input>
                  </div>
                  <label
                    htmlFor="newMobile"
                    className="block text-m font-medium leading-6 text-gray-900"
                  >
                    New Mobile Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="newMobile"
                      name="newMobile"
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></input>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update{" "}
                  {loginType === "password" ? "Password" : "Mobile Number"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
