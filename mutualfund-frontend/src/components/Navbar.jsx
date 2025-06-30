// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import React from "react";
const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between">
      <div className="font-bold">MutualFundApp</div>
      <div className="flex gap-4">
        {token && <Link to="/">Home</Link>}
        {token && <Link to="/saved">Saved</Link>}
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}
        {token && (
          <button onClick={handleLogout} className="text-white underline">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
