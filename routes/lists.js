import express from "express"
import {getLists} from "../controllers/listController.js"
var router =express.Router()



router.get("/", getLists);

export default router;