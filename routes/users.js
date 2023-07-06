import express from "express"
import {createUser, deleteUser, getUserById, getallusers, updateUser} from "../controllers/userController.js"

import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";
var router =express.Router()



//GET ALL
router.get("/", requireSignIn,isAdmin, getallusers);

//GET one user
router.get("/find/:id",  getUserById);

//DELETE
router.delete("/:id", requireSignIn,isAdmin,deleteUser );

//UPDATE
router.put("/:id", requireSignIn,isAdmin, updateUser);

//Create
router.post("/", requireSignIn,isAdmin, createUser);



export default router;