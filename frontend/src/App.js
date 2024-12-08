import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Admin from "./components/Admin";
import OfficerLogin from "./components/OfficerLogin";

import ReportPerson from "./components/ReportPerson";
import ReportObject from "./components/ReportObject";
import CaseTable from "./components/CaseTable";
import CaseDetailsPage from "./components/CaseDetailsPage";
import ObjectDetailsPage from "./components/ObjectDetailsPage"; // Adjust path if necessary
import TrackingPage from './components/TrackingPage';
import ReportList from "./components/ReportList";


import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Chat from "./components/Chat";
import Profile from "./components/Profile";

const App = () => {
  const [username, setUsername] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/officer-login" element={<OfficerLogin setUsername={setUsername}/>} />
        
        
        <Route path="/report-person" element={<ReportPerson />} />
        <Route path="/report-object" element={<ReportObject />} />
        <Route path="/cases" element={<CaseTable />} />
        <Route path="/case-details/:caseId" element={<CaseDetailsPage />} />
        <Route path="/object/:id" element={<ObjectDetailsPage />} />
        <Route path="/track/:caseId" element={<TrackingPage />} />
        <Route path="/reportList" element={<ReportList />} />


        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat username={username}  />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
