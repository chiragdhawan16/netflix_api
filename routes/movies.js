import express from "express"
import {getAllMovie,createMovie,deleteMovie,getOneMovies,updateMovie,getRandomMovie} from "../controllers/movieController.js"
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
var router =express.Router()

//CREATE
router.post("/", requireSignIn,isAdmin, createMovie);

//DELETE
router.delete("/:id", requireSignIn,isAdmin,deleteMovie );

//GET one movie
router.get("/find/:id", requireSignIn,getOneMovies );


//UPDATE
router.put("/:id", requireSignIn,isAdmin,updateMovie );

//GET ALL movie gor admin to update from list
router.get("/", requireSignIn, isAdmin, getAllMovie );


//GET RANDOM for user and admin both

router.get("/random", requireSignIn,getRandomMovie );


export default router;