import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import UserRouter from "./routes/UserRouter.js";
import DoctorRouter from './routes/doctorRouter.js'
import Adminrouter from './routes/adminrouter.js'
import connectDb from "./config/db.js";
import passport from "passport";



const app = express();
dotenv.config();

app.use(cors({        
    origin: '*',
    optionsSuccessStatus: 200
  }));
  
  
  

  
app.use(passport.initialize()); 
app.use(morgan("dev"));
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 



app.use("/api/users", UserRouter);
app.use("/api/doctors", DoctorRouter);
app.use("/api/admin",Adminrouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  });

app.get('*', (req, res) => {
    res.status(404).json({ msg: "page not found" });
});

connectDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server connected at port ${process.env.PORT}`);
    });
});
