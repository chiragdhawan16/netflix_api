import express from "express"
import {loginController,registerController} from "../controllers/authController.js"
var router =express.Router()


//REGISTER
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

export default router;