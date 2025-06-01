const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// API routes
app.use("/api", authRoutes);
app.use("/api/contacts", contactRoutes);
app.get('/', (req, res) => {
  res.send(`
    Hello from Server !!
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

