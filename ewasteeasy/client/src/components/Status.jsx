import React from "react";
import TrackingComponent from "./TrackingComponent";
import Navbar from "./Navbar";
import { getToken } from "./Cookies"; // Import function to retrieve token from cookies
import AuthNavbar from "./AuthNavbar"; // Import authenticated navbar
import { useEffect, useState } from "react";

export const Status = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in cookies
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  return (
    <>
      {isAuthenticated ? <AuthNavbar /> : <Navbar />}

      <div className="flex flex-col gap-10 h-screen items-center">
        <TrackingComponent currentStepNumber={6} type="drop" />
      </div>
    </>
  );
};
