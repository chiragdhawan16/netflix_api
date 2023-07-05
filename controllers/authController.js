import User from "../models/User.js"
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
 