import User from "../../model/UserSchema.js";
import Doctor from "../../model/docterSchema.js";

export const userDetails = async (req, res) => {
  try {
    const userDetails = await User.findOne({ _id: req.params.id });
    res
      .status(200)
      .json({ message: "user data sent successfully", userDetails });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const useDetails = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        userName: req.body.userName,
        email: req.body.email,
        number: req.body.number,
      }
    );
    if (!userDetails) {
      return res
        .status(200)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "user data updated successfully", useDetails });
  } catch (error) {
    res.status(400).json({ error: err });
  }
};

export const getAllDoc = async (req, res) => {
  try {
    const docters = await Doctor.find({ isVerified: true });
    if (!docters) {
      console.log("Doctors not found");
      return res.status(404).json({ message: "Doctors not Found" });
    }
    res.status(200).json({ message: "this is the doc data", docters });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const getDoc = async (req, res) => {
  const docID = req.params.id;
  try {
    const docDetails = await Doctor.findOne({ _id: docID });
    if (!docDetails) {
      console.log("Doctor not found");
      return res.status(404).json({ message: "Doctor not Found" });
    }
    return res
      .status(200)
      .json({ message: "this is the docDetais", docDetails });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "an error aquired Error:", error: err });
  }
};

