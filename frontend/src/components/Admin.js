import React, { useState, useEffect } from "react";
import AddOfficer from "./AddOfficer";
import OfficerList from "./OfficerList";
import { getOfficers } from "../api/officerService";
import "../styles/Admin.css";
import { useNavigate } from "react-router-dom";


const Admin = () => {
  const [officers, setOfficers] = useState([]);
  const navigate = useNavigate();

  const fetchOfficers = async () => {
    try {
      const response = await getOfficers();
      setOfficers(response.data);
    } catch (error) {
      console.error("Error fetching officers:", error);
    }
  };

  const handleLogout= () => {
    navigate('/');
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  return (
 <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header Section */}
      <div className="bg-white shadow-xl border-b border-gray-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-2 text-lg font-medium">
                  Manage officers and system administration
                </p>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>System Online</span>
                  </div>
                  <div className="text-sm text-gray-400">|</div>
                  <div className="text-sm text-gray-500">
                    Last updated: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Stats Badge */}
            <div className="hidden sm:flex items-center space-x-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 rounded-2xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-800">
                      {officers.length}
                    </div>
                    <div className="text-sm text-blue-600 font-medium">Total Officers</div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="group flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-red-400"
              >
                <svg
                  className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Logout Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:hidden">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Add Officer Section */}
          <div className="lg:col-span-1 space-y-8">
            {/* Add Officer Card */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
              <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 px-8 py-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl backdrop-blur-sm shadow-lg">
                      <svg
                        className="w-7 h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Add New Officer
                      </h2>
                      <p className="text-green-100 text-sm font-medium">
                        Create officer profile
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <AddOfficer refreshOfficers={fetchOfficers} />
              </div>
            </div>

            {/* Enhanced Quick Actions Card */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 transform hover:scale-105 transition-all duration-500">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl shadow-lg">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Quick Actions
                    </h3>
                    <p className="text-gray-600 font-medium">
                      Manage your system efficiently
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <button className="group flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-200">
                    <div className="flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold">Export Data</span>
                  </button>

                  <button
                    onClick={fetchOfficers}
                    className="group flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl backdrop-blur-sm">
                      <svg
                        className="w-5 h-5 text-white group-hover:rotate-180 transition-transform duration-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold">Refresh Data</span>
                  </button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                    <div className="text-2xl font-bold text-blue-600">{officers.length}</div>
                    <div className="text-xs text-blue-500 font-medium">Total</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                    <div className="text-2xl font-bold text-green-600">
                      {officers.filter(o => o.status === "Active" || o.isActive === true).length}
                    </div>
                    <div className="text-xs text-green-500 font-medium">Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Officers List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform hover:shadow-3xl transition-all duration-500">
              <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-8 py-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm shadow-lg">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white">
                          Officer Directory
                        </h2>
                        <p className="text-blue-100 text-lg font-medium">
                          Manage your police force
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Quick Stats */}
                    <div className="flex items-center space-x-8">
                      <div className="text-center bg-white/10 rounded-2xl px-6 py-4 backdrop-blur-sm">
                        <div className="text-4xl font-bold text-white">
                          {officers.length}
                        </div>
                        <div className="text-sm text-blue-100 font-medium">
                          Total Officers
                        </div>
                      </div>
                      <div className="text-center bg-white/10 rounded-2xl px-6 py-4 backdrop-blur-sm">
                        <div className="text-4xl font-bold text-green-300">
                          {officers.filter(o => o.status === "Active" || o.isActive === true).length}
                        </div>
                        <div className="text-sm text-blue-100 font-medium">Active</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {officers.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="relative mx-auto mb-8">
                      <div className="flex items-center justify-center w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full shadow-inner">
                        <svg
                          className="w-16 h-16 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      No officers found
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto text-lg leading-relaxed">
                      Get started by adding your first officer to the system using the form on the left.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Enhanced Results Summary */}
                    <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-6 py-4">
                      <p className="text-gray-700 font-medium">
                        Showing{" "}
                        <span className="font-bold text-blue-600 text-lg">
                          {officers.length}
                        </span>{" "}
                        officers
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Live data</span>
                      </div>
                    </div>

                    {/* Enhanced Officer Cards */}
                    <div className="grid grid-cols-1 gap-6">
                      {officers.map((officer, index) => (
                        <div
                          key={officer.id || officer._id}
                          className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:border-blue-200 transform hover:-translate-y-1"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="p-8">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-6">
                                <div className="relative">
                                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                                    {officer.name
                                      ? officer.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")
                                          .slice(0, 2)
                                      : "N/A"}
                                  </div>
                                  <div
                                    className={`absolute -bottom-2 -right-2 w-7 h-7 rounded-full border-3 border-white shadow-lg ${
                                      officer.status === "Active" || officer.isActive === true
                                        ? "bg-green-400 animate-pulse"
                                        : officer.status === "On Leave"
                                        ? "bg-yellow-400"
                                        : "bg-red-400"
                                    }`}
                                  ></div>
                                </div>
                                
                                <div className="space-y-3">
                                  <div>
                                    <h3 className="font-bold text-2xl text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                      {officer.name || "N/A"}
                                    </h3>
                                    <div className="flex items-center space-x-3 text-gray-600 mt-1">
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                      </svg>
                                      <span className="font-semibold text-lg">
                                        {officer.role || "Officer"}
                                      </span>
                                      {officer.badgeNumber && (
                                        <>
                                          <span className="text-gray-400">•</span>
                                          <span className="font-mono text-blue-600 font-semibold">
                                            #{officer.badgeNumber}
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <div className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors duration-300 group/item">
                                      <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-lg group-hover/item:bg-blue-100 transition-colors duration-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
                                        </svg>
                                      </div>
                                      <span className="font-medium">{officer.email}</span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors duration-300 group/item">
                                      <div className="flex items-center justify-center w-8 h-8 bg-green-50 rounded-lg group-hover/item:bg-green-100 transition-colors duration-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3l2 5-2 2a16 16 0 006 6l2-2 5 2v3a2 2 0 01-2 2h-1C10.477 21 3 13.523 3 5V5z" />
                                        </svg>
                                      </div>
                                      <span className="font-medium">{officer.phone_number}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div
                                className={`px-6 py-3 rounded-2xl text-sm font-bold border-2 transition-all duration-300 ${
                                  officer.status === "Active" || officer.isActive === true
                                    ? "bg-green-50 text-green-800 border-green-200 hover:bg-green-100"
                                    : officer.status === "On Leave"
                                    ? "bg-yellow-50 text-yellow-800 border-yellow-200 hover:bg-yellow-100"
                                    : "bg-red-50 text-red-800 border-red-200 hover:bg-red-100"
                                }`}
                              >
                                {officer.status || (officer.isActive ? "Active" : "Inactive")}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
