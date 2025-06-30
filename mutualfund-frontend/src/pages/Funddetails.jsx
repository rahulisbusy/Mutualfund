// src/pages/FundDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

const FundDetails = () => {
  const { schemeCode } = useParams();
  const [fund, setFund] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFund = async () => {
      try {
        const res = await fetch(`https://api.mfapi.in/mf/${schemeCode}`);
        const data = await res.json();
        setFund(data);
      } catch (err) {
        console.error("Failed to fetch fund details");
      }
    };
    fetchFund();
  }, [schemeCode]);

  const handleSave = async () => {
    try {
      await API.post("/funds/save", { schemeCode });
      setMessage("✅ Fund saved!");
    } catch (err) {
      setMessage("❌ Error saving fund");
    }
  };

  if (!fund) return <p className="p-6">Loading fund details...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">{fund.meta.scheme_name}</h2>
      <p>Scheme Code: {fund.meta.scheme_code}</p>
      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save this fund
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FundDetails;
