import React, { useState ,useEffect,useRef} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";


const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

 const HARDCODED_PASSWORD = "admin123"; 

useEffect(() => {
  if (!window.lordicon) {
    const script = document.createElement('script');
    script.src = 'https://cdn.lordicon.com/lordicon.js';
    script.async = true;
    document.head.appendChild(script);
  }
}, []);

 // Hardcoded password

  const handleAdminClick = () => {
    setIsModalOpen(true); // Open the password modal
  };

  const handlePasswordSubmit = () => {
    if (password === HARDCODED_PASSWORD) {
      setIsModalOpen(false);
      setErrorMessage("");
      navigate("/admin"); // Redirect to the admin page
    } else {
      setErrorMessage("Incorrect password. Try again.");
    }
  };
  const handleNavigation = (path) => {
    navigate(path);
  };


  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex flex-col items-center justify-center p-6">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
            <lord-icon
              src="https://cdn.lordicon.com/tkwytimu.json"
              trigger="loop"
              state="loop-cycle"
              colors="primary:#104891,secondary:#c71f16"
              style={{
                width: '60px',
                height: '60px'
              }}
            />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Police Management System
        </h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
          Secure platform for law enforcement operations and public safety
          reporting
        </p>
      </div>

      {/* Admin Button */}
      <div className="mb-8">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border border-red-500"
          onClick={handleAdminClick}
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
            Admin Access
          </span>
        </button>
      </div>

      {/* Main Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <button
          onClick={() => handleNavigation("/officer-login")}
          className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-6 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border border-gray-200"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-lg">Officer Login</span>
            <span className="text-sm text-gray-600">
              Access officer dashboard
            </span>
          </div>
        </button>

        <button
          onClick={() => handleNavigation("/report-person")}
          className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-6 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border border-gray-200"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-lg">Report Person</span>
            <span className="text-sm text-gray-600">
              Submit person-related report
            </span>
          </div>
        </button>

        <button
          onClick={() => handleNavigation("/report-object")}
          className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-6 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border border-gray-200"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-lg">Report Object</span>
            <span className="text-sm text-gray-600">
              Submit object-related report
            </span>
          </div>
        </button>
      </div>

      {/* Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Admin Access
              </h3>
              <p className="text-gray-600">Enter your administrator password</p>
            </div>

            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors text-lg"
                autoFocus
              />
            </div>

            {errorMessage && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errorMessage}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                onClick={handlePasswordSubmit}
              >
                Submit
              </button>
              <button
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
