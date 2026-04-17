import jwt from "jsonwebtoken";
import User from "../models/users.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Invalid token" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = { id: decoded.userId };
    if (!req.user) return res.status(401).json({ error: "User not found" });

    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default authMiddleware;