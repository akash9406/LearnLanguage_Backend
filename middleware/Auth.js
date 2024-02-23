const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const model = require("../model/User");
const User = model.User;

const auth = async (req, res, next) => {
  try {
    // Make sure to use the cookieParser middleware before this middleware in your app
    // This middleware will populate the `req.cookies` object
    const token = req.cookies.token;
    console.log("Token:", token);
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);
    if (decoded.id) {
      req.user = await User.findById(decoded.id)
        .select("-token")
        .select("-password");
      next();
    }
  } catch (error) {
    console.error("Authentication Error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    }
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = auth;
