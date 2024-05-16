import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { getToken } from "./Cookies"; // Import function to retrieve token from cookies
import AuthNavbar from "./AuthNavbar"; // Import authenticated navbar
import { getUserName } from "./Cookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import img1 from "../assets/images/rewards/1.jpg";
import img2 from "../assets/images/rewards/2.jpg";
import img3 from "../assets/images/rewards/3.jpg";
import img4 from "../assets/images/rewards/4.jpg";
import img5 from "../assets/images/rewards/5.jpg";
import img6 from "../assets/images/rewards/6.jpg";
import img7 from "../assets/images/rewards/7.jpg";
import img8 from "../assets/images/rewards/8.jpg";
import img9 from "../assets/images/rewards/9.jpg";
import img10 from "../assets/images/rewards/10.jpg";
import img11 from "../assets/images/rewards/11.jpg";
import img12 from "../assets/images/rewards/12.jpeg";
import upload_image from "../assets/images/Upload_image.png";

const Edumpers = () => {
  const [points, setPoints] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const showErrorToastMessage = (message) => {
    toast.error(message, { autoClose: 3000 });
  };

  const showToastMessage = () => {
    toast.success("Redeemed Successfully", { autoClose: 3000 });
  };
  
  useEffect(() => {
    // Check if token exists in cookies
    const token = getToken();
    fetchRewards();
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchRewards = async () => {
    try {
      const userName = await getUserName();
      const user = userName.token;
      const response = await fetch(
        `http://localhost:5000/get-rewards/${user}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Rewards have been fetched");
        setPoints(data);
      } else {
        console.error("Failed to fetch all pickups");
      }
    } catch (error) {
      console.error("Error fetching all pickups:", error);
    }
  };

  const handleRedeem = async (code) => {
    try {
      if(!isAuthenticated){
        showErrorToastMessage("You have not logged in")
      }
      const userName = await getUserName();
      const user = userName.token;
      if(points > code){
        console.log("Reddem");
        const response = await fetch(
          `http://localhost:5000/redeem/${user}/${code}`,
          {
            method: "POST",
          }
        );
        if (response.ok) {
          const data = await response.json();
          showToastMessage();
          console.log("Rewards have been fetched");
          fetchRewards();
        } else {
          console.error("Failed to fetch all pickups");
        }
      }
      else{
        showErrorToastMessage("Not enough points");
      }
    } catch (error) {
      console.error("Error fetching all pickups:", error);
    }
  };

  return (
    <>
      {isAuthenticated ? <AuthNavbar /> : <Navbar />}
      <ToastContainer/>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 pt-10 mx-auto">
          <div className="flex flex-col text-center w-full">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              Redeem
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Choose the items for your points.
            </p>
          </div>
        </div>
      </section>

      <section className="text-gray-600 flex justify-center w-auto body-font">
        <div className="flex flex-row w-1/3 justify-around items-start">
          <div className="w-auto">
            <div className="flex w-60 flex-col rounded-lg border border-gray-100 px-4 py-4 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Total Points
              </dt>
              <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
                {points}
              </dd>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="lg:w-1/6 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={img1}
                />
              </a>
              <div className="mt-4">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Certificate
                  </h2>
                  <h3 className="text-gray-500 text-xs tracking-widest title-font">
                    10 Points
                  </h3>
                </div>
                <button
                  onClick={() => handleRedeem(10)}
                  className="mt-2 py-2  px-16 flex rounded-lg justify-center bg-green-500 font-semibold text-white hover:bg-green-600"
                >
                  Redeem
                </button>
              </div>
            </div>
            <div className="lg:w-1/6 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={img4}
                />
              </a>
              <div className="mt-4">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Poster
                  </h2>
                  <h3 className="text-gray-500 text-xs tracking-widest title-font">
                    30 Points
                  </h3>
                </div>
                <button
                  onClick={() => handleRedeem(30)}
                  className="mt-2 py-2 px-16  flex rounded-lg justify-center bg-green-500 font-semibold text-white hover:bg-green-600"
                >
                  Redeem
                </button>
              </div>
            </div>
            <div className="lg:w-1/6 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={img2}
                />
              </a>
              <div className="mt-4">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    T-Shirt
                  </h2>
                  <h3 className="text-gray-500 text-xs tracking-widest title-font">
                    50 Points
                  </h3>
                </div>
                <button
                  onClick={() => handleRedeem(50)}
                  className="mt-2 py-2 px-16  flex rounded-lg justify-center bg-green-500 font-semibold text-white hover:bg-green-600"
                >
                  Redeem
                </button>
              </div>
            </div>
            <div className="lg:w-1/6 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={img3}
                />
              </a>
              <div className="mt-4">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    T-Shirt
                  </h2>
                  <h3 className="text-gray-500 text-xs tracking-widest title-font">
                    60 Points
                  </h3>
                </div>
                <button
                  onClick={() => handleRedeem(60)}
                  className="mt-2 py-2 px-16 flex rounded-lg justify-center bg-green-500 font-semibold text-white hover:bg-green-600 w-max"
                >
                  Redeem
                </button>
              </div>
            </div>
            <div className="lg:w-1/6 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={img9}
                />
              </a>
              <div className="mt-4">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    T-Shirt
                  </h2>
                  <h3 className="text-gray-500 text-xs tracking-widest title-font">
                    70 Points
                  </h3>
                </div>
                <button
                  onClick={() => handleRedeem(70)}
                  className="mt-2 py-2 px-16  flex rounded-lg justify-center bg-green-500 font-semibold text-white hover:bg-green-600"
                >
                  Redeem
                </button>
              </div>
            </div>
            <div className="lg:w-1/6 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={img5}
                />
              </a>
              <div className="mt-4">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Metal Badge
                  </h2>
                  <h3 className="text-gray-500 text-xs tracking-widest title-font">
                    100 Points
                  </h3>
                </div>
                <button
                  onClick={() => handleRedeem(100)}
                  className="mt-2 py-2 px-16  flex rounded-lg justify-center bg-green-500 font-semibold text-white hover:bg-green-600"
                >
                  Redeem
                </button>
              </div>
            </div>
            <div className="lg:w-1/6 md:w-1/2 p-4 w-full mt-8">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={img11}
                />
              </a>
              <div className="mt-4">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Cup
                  </h2>
                  <h3 className="text-gray-500 text-xs tracking-widest title-font">
                    120 Points
                  </h3>
                </div>
                <button
                  onClick={() => handleRedeem(120)}
                  className="mt-2 py-2 px-16  flex rounded-lg justify-center bg-green-500 font-semibold text-white hover:bg-green-600"
                >
                  Redeem
                </button>
              </div>
            </div>
            <div className="lg:w-1/6 md:w-1/2 p-4 w-full mt-8">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={img6}
                />
              </a>
              <div className="mt-4">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Diary
                  </h2>
                  <h3 className="text-gray-500 text-xs tracking-widest title-font">
                    150 Points
                  </h3>
                </div>
                <button
                  onClick={() => handleRedeem(150)}
                  className="mt-2 py-2 px-16 flex rounded-lg justify-center bg-green-500 font-semibold text-white hover:bg-green-600"
                >
                  Redeem
                </button>
              </div>
            </div>
            <div className="lg:w-1/6 md:w-1/2 p-4 w-full mt-8">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={img7}
                />
              </a>
              <div className="mt-4">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Cap
                  </h2>
                  <h3 className="text-gray-500 text-xs tracking-widest title-font">
                    160 Points
                  </h3>
                </div>
                <button
                  onClick={() => handleRedeem(160)}
                  className="mt-2 py-2 px-16 flex rounded-lg justify-center bg-green-500 font-semibold text-white hover:bg-green-600"
                >
                  Redeem
                </button>
              </div>
            </div>
            <div className="lg:w-1/6 md:w-1/2 p-4 w-full mt-8">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={img8}
                />
              </a>
              <div className="mt-4">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Water Bottle
                  </h2>
                  <h3 className="text-gray-500 text-xs tracking-widest title-font">
                    200 Points
                  </h3>
                </div>
                <button
                  onClick={() => handleRedeem(200)}
                  className="mt-2 py-2 px-16 flex rounded-lg justify-center bg-green-500 font-semibold text-white hover:bg-green-600"
                >
                  Redeem
                </button>
              </div>
            </div>
            
            <div className="lg:w-1/6 md:w-1/2 p-4 w-full mt-8">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={img10}
                />
              </a>
              <div className="mt-4">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Hoodie
                  </h2>
                  <h3 className="text-gray-500 text-xs tracking-widest title-font">
                    250 Points
                  </h3>
                </div>
                <button
                  onClick={() => handleRedeem(250)}
                  className="mt-2 py-2 px-16 flex rounded-lg justify-center bg-green-500 font-semibold text-white hover:bg-green-600"
                >
                  Redeem
                </button>
              </div>
            </div>
            
            <div className="lg:w-1/6 md:w-1/2 p-4 w-full mt-8">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={img12}
                />
              </a>
              <div className="mt-4">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Dustbin
                  </h2>
                  <h3 className="text-gray-500 text-xs tracking-widest title-font">
                    1000 Points
                  </h3>
                </div>
                <button
                  onClick={() => handleRedeem(1000)}
                  className="mt-2 py-2 px-16 flex rounded-lg justify-center bg-green-500 font-semibold text-white hover:bg-green-600"
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Edumpers;
