  import User from "../models/User.js"
  import { hashPassword } from "../helpers/authHelper.js";

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
  

  export const getUserById=async (req, res) => {
    try {

      const user = await User.findById(req.params.id);
      res.status(200).send({
        success: true,
        message: "Successfully got the users",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin:user.isAdmin,
            profilePic:user.profilePic
           
          },
      }); 
     
    } catch (error) {
        res.status(400).send({
            success: true,
            message: "Error in getting user",
            error,
          })
    }
  }



  export const deleteUser=async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        
        res.status(200).send({
            success: true,
            message: "Successfully deleted the users",
           
          }); 
        
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in deleting user",
            error,
          })
    } 
  }


  export const updateUser=async (req, res) => {
    try {
    const data = req.body;
    const email = data.email;
    let password = data.password;
    const username = data.username;
    const profilePic=data.profilePic;
    const  role=data.isAdmin;
    // return(res.send(role))
    let isAdmin=false;
    
   
    //  validation
    if (!email  || !username) {
      return res.send({message:'somedetails are mising'})
      
    }

    
    if(role==='true')
    {
      isAdmin=true;
       
    }
    

    // find existing one
    const user = await User.findOne({ _id:req.params.id });
    if (!user) {
      return res.send({message:'user dont exist exist database!'})
      
    }

      if (password) {
        password =await hashPassword(password)
        
      }
      else{
        password=user.password
       
      }
    const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            // $set: req.body,
            username,email,password,isAdmin,profilePic
          },
          { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Successfully updated the users",
           
          }); 
      } catch (err) {
        res.status(400).send({
            success: false,
            message: "error in updating the users",
           
          });      }
    
  }




//   get monthly users
export const monthlyUsers=async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);
  
    try {
      const data = await User.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  }



  export const createUser=async(req,res)=>{
    try {

      const data = req.body;
      const email = data.email;
      let password = data.password;
      const username = data.username;
      const profilePic=data.profilePic;
      const  role=data.isAdmin;
      let isAdmin=false;
      
     
      
      //  validation
      if (!email  || !username||!password) {
        
        return res.send({message:'somedetails are mising'})
      }

      if(role==='true')
      {
        isAdmin=true;
       
      }

    
      // find existing one
      const user = await User.findOne({ email });
      if (user) {
        return res.send({message:'User already exist in Database!'})
      }
  
      
      password =await hashPassword(password)
      const newUser = new User({ username,email,password,isAdmin,profilePic});
      const savedUser = await newUser.save();
      
          res.status(200).send({
              success: true,
              message: "Successfully Created the users",
             
            }); 
        } catch (err) {
          res.status(400).send({
              success: false,
              message: "error in Creating the users",
             
            });      }

  }

  

