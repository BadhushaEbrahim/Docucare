import Doctor from "../../model/docterSchema.js"
import cloudinary from '../../utilities/cloudinary.js'
import bcrypt from "bcrypt";


export const doctorDetails = async (req, res) => { 
  try {
    const doctorDetails = await Doctor.findOne({ _id: req.params.id });
    console.log(`this is docter details==${doctorDetails}`);
    res
      .status(200)
      .json({ message: "data sent successfully successfully", doctorDetails });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateDetails = async (req, res) => {
  try {
    
    const doctorDetails = await Doctor.findOneAndUpdate(
      { _id: req.params.id },
      {
        fullName: req.body.fullName,
        number: req.body.number,
        experience: req.body.experience,
      }
    );
    if (!doctorDetails) {
      return res
        .status(200)
        .json({ success: false, message: "Doctor not found" });
    }
    res
      .status(200)
      .json({ message: "doctor data updated successfully", doctorDetails });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updatePassword = async (req, res) => {
  try {
    console.log(req.body,"lll");
    const password = req.body.newPassword;
    console.log(password);
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await Doctor.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set:{
            password: hashedPassword,
          }
        }
      );

      return res
        .status(200)
        .json({ message: "doctor password is updated successfully" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const updateProfileImage=async(req,res)=>{
  try {
    const result=await cloudinary.uploader.upload(req.file.path)
    const doctor=await Doctor.findByIdAndUpdate(req.params.id,{
      $set:{
        profilePic:result.secure_url
      }
    });
    const pic=doctor.profilePic
    return res.status(200).json({message:"doctor image uploaded successfully",pic})
  } catch (error) {
    res.status(400).json({error})
    throw(error)
  }
}


  
