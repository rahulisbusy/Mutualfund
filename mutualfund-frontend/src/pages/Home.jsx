// src/pages/Home.jsx
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import React from "react";

const Home = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleSearch = async (e) => {
  e.preventDefault();
  if (!query) return;

  setLoading(true);
  try {
    const res = await fetch(`https://api.mfapi.in/mf/search?q=${query}`);
    const data = await res.json();
    setResults(data);
  } catch (err) {
    console.error("Search error:", err);
    setResults([]);
  }
  setLoading(false);
};
const handleSaveFund = async (schemeCode) => {
  try {
    await API.post("/funds/save", { schemeCode });
    alert("✅ Fund saved!");
  } catch (err) {
    alert("❌ Failed to save fund.");
    console.error(err);
  }
};


  return (
    <div className="p-6 max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search mutual fund by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow border px-4 py-2 rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      {results.length > 0 ? (
        <ul className="space-y-2">
  {results.map((fund) => (
    <li
      key={fund.schemeCode}
      className="p-4 border rounded flex justify-between items-center hover:bg-gray-50"
    >
      <div
        className="cursor-pointer"
        onClick={() => navigate(`/funds/${fund.schemeCode}`)}
      >
        {fund.schemeName}
      </div>

      <button
        className="bg-green-500 text-white px-3 py-1 rounded text-sm"
        onClick={(e) => {
          e.stopPropagation();
          handleSaveFund(fund.schemeCode);
        }}
      >
        Save
      </button>
    </li>
  ))}
</ul>

      ) : (
        !loading && <p>No results found.</p>
      )}
    </div>
  );
};

export default Home;
