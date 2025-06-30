const axios = require('axios');
const User = require('../models/User');

exports.saveFund = async (req, res) => {
  const { schemeCode } = req.body;
  const user = req.user;

  if (!schemeCode) return res.status(400).json({ msg: 'No schemeCode provided' });

  if (!user.savedFunds.includes(schemeCode)) {
    user.savedFunds.push(schemeCode);
    await user.save();
  }

  res.json({ savedFunds: user.savedFunds });
};

exports.getSavedFunds = async (req, res) => {
  const schemeCodes = req.user.savedFunds;

  console.log("🧠 User:", req.user.email);
  console.log("🔢 Saved Funds:", schemeCodes);

  const fundDetails = await Promise.all(
    schemeCodes.map(async (code) => {
      try {
        console.log(`🌐 Fetching: https://api.mfapi.in/mf/${code}`);
        const { data } = await axios.get(`https://api.mfapi.in/mf/${code}`);
        return data;
      } catch (err) {
        console.error(`❌ Error fetching ${code}:`, err.message);
        return null;
      }
    })
  );

  const result = fundDetails.filter(Boolean);
  console.log("📦 Final Response:", result);
  res.json(result);
};


exports.deleteFund = async (req, res) => {
  const { schemeCode } = req.params;
  const user = req.user;

  user.savedFunds = user.savedFunds.filter(code => code !== schemeCode);
  await user.save();

  res.json({ savedFunds: user.savedFunds });
};
