import React from "react";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import AuthNavbar from "./DealerAuthNavbar";
import { useEffect, useState } from "react";
import { getToken, getUserName } from "./Cookies";
import PieChartComponent from "./PieChart";

export const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingDrops, setPendingDrops] = useState(0);
  const [pendingPickups, setPendingPickups] = useState(0);
  const [totalDrops, setTotalDrops] = useState(0);
  const [totalPickups, setTotalPickups] = useState(0);

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard data from backend
      const dealerUserName = await getUserName(); // Call getUserName function
      const dealer = dealerUserName.token;
      console.log(dealerUserName.token);
      const response = await fetch(
        `http://localhost:5000/dashboard-data/${dealer}`
      );
      if (response.ok) {
        const data = await response.json();
        setPendingDrops(data.pendingDrops);
        setPendingPickups(data.pendingPickups);
        setTotalDrops(data.totalDrops);
        setTotalPickups(data.totalPickups);
      } else {
        console.error("Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    // Check if token exists in cookies
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div>
      {isAuthenticated ? <AuthNavbar /> : <Navbar />}
      <div className="flex ">
        <Sidenav />
        <div className="container mx-auto mt-8">
          <div className="flex flex-wrap justify-center items-start">
            {/* Pending Drop Requests */}
            <div className="bg-green-600 p-4 rounded-lg w-64 m-4 text-center text-white">
              <h2 className="text-lg font-semibold mb-2">
                Pending Drop Requests
              </h2>
              {/* Add your pending drop requests information here */}
              <p className="text-xl">{pendingDrops}</p>
            </div>

            {/* Pending Pickup Requests */}
            <div className="bg-green-600 p-4 rounded-lg w-64 m-4 text-center text-white">
              <h2 className="text-lg font-semibold mb-2">
                Pending Pickup Requests
              </h2>
              {/* Add your pending pickup requests information here */}
              <p className="text-xl">{pendingPickups}</p>
            </div>

            {/* Total Pickups */}
            <div className="bg-green-600 p-4 rounded-lg w-64 m-4 text-center text-white">
              <h2 className="text-lg font-semibold mb-2">Total Drops</h2>
              {/* Add your total pickups information here */}
              <p className="text-xl">{totalDrops}</p>
            </div>

            {/* Total Drops */}
            <div className="bg-green-600 p-4 rounded-lg w-64 m-4 text-center text-white">
              <h2 className="text-lg font-semibold mb-2">Total Pickups</h2>
              {/* Add your total drops information here */}
              <p className="text-xl">{totalPickups}</p>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="w-1/2">
              <PieChartComponent
                data={[
                  { name: "Pending Drops", value: pendingDrops },
                  { name: "Pending PickUps", value: pendingPickups },
                ]}
              />
            </div>
            <div className="w-1/2">
              <PieChartComponent
                data={[
                  { name: "Total Drops", value: totalDrops },
                  { name: "Total Pickups", value: totalPickups },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
