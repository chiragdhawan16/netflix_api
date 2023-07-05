import Movie from "../models/Movie.js"

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


 
 