import tokenSchema from "./../model/tokens.js"

const createTokenDocument=async(tokenData)=>{
    try {
        //const newToken =new tokenSchema\
        await tokenSchema.create(tokenData)
        console.log("token document created");
        return true 
    } catch (error) {
        console.log(error);
        throw error
    }
};
//Delete Exixting user and doctor refresh token document
const deleteToken=async(token,userId)=>{
    try {
        const result =await tokenSchema.deleteOne({

            token:token,
            userId:userId
        });
        console.log(result);
    } catch (error) {
        throw error
    }
}

export{createTokenDocument,deleteToken}
