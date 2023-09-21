
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import Userschema from "../model/UserSchema.js";
import DoctorSchema from "../model/docterSchema.js"
import  dotenv from "dotenv";
dotenv.config()


const Option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.ACCESS_SECERET_KEY
  }; 
  

const userStrategy = new Strategy(Option, async (payload, done) => {
  try {
    console.log("payload", payload); // payload is decoded
    const user = await Userschema.findById(payload.id); 
    if (user && !user.isBlocked) {
      console.log("Auth passed");
      return done(null, user);
    }
    return done(null, false); 
  } catch (error) {
    console.log(error);
    return done(error, false);
  }
});
const DoctorStartergy = new Strategy(Option, async (payload, done) => {
  try {
    console.log("payload", payload); // payload is decoded
    const doctor = await DoctorSchema.findById(payload.id); 
    if (doctor && !doctor.isBlocked) {
      console.log("Auth passed");
      return done(null, doctor);
    }
    return done(null, false); 
  } catch (error) {
    console.log(error);
    return done(error, false);
  }
});

passport.use("user", userStrategy);
passport.use("doctor",DoctorStartergy)

const userAuthMiddleware = (req, res, next) => {
  passport.authenticate("user", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error." });
    }

    if (!user) {
      if (info && info.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired." });
      }
      return res.status(401).json({ error: "Authentication failed." });
    }

    if (user.isBlocked) {
      return res.status(403).json({ error: "User is blocked." });
    }

    // Authentication succeeded, store the authenticated user in the request
    req.user = user;
    next();
  })(req, res, next);
};

const doctorAuthmiddleware = (req, res, next) => {
  passport.authenticate("doctor", { session: false }, (err, doctor, info) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error." });
    }

    if (!doctor) {
      // If token is not found or invalid
      if (info && info.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired." });
      }
      return res.status(401).json({ error: "Authentication failed." });
    }

    if (doctor.isBlocked) {
      return res.status(403).json({ error: "Doctor is blocked." });
    }

    // Authentication succeeded, store the authenticated doctor in the request
    req.doctor = doctor;
    next();
  })(req, res, next);
};


export { userAuthMiddleware ,doctorAuthmiddleware};
