import List from "../models/List.js"


// get list
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

  // create list
  export const createList=async (req, res) => {
   
  // return res.send(req.body)
      const newList = new List(req.body);
      const title=req.body.title
      try {

        const existinglist = await List.findOne({title});
      if (existinglist) {
        return res.send({message:'List with this title already exist in Database!'})
      }
  
        const savedList = await newList.save();
        res.status(200).send({
          success:true,
          message:'Succesfully created list',
            
      })
       
      } catch (error) {
        res.status(401).send({
          success:false,
          error,
          message:'error in creating list'
      })
      }
  }

  // delete list
  export const deleteList=async (req, res) => {
   
      try {
        await List.findByIdAndDelete(req.params.id);
        res.status(200).send({
          success:true,
          message:'Succesfully deleted list',
         
      })
       
      } catch (error) {
        res.status(401).send({
          success:false,
          error,
          message:'error in deleting list'
      })
      }
   
  }
 