// src/pages/SavedFunds.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const SavedFunds = () => {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await API.get("/funds/saved");
        setFunds(res.data);
      } catch (err) {
        console.error("Error loading saved funds");
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  if (loading) return <p className="p-6">Loading saved funds...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Saved Mutual Funds</h2>
      {funds.length === 0 ? (
        <p>No saved funds.</p>
      ) : (
        <ul className="space-y-2">
          {funds.map((fund) => (
            <li
              key={fund.meta.scheme_code}
              className="p-4 border rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate(`/funds/${fund.meta.scheme_code}`)}
            >
              {fund.meta.scheme_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedFunds;
