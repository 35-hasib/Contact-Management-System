const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const User = require("./models/User");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use " });
    }
    const newUser = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10), //hash the pasword
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during signup !!", error);
    res.status(500).json({ error: "Error during signup !!" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token, user: { email: user.email } });
  } catch (error) {
    console.error("Error during signup !!", error);
    res.status(500).json({ error: "Error during signup !!" });
  }
});

function authenticateToken(req, res, next) {
  const authToken = req.headers["authorization"];
  const token = authToken && authToken.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" }); // Unauthorized
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" }); // Forbidden
  }
}

app.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user });
    
  } catch (error) {
    console.error("Error fetching user profile", error);
    res.status(500).json({ error: "Error fetching user profile" });
  }
});


// const Contacts = require("./models/User");
// app.post("/api/contacts", authenticateToken, async (req, res) => {
//   try {
//     const { name, email, phone } = req.body;

//     const newContact = new Contacts({
//       name,
//       email,
//       phone,
//       userId: req.user.userId, // Associate contact with the user
//     });

//     await newContact.save();

//     res.status(201).json({ message: "Contact created successfully" });
//   } catch (error) {
//     console.error("Error creating contact", error);
//     res.status(500).json({ error: "Error creating contact" });
//   }
// });
