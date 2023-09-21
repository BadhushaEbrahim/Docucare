import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

export const adminVerification = (req, res, next) => {
  try {
    const doctorAuthHeader = req.header("Authorization");

    if (!doctorAuthHeader)
      return res.status(403).json({ error: "Access Denied" });

    const doctorToken = doctorAuthHeader.split(" ").pop();
    jwt.verify(doctorToken, process.env.ACCESS_SECERET_KEY, (err, decoded) => {
      if (err) {
        return res.status(500).json({ error: "Authentication failed" });
      }
      req.decoded = decoded;
      next();
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
