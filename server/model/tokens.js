import {Schema,model,Types} from "mongoose"
const TokenSchema=new Schema(
    {
     userId:{
        type:Types.ObjectId,
        required:true,
     },
     token:{
        type:String,
        required:true,
        unique:true
     },
     expiration:{ 
        type:Date,
        required:true,
        expires:0,// Set the expiration time for documents
     }   
    },
    {timestamps:true}
)

export default model("Token",TokenSchema)