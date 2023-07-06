import Movie from "../models/Movie.js"



 // create movie
 export const createMovie=async (req, res) => {
  try {
      const title=req.body.title
      const desc=req.body.desc
      const img=req.body.img
      const imgSm=req.body.imgSm
      const imgTitle=req.body.imgTitle
      const trailer=req.body.trailer
      const video=req.body.video
      const year=req.body.year
      const genre=req.body.genre
      let isSeries=false
      if(req.body.isSeries==="true"){
        isSeries=true
      }
      let limit=Number(req.body.limit)
      
      // find existing one
      const existingmovie = await Movie.findOne({title});
      if (existingmovie) {
        
         return res.send({message:'Movie with this name already exist in database!'})
         
      }

      const newMovie = new Movie({ title,desc,img,imgTitle,imgSm,trailer,video,year,limit,genre,isSeries});;
      
        const savedMovie = await newMovie.save();
        res.status(200).send({
            success: true,
            message: "Movie Created Successfully",
            savedMovie
          })
        // res.status(201).json(savedMovie);
      } catch (error) {
        res.status(401).send({
            success: false,
            message: "Something went wrong in creating movie",
            error,
          })
      }
   
  }


//   Delette Movie Controller
export const deleteMovie=async (req, res) => {
    
      try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success: true,
            message: "The movie has been deleted...",
            
          })
       
      } catch (error) {
        res.status(401).send({
            success: false,
            message: "Somethin went wrong in deleting movie",
            error,
          })
      }
    
  }


//   Get Movie Controller
export const getOneMovies=async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.status(200).send({
        success: true,
        message: "Found Movie",
        movie
      })
    } catch (error) {
        res.status(401).send({
            success: false,
            message: "Somethin went wrong in getting movie",
            error,
          })
    }
  }


//   Update movie controller
export const updateMovie=async (req, res) => {
    
      try {
      //  return res.send("chirag")
        const updatedMovie = await Movie.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Movie updated",
            movie:updatedMovie,
            
          })
      } catch (error) {
        res.status(401).send({
            success: false,
            message: "Somethin went wrong in updating movie",
            error,
          })
      }    
  }

//   Get all movie 
export const getAllMovie=async (req, res) => {
      try {
        const movies = await Movie.find().sort({ _id: -1 });
        res.status(200).send({
            success: true,
            message: "Got all Movie",
            movies
          })
      } catch (error) {
        res.status(401).send({
            success: false,
            message: "Somethin went wrong in getting all movie",
            error,
          })
      }
  }

//   got random movie based on type series or movie
export const getRandomMovie=async (req, res) => {
    const type = req.query.type;
    let movie;  
    try {
      if (type === "series") {
        movie = await Movie.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
      } else {
        movie = await Movie.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      }
      res.status(200).send({
        success: true,
        message: "Got random Movie",
        movie
      })
    } catch (error) {
        res.status(401).send({
            success: false,
            message: "Somethin went wrong in getting movie",
            error,
          })
    }
  }


 
 