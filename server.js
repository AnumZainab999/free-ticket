require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const freeTicketRoutes = require("./routes/freeTicketRoutes");
const app = express();
app.use(express.json());
app.use(cors());

// 🔗 Connect MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));


app.use("/api/free-ticket", freeTicketRoutes);

// Sample Route
app.get("/", (req, res) => {
  res.send("Node + Express + MongoDB Atlas Backend Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
