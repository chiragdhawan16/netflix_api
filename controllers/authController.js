import User from "../models/User.js"

import { hashPassword, comparePassword }from "../helpers/authHelper.js";

import jwt from"jsonwebtoken";


 export const registerController = async (req, res) => {
  try {

   
  const data = req.body;
  const email = data.email;
  let password = data.password;
  const username = data.username;
  
    profilePic:"https://firebasestorage.googleapis.com/v0/b/netflix-f3af8.appspot.com/o/users%2Fno_image.png?alt=media&token=f8044609-d880-4171-b9fc-dc32e184a59c"
  //  validation

  // return res.send("chirag")
  if (!email || !password || !username) {
    return res.send({message:'please enter email, password or username'})
    
  }
  

  // find existing one
  let existinguser = await User.findOne({ email });
  if (existinguser) {
    return res.send({message:'Email already exist database!'})
    
  }
   existinguser = await User.findOne({ username });
  if (existinguser) {
    return res.send({message:'User name already exist database!'})
    
  }
  
  password=await hashPassword(data.password);
  
  const newuser = new User({
    username: username,
    email: email,
    password: password
    
  }
  );
 

    const user = await newuser.save();
    
    return res.status(200).send({
      success: true,
      message: "Register successfully",
      user
    });
  } catch (err) {
    
    console.log(err)
      res.status(200).send({
      success: false,
      message: "Error in registeration chirag",
          
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const data = req.body;
    const email = data.email;
    let password = data.password;

    //  validation
    if (!email || !password) {
      return res.send({message:'Invalid email or password'})
      
    }

    // find existing one
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({message:'Email not Found in database!'})
    }
    
    
    const match=await comparePassword(password,user.password)

    
    if (!match) {
      return res.send({message:'Entered wrong password'})
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    res.status(200).send({
      success: true,
       message: "login successfully",
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        profilePic:user.profilePic,
      },
      token,
    });

    //   const { password, ...info } = user._doc;

    //   res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in login",
      err
    });
  }
};


export const adminloginController = async (req, res) => {
  try {
    const data = req.body;
    const email = data.email;
    let password = data.password;
    
    //  validation
    if (!email || !password) {
      return res.send({message:'Invalid email or password'})
      
    }

    // find existing one
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({message:'Email not Found in database!'})
    }
    if (!user.isAdmin) {
      return res.send({message:'Your are not authorized to access!'})
    }
    
    const match=await comparePassword(password,user.password)

    
    if (!match) {
      return res.send({message:'Entered wrong password'})
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    res.status(200).send({
      success: true,
       message: "login successfully",
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        profilePic:user.profilePic,
      },
      token,
    });

    //   const { password, ...info } = user._doc;

    //   res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in login",
      err
    });
  }
};