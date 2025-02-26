const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, owner) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.owner = owner;
    next();
  });
};
