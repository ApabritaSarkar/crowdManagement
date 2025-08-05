// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import CaseTable from "./CaseTable";
// import RealTimeUpdates from "./RealTimeUpdates";
// import "../styles/ReportList.css";


// const ReportList = () => {
//   const [cases, setCases] = useState([]);
//   const [realTimeUpdates, setRealTimeUpdates] = useState([]);
//   const [liveFeedStatus, setLiveFeedStatus] = useState(false); // State for live feed status


//   useEffect(() => {
//     // Fetch all cases
//     const fetchCases = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/dashboard/cases");
//         setCases(response.data);
//       } catch (error) {
//         console.error("Error fetching cases:", error.message);
//       }
//     };

//     // Fetch real-time updates
//     const fetchRealTimeUpdates = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/dashboard/realtime");
//         setRealTimeUpdates(response.data);
//       } catch (error) {
//         console.error("Error fetching real-time updates:", error.message);
//       }
//     };

//     fetchCases();
//     fetchRealTimeUpdates();

//     const interval = setInterval(fetchRealTimeUpdates, 5000); // Poll every 5 seconds
//     return () => clearInterval(interval);
//   }, []);

//   // Function to handle live feed
// const startLiveFeed = async () => {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     const video = document.createElement('video');
//     video.srcObject = stream;
//     video.autoplay = true;
//     video.style.cssText = 'position:fixed; top:20px; right:20px; width:300px; height:200px; border:2px solid #007bff; border-radius:8px; z-index:1000;';
//     document.body.appendChild(video);
//     setLiveFeedStatus(true);
//   } catch (error) {
//     console.error("Error accessing camera:", error);
//     alert("Camera access denied or not available");
//   }
// };
// const stopLiveFeed = () => {
//   const video = document.querySelector('video[autoplay]');
//   if (video) {
//     video.srcObject.getTracks().forEach(track => track.stop());
//     video.remove();
//   }
//   setLiveFeedStatus(false);
// };

//   return (
//     <div className="police-dashboard">
//       <h1>Police Dashboard</h1>

//       <section>
//         <h2>Reported Cases</h2>
//         <CaseTable cases={cases} />
//       </section>

//       <section>
//         <h2>Real-Time Surveillance Updates</h2>
//         <RealTimeUpdates updates={realTimeUpdates} />
//       </section>

//       <section>
//         <h2>Live Feed</h2>
// {!liveFeedStatus ? (
//   <button onClick={startLiveFeed} className="btn btn-primary">
//     Open Camera
//   </button>
// ) : (
//   <button onClick={stopLiveFeed} className="btn btn-danger">
//     Close Camera
//   </button>
// )}
//       </section>
//     </div>
//   );
// };

// export default ReportList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import CaseTable from "./CaseTable";
import RealTimeUpdates from "./RealTimeUpdates";
import "../styles/ReportList.css";

const ReportList = () => {
  const [cases, setCases] = useState([]);
  const [realTimeUpdates, setRealTimeUpdates] = useState([]);
  const [liveFeedStatus, setLiveFeedStatus] = useState(false);

  useEffect(() => {
    // Fetch all cases
    const fetchCases = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/cases");
        setCases(response.data);
      } catch (error) {
        console.error("Error fetching cases:", error.message);
      }
    };

    // Fetch real-time updates
    const fetchRealTimeUpdates = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/realtime");
        setRealTimeUpdates(response.data);
      } catch (error) {
        console.error("Error fetching real-time updates:", error.message);
      }
    };

    fetchCases();
    fetchRealTimeUpdates();

    const interval = setInterval(fetchRealTimeUpdates, 5000);
    return () => clearInterval(interval);
  }, []);

  // Function to handle live feed
  const startLiveFeed = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.autoplay = true;
      video.style.cssText = 'position:fixed; top:20px; right:20px; width:300px; height:200px; border:2px solid #007bff; border-radius:8px; z-index:1000;';
      document.body.appendChild(video);
      setLiveFeedStatus(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Camera access denied or not available");
    }
  };

  const stopLiveFeed = () => {
    const video = document.querySelector('video[autoplay]');
    if (video) {
      video.srcObject.getTracks().forEach(track => track.stop());
      video.remove();
    }
    setLiveFeedStatus(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-white bg-clip-text text-transparent mb-4 drop-shadow-2xl">
          🚔 Police Command Center
        </h1>
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20">
          <div className={`flex items-center gap-2 font-semibold ${liveFeedStatus ? 'text-green-400' : 'text-red-400'}`}>
            <div className={`w-3 h-3 rounded-full ${liveFeedStatus ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
            {liveFeedStatus ? '🔴 LIVE MONITORING' : '⚫ SYSTEM READY'}
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        {/* Reported Cases Section */}
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-6 ">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl">
                📋
              </div>
              <h2 className="text-2xl font-bold text-white">Active Cases</h2>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
              {cases.length}
            </div>
          </div>
          <div className="flex justify-center items-center mb-6">
            <CaseTable cases={cases} />
          </div>
        </div>

        {/* Live Feed Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl hover:shadow-green-500/20 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-2xl">
              📹
            </div>
            <h2 className="text-2xl font-bold text-white">Live Camera</h2>
          </div>
          
          <div className="space-y-6">
            {/* Camera Preview Area */}
            <div className="bg-black/30 rounded-2xl p-8 border border-white/10 min-h-48 flex flex-col items-center justify-center">
              {!liveFeedStatus ? (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full flex items-center justify-center text-4xl shadow-lg">
                    📷
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-white mb-2">Camera Ready</p>
                    <p className="text-gray-400">Click to activate surveillance</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-bold animate-pulse">
                    <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                    RECORDING
                  </div>
                  <p className="text-green-400 font-semibold">🔴 Live feed active in overlay</p>
                  <p className="text-gray-400 text-sm">Camera positioned at top-right</p>
                </div>
              )}
            </div>

            {/* Control Button */}
            <div className="flex justify-center">
              {!liveFeedStatus ? (
                <button 
                  onClick={startLiveFeed} 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
                >
                  <span className="text-xl">📹</span>
                  Start Live Feed
                </button>
              ) : (
                <button 
                  onClick={stopLiveFeed} 
                  className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
                >
                  <span className="text-xl">⏹️</span>
                  Stop Camera
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Real-Time Updates Section */}
        <div className="lg:col-span-3 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl">
                📡
              </div>
              <h2 className="text-2xl font-bold text-white">Surveillance Updates</h2>
            </div>
            <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full border border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <span className="font-semibold">Live Data</span>
            </div>
          </div>
          <div className="bg-black/20 rounded-2xl p-6 border border-white/10">
            <RealTimeUpdates updates={realTimeUpdates} />
          </div>
        </div>
        
      </div>

      {/* Floating Stats */}
      <div className="fixed bottom-6 left-6 flex gap-4">
        <div className="bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20 text-sm font-semibold">
          <span className="text-blue-400">Total Cases:</span> <span className="text-white">{cases.length}</span>
        </div>
        <div className="bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20 text-sm font-semibold">
          <span className="text-purple-400">Updates:</span> <span className="text-white">{realTimeUpdates.length}</span>
        </div>
      </div>
    </div>
  );
};

export default ReportList;