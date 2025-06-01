const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({ email }))
      return res.status(400).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await new User({ name, email, password: hashedPassword }).save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Error during signup" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user: { email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Error during login" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ error: "Error fetching profile" });
  }
};
