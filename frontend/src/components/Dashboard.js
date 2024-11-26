import React from 'react';
import '../styles/Dashboard.css';
import '../styles/Body.css'
import Webcam from "./Webcam"; 
import Sidebar from './Sidebar';

const Dashboard = () => {
  const videoSources = [
    'video1.mp4',
    'video2.mp4',
    'video3.mp4',
    'video4.mp4',
  ];
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="bodyof3">
      <div className="cctv-grid">
        {videoSources.map((source, index) => (
          <div className="cctv-footage" key={index}>
            <video
              src={source}
              controls
              autoPlay
              loop
              muted
              className="cctv-video"
            />
            <div className="cctv-label">CCTV {index + 1}</div>
          </div>
        ))}
        <Webcam />
      </div>
      </div>
    </div>
  );
};

export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import '../styles/Dashboard.css';
// import Webcam from './Webcam';
// import axios from 'axios'; // For making API requests

// const Dashboard = () => {
//   const [user, setUser] = useState(null); // State for user details
//   const [notifications, setNotifications] = useState([]); // State for notifications
//   const videoSources = ['video1.mp4', 'video2.mp4', 'video3.mp4', 'video4.mp4'];

//   // Fetch user details and notifications from API
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const userResponse = await axios.get('/api/user'); // Replace with your API endpoint
//         setUser(userResponse.data);
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };

//     const fetchNotifications = async () => {
//       try {
//         const notificationsResponse = await axios.get('/api/notifications'); // Replace with your API endpoint
//         setNotifications(notificationsResponse.data);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     };

//     fetchUserDetails();
//     fetchNotifications();
//   }, []);

//   return (
//     <div className="dashboard">
//       {/* User Details */}
//       <div className="user-details">
//         {user ? (
//           <>
//             <h3>Welcome, {user.name}</h3>
//             <p>Role: {user.role}</p>
//           </>
//         ) : (
//           <p>Loading user details...</p>
//         )}
//       </div>

//       {/* Notifications */}
//       <div className="notifications">
//         <h3>Notifications</h3>
//         <ul>
//           {notifications.length > 0 ? (
//             notifications.map((note, index) => (
//               <li key={index}>{note.message}</li>
//             ))
//           ) : (
//             <p>No notifications available.</p>
//           )}
//         </ul>
//       </div>

//       {/* CCTV Grid */}
//       <div className="cctv-grid">
//         {videoSources.map((source, index) => (
//           <div className="cctv-footage" key={index}>
//             <video
//               src={source}
//               controls
//               autoPlay
//               loop
//               muted
//               className="cctv-video"
//             />
//             <div className="cctv-label">CCTV {index + 1}</div>
//           </div>
//         ))}
//         <Webcam />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
