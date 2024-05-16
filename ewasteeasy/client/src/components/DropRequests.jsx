import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import AuthNavbar from "./DealerAuthNavbar";
import { getToken, getUserName } from "./Cookies";
import Accordion from "./Accordian"; // Import the Accordion component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DropRequests = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropRequests, setDropRequests] = useState([]);
  const [allDrops, setAllDrops] = useState([]);
  const [dealerUserName, setDealerUserName] = useState();

  const showToastMessage = (id) => {
    toast.success("Accepted Request "+id+" !", { autoClose: 3000 });
  };

  const fetchDropRequests = async () => {
    try {
      const dealerUserName = await getUserName();
      const dealer = dealerUserName.token;
      const response = await fetch(
        `http://localhost:5000/drop-requests/${dealer}`
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

  const fetchAllDrops = async () => {
    try {
      const dealerUserName = await getUserName();
      const dealer = dealerUserName.token;
      const response = await fetch(`http://localhost:5000/all-drops/${dealer}`);
      if (response.ok) {
        const data = await response.json();
        setAllDrops(data);
      } else {
        console.error("Failed to fetch all Drops");
      }
    } catch (error) {
      console.error("Error fetching all Drops:", error);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
      fetchDropRequests();
      fetchAllDrops();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleAcceptRequest = async (userName,id) => {
    try {
      const dealerUserName = await getUserName();
      const dealer = dealerUserName.token;
      const response = await fetch(
        `http://localhost:5000/accept-drop-request/${dealer}/${userName}`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        showToastMessage(id.slice(20));
        fetchDropRequests();
        fetchAllDrops();
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
        return "To be Dropped";
      case 2:
        return "Dropped";
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
              Drop Requests
            </h2>
            {dropRequests.length === 0 ? (
              <p className="text-center text-xl">No requests</p>
            ) : (
              <div className="overflow-x-auto px-4">
                <Accordion
                  data={dropRequests.map((request) => ({
                    title: `Request(\"${request._id.slice(20)}\") from user ` + request.userName,
                    content: (
                      <div>
                        <table className="table-auto w-full border border-slate-800">
                          <tbody>
                            <tr>
                              <td className="border px-4 py-2 border-slate-800">
                                Items List:
                              </td>
                              <td className="border px-4 py-2 border-slate-800">
                                <ul>
                                  {request.itemsList.map((item, idx) => (
                                    <li key={idx} className="my-2">
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
              All Drops
            </h2>
            <div className="overflow-x-auto px-4">
              <Accordion
                data={allDrops.map((drop) => ({
                  title: `Status of the request(\"${drop._id.slice(20)}\") of user ` + drop.userName,
                  content: (
                    <table className="table-auto w-full border border-gray-800">
                      <tbody>
                        <tr>
                          <td className="border px-4 py-2 border-slate-800">
                            Items List:
                          </td>
                          <td className="border px-4 py-2 border-slate-800">
                            <ul>
                              {drop.itemsList.map((item, idx) => (
                                <li key={idx} className="my-2">
                                  {item.item}-{item.quantity}
                                </li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 border-slate-800">
                            Status:
                          </td>
                          <td className="border px-4 py-2 border-slate-800">
                            {getStatusText(drop.status)}
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
