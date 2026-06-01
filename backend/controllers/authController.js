const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "dev_secret_change_me", {
    expiresIn: "7d"
  });
};

const buildUserResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: createToken(user._id)
});

const register = async (req, res) => {
  try {
    const { name, email, password, role = "student" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if (!["student", "admin"].includes(role)) {
      return res.status(400).json({ message: "Role must be student or admin" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const user = await User.create({ name, email, password, role });
    res.status(201).json(buildUserResponse(user));
  } catch (error) {
    res.status(500).json({ message: "Could not register user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json(buildUserResponse(user));
  } catch (error) {
    res.status(500).json({ message: "Could not log in" });
  }
};

module.exports = { register, login };
