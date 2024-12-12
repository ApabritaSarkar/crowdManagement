import React, { useState , useEffect} from "react";
import "../styles/Dashboard.css";
import "../styles/Body.css";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [fireCount, setFireCount] = useState(0); // Fire detection
  const [gatheringsCount, setGatheringsCount] = useState(0); // Crowd gathering detection
  const [objectCount, setObjectCount] = useState(0); // Object detection
  const [humanCount, setHumanCount] = useState(0); // Human count (from count.py)

  // UseEffect for API polling
  useEffect(() => {
    // Fetch fire detection statistics every second
    const fireInterval = setInterval(() => {
      fetch("http://localhost:5000/statistics") // Fire detection API
        .then((response) => {
          if (!response.ok) throw new Error("Fire detection API error");
          return response.json();
        })
        .then((data) => {
          setFireCount(data.fire_detected || 0); // Use the actual API response key
        })
        .catch((error) =>
          console.error("Error fetching fire detection stats:", error)
        );
    }, 1000);

    // Fetch crowd gathering statistics every second
    const gatheringInterval = setInterval(() => {
      fetch("http://localhost:5005/statistics") // Crowd gathering API
        .then((response) => {
          if (!response.ok) throw new Error("Crowd gathering API error");
          return response.json();
        })
        .then((data) => {
          setGatheringsCount(data.gatherings_detected || 0); // Use the actual API response key
        })
        .catch((error) =>
          console.error("Error fetching crowd gathering stats:", error)
        );
    }, 1000);

    // Fetch object detection statistics every second
    const objectInterval = setInterval(() => {
      fetch("http://localhost:5002/statistics") // Object detection API
        .then((response) => {
          if (!response.ok) throw new Error("Object detection API error");
          return response.json();
        })
        .then((data) => {
          setObjectCount(data.object_count || 0); // Use the actual API response key
        })
        .catch((error) =>
          console.error("Error fetching object detection stats:", error)
        );
    }, 1000);

    // Fetch human count (count.py) every second
    const humanInterval = setInterval(() => {
      fetch("http://localhost:5003/count") // Human count API
        .then((response) => {
          if (!response.ok) throw new Error("Human count API error");
          return response.json();
        })
        .then((data) => {
          setHumanCount(data.human_count || 0); // Use the actual API response key
        })
        .catch((error) =>
          console.error("Error fetching human count stats:", error)
        );
    }, 1000);

    // Clear intervals on component unmount
    return () => {
      clearInterval(fireInterval);
      clearInterval(gatheringInterval);
      clearInterval(objectInterval);
      clearInterval(humanInterval);
    };
  }, []);


  return (
    <div className="dashboard">
      <Sidebar />
      <div className="bodyof3">
        <div className="cctv-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          {/* Fire Detection Feed */}
          <div className="cctv-footage">
            <h3>Fire Detection</h3>
            <img
              src="http://localhost:5005/video_feed" // Fire detection video feed
              alt="Fire Detection Feed"
              className="cctv-video"
              style={{ width: '100%', border: '2px solid red' }}
            />
            <div className="cctv-label">CCTV 1 [Latitude 40.354728 :
              Longitude  -98.658922] {fireCount}</div>
          </div>
          {/* Crowd Gathering Feed */}
          <div className="cctv-footage">
            <h3>Fire Detection</h3>
            <img
              src="http://localhost:5001/video_feed" // Crowd gathering video feed
              alt="Crowd Gathering Feed"
              className="cctv-video"
              style={{ width: '100%', border: '2px solid blue' }}
            />
            <div className="cctv-label">CCTV 2 [Latitude 44.968046 :
              Longitude  -94.420307]</div>
          </div>
          {/* Object Detection Feed */}
          <div className="cctv-footage">
            <h3>Gathering Detection</h3>
            <img
              src="http://localhost:5002/video_feed" // Object detection video feed
              alt="Object Detection Feed"
              className="cctv-video"
              style={{ width: '100%', border: '2px solid green' }}
            />
            <div className="cctv-label">CCTV 3 [Latitude 99.372256 :
              Longitude  -77.837256]</div>
          </div>
          {/* Human Count Feed */}
          <div className="cctv-footage">
            <h3>Human Detection</h3>
            <img
              src="http://localhost:5003/video_feed" // Live webcam feed for count.py
              alt="Human Detection Feed"
              className="cctv-video"
              style={{ width: '100%', border: '2px solid orange' }}
            />
            <div className="cctv-label">CCTV 4 [Latitude 88.263784 :
              Longitude  -22.746655]</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
