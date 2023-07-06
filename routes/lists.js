import express from "express"
import {getLists,deleteList,createList} from "../controllers/listController.js"
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
var router =express.Router()



//CREATE
router.post("/", requireSignIn,isAdmin,createList );

//DELETE
router.delete("/:id", requireSignIn,isAdmin,deleteList );

//GET
router.get("/", requireSignIn,getLists );


export default router;