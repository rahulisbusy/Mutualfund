import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FundDetails from "./pages/Funddetails";
import SavedFunds from "./pages/Savedfunds";
import Navbar from "./components/Navbar";
import React from "react";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />

        {/* Protected Routes */}
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/funds/:schemeCode" element={token ? <FundDetails /> : <Navigate to="/login" />} />
        <Route path="/saved" element={token ? <SavedFunds /> : <Navigate to="/login" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
