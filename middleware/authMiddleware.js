// import { response } = require("express");

import User from "../models/User.js"
import jwt from "jsonwebtoken"


export const requireSignIn=async(req,res,next)=>{
    try {
         
        //   const token=req.headers.token.split(" ")[1];
          const token=req.headers.authorization.split(" ")[1];   
        // const token=req.headers.authorization;
    
        // return(res.send(req.body))

        const decode=jwt.verify(
            token,
            process.env.JWT_SECRET
            );
                
            
        next();

        } catch (error) {
            console.log(error);
            res.status(200).send({
                success:false,
                error,
                message:'login required'
            })
           
             
        }
};


export const isAdmin=async(req,res,next)=>{
    try {
        //    const token=req.headers.token.split(" ")[1];
              const token=req.headers.authorization.split(" ")[1]; 
            // const token=req.headers.authorization
            
        
        const decode=jwt.verify(
            token,
            process.env.JWT_SECRET
            );
            req.user=decode; 
             
        const checkUser=await User.findById(req.user.id)
        
        if(!checkUser.isAdmin){
            return res.send({message:'Unathorized Accesss'})  
            
        }else{
            
            next();
         }
         
        
        } catch (error) {
            console.log(error);
            res.status(401).send({
                success:false,
                error,
                message:'invalid token'
            })

        }
}

