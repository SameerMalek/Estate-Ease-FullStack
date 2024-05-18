import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  //Taking the cookie:
  const token = req.cookies.token;
  //Checking token is present or not:
  if (!token) {
    return res.status(401).json({ message: "Not Authenticated!" });
  }
  //Verifying the token:
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not Valid!" });
    req.userId =payload.id;
    next();
  });
};