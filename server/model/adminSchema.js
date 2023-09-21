import mongoose from "mongoose";


const AdminSchema=mongoose.Schema({
    
    email:{
        type:String,
        required:true,
    },
    password: {
        type: String,
        required: true
    }

})


const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
// const admin1 = new Admin(adminj);
// admin1
//   .save()
//   .then((res) => console.log("saved", res))
//   .catch((error) => {
//     console.log(error);
//   });

