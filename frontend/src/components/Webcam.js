import React, { useRef, useEffect } from "react";
import "../styles/Webcam.css"; 

const Webcam = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true, 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    getCameraStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="webcam-container">
      {/* Label for the Webcam */}
      <div className="webcam-label">CCTV 5</div>
      
      {/* Webcam Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="webcam-video"
      ></video>
    </div>
  );
};

export default Webcam;
