import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'


export const userVerification = (req, res, next) => {
  try {
    const userAuthHeader = req.header("Authorization");

    if (!userAuthHeader || !userAuthHeader.startsWith("Bearer ")) {
      return res.status(403).json({ error: "Access Denied" });
    }

    const userToken = userAuthHeader.substring(7);
    // console.log(process.env.ACCESS_SECERET_KEY);
    // console.log(userToken);
 
    jwt.verify(userToken, process.env.ACCESS_SECERET_KEY, (err, decoded) => {
      if (err) {
        return res.status(500).json({ error: "Authentication failed" });
      }
      req.decoded = decoded;
      next();
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
