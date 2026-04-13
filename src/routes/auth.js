import { Router } from "express";
import jwt from "jsonwebtoken";
import { validateRegister, validateAuthResult, validateLogin } from "../middleware/authValidation.js";
import User from "../models/users.js";

const router = Router();

// REGISTER
router.post("/register", validateRegister, validateAuthResult, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ error: "Email already registered" });

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN || "1d" });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// LOGIN
router.post("/login", validateLogin, validateAuthResult, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN || "1d" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;