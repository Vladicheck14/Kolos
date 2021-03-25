import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const token = req.header("authToken");
  if (!token) {
    return res.status(400).json({ message: "Access denied" });
  }
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    if (!verified) {
      return res.status(400).json({ message: "Invalid token" });
    }
    req.user = verified;
    next();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
