import React, { useEffect, useState, useLayoutEffect } from "react";
import data from "./data.json";
import Navbar from "./Navbar";
import upload_image from "../assets/images/Upload_image1.png";
import location_image from "../assets/images/location.png";
import AuthNavbar from "./AuthNavbar"; // Import authenticated navbar
import { getToken, getUserName } from "./Cookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineDelete } from "react-icons/ai";

const Dispose = () => {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [nearestRecord, setNearestRecord] = useState(null);
  const [mode, setMode] = useState("pickup");
  const [userName, setUserName] = useState("");

  const showToastMessage = (message) => {
    toast.success(message, { autoClose: 3000 });
  };
  const showErrorMessage = (message) => {
    toast.error( message, { autoClose: 1600 });
  };
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemsList, setItemsList] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handle() {
    if (!isAuthenticated) {
      showErrorMessage("You have not logged in");
    } else {
      handleSubmit(); // Assuming handleSubmit() is defined elsewhere
    }
  }

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (!isAuthenticated) {
      showErrorMessage("You have not logged in");
      window.location.href = "http://localhost:3000/dispose";
    }
    setUserName(getUserName);
    console.log(userName.token);
    const postusername = userName.token;
    let postData;
    console.log("Inside handle Submit");
    const dealerUserName = "Green_Wave";
    const status = 1;
    if (itemsList.length === 0) {
      console.error("Items list is empty");
      showErrorMessage("You haven't added E-Waste items");
      return;
    }
    if (mode === "pickup") {
      postData = {
        lat,
        lon,
        userName: postusername,
        itemsList,
        dealerUserName,
        status,
      };
      console.log(JSON.stringify(postData));
    } else {
      postData = {
        userName: postusername,
        itemsList,
        dealerUserName,
        status,
      };
    }
    try {
      const response = await fetch(
        mode === "pickup"
          ? "http://localhost:5000/pickup"
          : "http://localhost:5000/drop",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );
      if (response.ok) {
        // Handle success
        showToastMessage("Request Sent Successfully");
        console.log("Request submitted successfully");
        setItemsList([]);
      } else {
        // Handle error
        console.error("Failed to submit request");
        showErrorMessage("Failed to submit request");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  useEffect(() => {
    // Check if token exists in cookies
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
      setUserName(getUserName);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  const addItem = () => {
    if(quantity<=0 || !item){
      showErrorMessage("Add valid items");
      setItem("");
      setQuantity("");
      return
    }
    if (item && quantity>0) {
      const existingItemIndex = itemsList.findIndex((el) => el.item === item);
      if (existingItemIndex !== -1) {
        // Item already exists, update quantity
        const updatedItemsList = [...itemsList];
        updatedItemsList[existingItemIndex].quantity += parseInt(quantity);
        setItemsList(updatedItemsList);
      } else {
        // Item doesn't exist, add new item
        setItemsList([...itemsList, { item, quantity: parseInt(quantity) }]);
      }
      showToastMessage("Item added")
      setItem("");
      setQuantity("");
    }
  };

  const del = (itemToDelete) => {
    // Filter out the item to be deleted
    const updatedItemsList = itemsList.filter((item) => item.item !== itemToDelete);
    // Update the state with the filtered items list
    setItemsList(updatedItemsList);
    showToastMessage("Item deleted")
  };
  

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const findNearestRecord = (latitude, longitude) => {
    let nearestRecord;
    let minDistance = Infinity;
    // console.log("hello 1234");

    data.forEach((record) => {
      const distance = getDistanceFromLatLonInKm(
        latitude,
        longitude,
        record.latitude,
        record.longitude
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestRecord = record;
      }
    });

    return nearestRecord;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }, []);

  useLayoutEffect(() => {
    if (lat !== undefined && lon !== undefined) {
      const nearest = findNearestRecord(lat, lon);
      setNearestRecord(nearest);
    }
  }, [lat, lon]);

  const toggleDisposeType = (type) => {
    setMode(type);
  };

  return (
    <div>
      {isAuthenticated ? <AuthNavbar /> : <Navbar />}
      <ToastContainer />
      <h1 className="flex justify-center text-4xl mb-6 mt-4">
        Dispose Your E-Waste
      </h1>
      <div className="flex justify-center mb-4">
        <button
          className={`${
            mode === "pickup"
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-700"
          } px-20  py-2 rounded-l-md`}
          onClick={() => toggleDisposeType("pickup")}
        >
          Pick-Up
        </button>
        <button
          className={`${
            mode === "drop"
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-700"
          } px-20 py-2 rounded-r-md`}
          onClick={() => toggleDisposeType("drop")}
        >
          Drop
        </button>
      </div>
      <section className="text-gray-600 flex justify-center w-auto mb-5 body-font">
        <div className="flex flex-row w-1/2 justify-around items-start">
          <div className="max-w-md mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Add Items Manually</h1>
            <div className="flex flex-col items-center mb-4">
              <div className="w-full max-w-xs mb-2">
                <select
                  className="w-full rounded border px-4 py-2"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                >
                  <option value="">Select Item</option>
                  <option value="Phone">Phone</option>
                  <option value="Laptop">Laptop</option>
                  <option value="AC">AC</option>
                  <option value="Washing Machine">Washing Machine</option>
                  <option value="Computer">Computer</option>
                  <option value="Monitor">Monitor</option>
                  <option value="Keyboard">Keyboard</option>
                  <option value="Mouse">Mouse</option>
                  <option value="Television">Television</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Tablet">Tablet</option>
                  <option value="Microwave">Microwave</option>
                  <option value="Refrigerator">Refrigerator</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Charger">Charger</option>
                  <option value="Cable">Cable</option>
                </select>
              </div>
              <div className="w-full max-w-xs mb-2">
                <input
                  className="w-full rounded border px-4 py-2"
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <button
                className="w-full max-w-sm bg-green-500 hover:bg-green-700 text-white font py-2 px-4 rounded"
                onClick={addItem}
              >
                Add
              </button>
            </div>
          </div>
          {/* <h3 className="ml-10 mt-28 mb-10 text-lg">or</h3>
          <div className="flex flex-col items-center w-1/3 max-w-md mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
            <label htmlFor="upload-button">
              <img
                className="w-32 h-32 cursor-pointer object-cover ml-5"
                src={upload_image}
                alt="Preview"
              />
            </label>
            <input
              id="upload-button"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
          </div> */}
        </div>
      </section>
      <section className="text-gray-600 flex justify-center w-auto mb-5 body-font mt-10">
        <div className="flex flex-row w-1/2 justify-around items-start">
          <div>
            <h2 className="text-center text-xl font-bold mb-2">E-waste items:</h2>
            {itemsList.length === 0 ? (
              <p className="mb-2 bg-[#b8deb4] rounded">‎ No items added</p>
            ) : (
              <ul>
                {itemsList.map((item, index) => (
                  <div className="flex">
                  <li key={index} className="mb-2 px-2 py-1 bg-[#b8deb4] rounded min-w-48">
                   <p className="text-center">
                   {item.item} - {item.quantity}
                   </p> 
                   {/* <button className="mb-2 bg-gray-300 rounded">Delete</button> */}
                  </li>
                   <AiOutlineDelete onClick={() => del(item.item)}className=" ml-4 mt-1 rounded min-h-6 min-w-6"/>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* <h1>Latitude: {lat}</h1>
      <h1>Longitude: {lon}</h1> */}
      <section className="text-gray-600 flex justify-center w-auto mb-5 body-font">
        <div className="flex flex-row w-1/2 justify-around items-start border border-solid border-black-400 border-2 rounded-lg">
          <div className="max-w-md mx-auto mt-8">
            <label htmlFor="location-button">
              <img
                className="w-32 h-32 cursor-pointer object-cover "
                src={location_image}
                alt="Preview"
              />
            </label>
            <button
              id="location-button"
              onClick={findNearestRecord}
              style={{ display: "none" }}
            />
            <h2>‎ ‎ Location Access</h2>
          </div>
          <div className="max-w-md mx-auto mt-8">
            {nearestRecord && (
              <div>
                <h2 className="text-lg">Nearest Location: </h2>
                <p>Name: {nearestRecord.name}</p>
                <p>City: {nearestRecord.city}</p>
                <p>State: {nearestRecord.state}</p>
                <p>
                  Distance:{" "}
                  {getDistanceFromLatLonInKm(
                    lat,
                    lon,
                    nearestRecord.latitude,
                    nearestRecord.longitude
                  )}{" "}
                  km
                </p>
              </div>
            )}
            {!nearestRecord && (
              <h2 className="text-lg">Provide Location Access</h2>
            )}
          </div>
        </div>
      </section>
      <section className="text-gray-600 flex justify-center w-auto mb-5 body-font">
        <div className="mt-5 w-64 flex flex-row w-1/3 justify-around items-start">
          <button
            onClick={handle}
            className="flex mx-auto justify-center text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
          >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dispose;
