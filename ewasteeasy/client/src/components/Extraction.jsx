import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import AuthNavbar from "./DealerAuthNavbar";
import { getToken, getUserName } from "./Cookies";
import Accordion from "./Accordian";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Extraction = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pickupRequests, setPickupRequests] = useState([]);
  const [dropRequests, setDropRequests] = useState([]);

  const showToastMessage = (id) => {
    toast.success("Ticket "+id+" Closed !", { autoClose: 3000 });
  };

  const fetchPickupRequests = async () => {
    try {
      const dealerUserName = await getUserName();
      const dealer = dealerUserName.token;
      const response = await fetch(
        `http://localhost:5000/pickup-requests-extraction/${dealer}`
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

  const fetchDropRequests = async () => {
    try {
      const dealerUserName = await getUserName();
      const dealer = dealerUserName.token;
      const response = await fetch(
        `http://localhost:5000/drop-requests-extraction/${dealer}`
      );
      if (response.ok) {
        const data = await response.json();
        setDropRequests(data);
      } else {
        console.error("Failed to fetch drop requests");
      }
    } catch (error) {
      console.error("Error fetching drop requests:", error);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
      fetchPickupRequests();
      fetchDropRequests();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleAcceptRequest = async (userName, itemsList, id) => {
    try {
      const dealerUserName = await getUserName();
      const dealer = dealerUserName.token;
      const items = itemsList;
      console.log(items);
      const disposedItems = items.reduce((acc, curr) => {
        acc[curr.item] = curr.quantity;
        return acc;
      }, {});
    // console.log(disposedItems);
      const response = await fetch(
        `http://localhost:5000/accept-pickup-request-extraction/${dealer}/${userName}`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(disposedItems),
        }
      );
      if (response.ok) {
        showToastMessage(id.slice(20));
        fetchPickupRequests();
        fetchDropRequests();
      } else {
        console.error("Failed to accept pickup request");
      }
    } catch (error) {
      console.error("Error accepting pickup request:", error);
    }
  };

  const handleDropAcceptRequest = async (userName,itemsList,id) => {
    try {
      const dealerUserName = await getUserName();
      const dealer = dealerUserName.token;
      const items = itemsList;
      const disposedItems = items.reduce((acc, curr) => {
        acc[curr.item] = curr.quantity;
        return acc;
      }, {});
      const response = await fetch(
        `http://localhost:5000/accept-drop-request-extraction/${dealer}/${userName}`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(disposedItems),
        }
      );
      if (response.ok) {
        showToastMessage(id.slice(20));
        fetchPickupRequests();
        fetchDropRequests();
      } else {
        console.error("Failed to accept pickup request");
      }
    } catch (error) {
      console.error("Error accepting pickup request:", error);
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
                        <table className="table-auto w-full rounded-xl">
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
                              handleAcceptRequest(request.userName,request.itemsList,request._id)
                            }
                          >
                            Extracted
                          </button>
                        </div>
                      </div>
                    ),
                  }))}
                />
              </div>
            )}
          </div>
          <div className="container mx-auto mt-8 mb-8 space-between">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Drop Requests
            </h2>
            {dropRequests.length === 0 ? (
              <p className="text-center text-xl">No requests</p>
            ) : (
              <div className="overflow-x-auto px-4">
                <Accordion
                  data={dropRequests.map((request) => ({
                    title: `Request(\"${request._id.slice(20)}\") from user ${request.userName}`,
                    content: (
                      <div>
                        <table className="table-auto w-full rounded-xl">
                          <tbody>
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
                          </tbody>
                        </table>
                        <div className="text-center mt-4">
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-center"
                            onClick={() =>
                              handleDropAcceptRequest(request.userName,request.itemsList,request._id)
                            }
                          >
                            Extracted
                          </button>
                        </div>
                      </div>
                    ),
                  }))}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
