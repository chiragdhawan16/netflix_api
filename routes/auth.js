import express from "express"
import {adminloginController, loginController,registerController} from "../controllers/authController.js"
import { isAdmin } from "../middleware/authMiddleware.js";
var router =express.Router()


//REGISTER
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

//LOGIN
router.post("/adminlogin" ,adminloginController);

export default router;