import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Admin from "./components/Admin";
import OfficerLogin from "./components/OfficerLogin";
import ReportDiary from "./components/ReportDiary";
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
        <Route path="/report-diary" element={<ReportDiary />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat username={username}  />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
