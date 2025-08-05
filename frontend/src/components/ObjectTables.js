import React from "react";

const ObjectTables = ({ objects }) => {
  return (
    <table className="object-table">
      <thead>
        <tr>
          <th>Object ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Last Seen Location</th>
          <th>Reporter Name</th>
          <th>Date Reported</th>
        </tr>
      </thead>
      <tbody>
        {objects.map((object) => (
          <tr key={object._id}>
            <td>{object._id}</td>
            <td>{object.objectName}</td>
            <td>{object.description}</td>
            <td>{object.lastSeenLocation}</td>
            <td>{object.reporterName}</td>
            <td>
              {object.createdAt
                ? new Date(object.createdAt).toLocaleString()
                : "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ObjectTables;