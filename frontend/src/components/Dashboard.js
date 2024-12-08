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

