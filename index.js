const express = require("express");
const {MongoClient} = require('mongodb')
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = 5001;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

let db;

MongoClient.connect(process.env.MONGO_URI)
.then((client) => {
    db = client.db('taxloss');
    console.log("MongoDB connected successfully")})
.catch((error) => console.error("MongoDB connection error:", error));

app.get("/capital-gains", async (req, res) => {
  try {
    const data = await db.collection("captialgains").findOne({});
    res.json({ capitalGains: data });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch capital gains data" });
  }
});

app.get("/holdings", async (req, res) => {
  try {
    const holdingsData = await db.collection("holdings").find({}).toArray();
    res.json(holdingsData);
  } catch (error) {
    console.error("Error fetching holdings:", error);
    res.status(500).json({ error: "Failed to fetch holdings data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

