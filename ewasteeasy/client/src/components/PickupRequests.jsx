import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import AuthNavbar from "./DealerAuthNavbar";
import { getToken, getUserName } from "./Cookies";
import Accordion from "./Accordian";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PickupRequests = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pickupRequests, setPickupRequests] = useState([]);
  const [allPickups, setAllPickups] = useState([]);
  const [dealerUserName, setDealerUserName] = useState();

  const showToastMessage = (id) => {
    toast.success("Accepted Request "+id+ "!", { autoClose: 3000 });
  };


  const fetchPickupRequests = async () => {
    try {
      const dealerUserName = await getUserName();
      const dealer = dealerUserName.token;
      const response = await fetch(
        `http://localhost:5000/pickup-requests/${dealer}`
      );
      if (response.ok) {
        const data = await response.json();
        setPickupRequests(data);
      } else {
        console.error("Failed to fetch pickup requests");
      }
    } catch (error) {
      console.error("Error fetching pickup requests:", error);
    }
  };

  const fetchAllPickups = async () => {
    try {
      const dealerUserName = await getUserName();
      const dealer = dealerUserName.token;
      const response = await fetch(
        `http://localhost:5000/all-pickups/${dealer}`
      );
      if (response.ok) {
        const data = await response.json();
        setAllPickups(data);
      } else {
        console.error("Failed to fetch all pickups");
      }
    } catch (error) {
      console.error("Error fetching all pickups:", error);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
      fetchPickupRequests();
      fetchAllPickups();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleAcceptRequest = async (userName,id) => {
    try {
      const dealerUserName = await getUserName();
      const dealer = dealerUserName.token;
      const response = await fetch(
        `http://localhost:5000/accept-pickup-request/${dealer}/${userName}`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        showToastMessage(id.slice(20));
        fetchPickupRequests();
        fetchAllPickups();
      } else {
        console.error("Failed to accept pickup request");
      }
    } catch (error) {
      console.error("Error accepting pickup request:", error);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "To be Picked up";
      case 2:
        return "Picked up";
      case 3:
        return "Completed";
      default:
        return "";
    }
  };

  return (
    <div>
      {isAuthenticated ? <AuthNavbar /> : <Navbar />}
      <ToastContainer />
      <div className="flex ">
        <Sidenav />
        <div className="container mx-auto mt-8 space-between">
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Pickup Requests
            </h2>
            {pickupRequests.length === 0 ? (
              <p className="text-center text-xl">No requests</p>
            ) : (
              <div className="overflow-x-auto px-4">
                <Accordion
                  data={pickupRequests.map((request) => ({
                    title: `Request(\"${request._id.slice(20)}\") from user ${request.userName}`,
                    content: (
                      <div>
                        <table className="table-auto w-full">
                          <tbody>
                            <tr>
                              <td className="border px-4 py-2">Location:</td>
                              <td className="border px-4 py-2">
                                Longitude {request.lon}, Latitude {request.lat}
                              </td>
                            </tr>
                            <tr>
                              <td className="border px-4 py-2">Items List:</td>
                              <td className="border px-4 py-2">
                                <ul>
                                  {request.itemsList.map((item, idx) => (
                                    <li key={idx} className="my-1">
                                      {item.item}-{item.quantity}
                                    </li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td className="border px-4 py-2">Address:</td>
                              <td className="border px-4 py-2">
                                {request.userAddress}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="text-center mt-4">
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-center"
                            onClick={() =>
                              handleAcceptRequest(request.userName,request._id)
                            }
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    ),
                  }))}
                />
              </div>
            )}
          </div>
          <div className="flex-grow"></div>
          <div className="flex-grow"></div>
          <div className="container mx-auto mt-8 mb-8 space-between">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              All Pickups
            </h2>
            <div className="overflow-x-auto px-4">
              <Accordion
                data={allPickups.map((pickup) => ({
                  title: `Status of the request(\"${pickup._id.slice(20)}\") of user ${pickup.userName}`,
                  content: (
                    <table className="table-auto w-full border-solid rounded-m border-gray-950">
                      <tbody>
                        <tr>
                          <td className="border px-4 py-2 font-semibold">
                            Location:
                          </td>
                          <td className="border px-4 py-2">
                            Longitude {pickup.lon}, Latitude {pickup.lat}
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 font-semibold">
                            Items List:
                          </td>
                          <td className="border px-4 py-2">
                            <ul>
                              {pickup.itemsList.map((item, idx) => (
                                <li key={idx} className="my-2">
                                  {item.item}-{item.quantity}
                                </li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 font-semibold">
                            Status:
                          </td>
                          <td className="border px-4 py-2">
                            {getStatusText(pickup.status)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ),
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
