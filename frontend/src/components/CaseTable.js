import React from "react";
import { useNavigate } from "react-router-dom";

const CaseTable = ({ cases }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <table className="case-table">
      <thead>
        <tr>
          <th>Case ID</th>
          <th>Missing Name</th>
          <th>Description</th>
          <th>Last Seen Location</th>
          <th>Status</th>
          <th>Date Reported</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cases.map((caseItem) => (
          <tr key={caseItem._id}>
            <td>{caseItem._id}</td>
            <td>{caseItem.name}</td>
            <td>{caseItem.description}</td>
            <td>{caseItem.location}</td>
            <td>{caseItem.status}</td>
            <td>
              {caseItem.createdAt
                ? `${new Date(caseItem.createdAt).toLocaleDateString()} ${new Date(caseItem.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                : "N/A"}
            </td>
            <td>
              <button
                onClick={() => navigate(`/case-details/${caseItem._id}`)}
                className="w-full bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CaseTable;
