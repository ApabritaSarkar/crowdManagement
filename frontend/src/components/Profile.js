import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../styles/Body.css";

const Profile = () => {
  const { username } = useParams(); // Extract the username from the URL
  const [officer, setOfficer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfficer = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/officer/${username}`);
        const data = await response.json();

        if (response.ok) {
          setOfficer(data.officer);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Error fetching profile details");
      }
    };

    fetchOfficer();
  }, [username]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!officer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <Sidebar />
      <div className="bodyof3-profile">
        <h1>Officer Profile for {username}</h1>
        <p>
          <strong>Name:</strong> {officer.name}
        </p>
        <p>
          <strong>Email:</strong> {officer.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {officer.phone_number}
        </p>
        <p>
          <strong>Role:</strong> {officer.role}
        </p>
        <p>
          <strong>Area:</strong> {officer.area}
        </p>
      </div>
    </div>
  );
};

export default Profile;
