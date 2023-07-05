import express from "express"
import {getAllMovie} from "../controllers/movieController.js"
var router =express.Router()



router.get("/", getAllMovie);

export default router;