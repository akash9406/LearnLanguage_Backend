const jwt = require("jsonwebtoken");
const model = require("../model/User");
const User = model.User;
const auth = async (req, res, next) => {
  try {
    const cookie = req.cookies;
      console.log(`change ${req.cookies}`)
    var decoded = jwt.verify(cookie.token, process.env.JWT_SECRET);
    if (decoded.id) {
      //req.user here is a key which we have create in  req object which will be pass down to next()
    
      req.user = await User.findById(decoded.id)
        .select("-token")
        .select("-password");
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error});
  }
};

module.exports = auth;
