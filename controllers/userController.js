import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      profilePic: { type: String, default: "" },
      isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
  const User=mongoose.model("User", UserSchema);
  // module.exports = mongoose.model("User", UserSchema);
  
 export const getallusers=async (req, res) => {
      try {
          const users=await User.find().sort({ _id: -1 })
          if(users)
          {
              res.status(200).send({
                  success: true,
                  message: "Successfully got all users",
                  users,
                });  
          }
         
      } catch (error) {
          
          res.status(400).send({
              success: false,
              message: "Error in getting users all users",
              error,
            })
      }
      
  }
  