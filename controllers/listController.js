import List from "../models/List.js"



 export const getLists=async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let lists = [];
    try {
      if (typeQuery) {
        if (genreQuery) {
          lists = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery, genre: genreQuery } },
          ]);
        } else {
          lists = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery } },
          ]);
        }
      } else {
        lists = await List.aggregate([
          { $sample: { size: 10 } }]);
      }
      res.status(200).send({
        success:true,
        message:'Succesfully got list',
        lists
    })
      
    } catch (error) {
      res.status(401).send({
        success:false,
        error,
        message:'error in getting list'
    })
      
    }
  }
 