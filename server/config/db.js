import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGOURL, {
      dbName: "Docucare"
    });

    console.log("DATABASE CONNECTED SUCCESSFULLY");
  } catch (err) {
    console.error(err);
  }
};

export default connectDb;
