import React from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { LiaTruckPickupSolid } from "react-icons/lia";
import { AiOutlineDropbox } from "react-icons/ai";
import { DiGoogleAnalytics } from "react-icons/di";
//71bc68
export default () => {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      />
      <div className="min-h-screen flex flex-row bg-gray-100">
        <div className="flex flex-col w-64 bg-slate-50 overflow-hidden">
          <ul className="flex flex-col py-4">
            <li className="mt-2 mb-2">
              <a
                href="/dealer/dashboard"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-16 w-16 text-lg text-gray-400">
                  <BiHomeAlt2 style={{ height: 24, width: 24 }} />
                </span>
                <span className="text-lg font-medium">Dashboard</span>
              </a>
            </li>
            <li className="mt-2 mb-2">
              <a
                href="/dealer/pickuprequests"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-16 w-16 text-lg text-gray-400">
                  <LiaTruckPickupSolid style={{ height: 24, width: 24 }} />
                </span>
                <span className="text-lg font-medium">Pick-Up Requests</span>
              </a>
            </li>
            <li className="mt-2 mb-2">
              <a
                href="/dealer/droprequests"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-16 w-16 text-lg text-gray-400">
                  <AiOutlineDropbox style={{ height: 24, width: 24 }} />
                </span>
                <span className="text-lg font-medium">Drop Requests</span>
              </a>
            </li>
            <li className="mt-2 mb-2">
              <a
                href="/dealer/metal-extraction"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-16 w-16 text-lg text-gray-400">
                  <DiGoogleAnalytics style={{ height: 24, width: 24 }} />
                </span>
                <span className="text-lg font-medium">Metal Extraction</span>
              </a>
            </li>
            {/* <li className="mt-2 mb-2">
              <a
                href="#"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-16 w-16 text-lg text-gray-400">
                  <BiUser style={{ height: 24, width: 24 }} />
                </span>
                <span className="text-lg font-medium">Profile</span>
              </a>
            </li> */}
            {/* <li>
              <a
                href="#"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-user"></i>
                </span>
                <span className="text-sm font-medium">Profile</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-bell"></i>
                </span>
                <span className="text-sm font-medium">Notifications</span>
                <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">
                  5
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-log-out"></i>
                </span>
                <span className="text-sm font-medium">Logout</span>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};
