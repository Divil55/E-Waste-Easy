import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Gallery from "./Gallery";
import Contact from "./Contact";
import Footer from "./Footer";
import { getToken } from "./Cookies"; // Import function to retrieve token from cookies
import AuthNavbar from "./AuthNavbar"; // Import authenticated navbar

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in cookies
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? <AuthNavbar /> : <Navbar />}
      <Hero />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
