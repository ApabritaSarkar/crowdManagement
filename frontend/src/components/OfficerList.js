import React from 'react';

const OfficerList = ({ officers }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Role</th>
          <th>Area</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {officers.map((officer, index) => (
          <tr key={index}>
            <td>{officer.name}</td>
            <td>{officer.email}</td>
            <td>{officer.phone_number}</td>
            <td>{officer.role}</td>
            <td>{officer.area}</td>
            <td>{officer.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OfficerList;
