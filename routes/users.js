import express from "express"
import {getallusers} from "../controllers/userController.js"
var router =express.Router()



router.get("/", getallusers);

export default router;