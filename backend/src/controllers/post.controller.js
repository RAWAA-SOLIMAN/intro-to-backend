import { Post } from "../models/post.model.js";

//create a post
const createPost = async (req, res) => {
    try{
        const { name, description, age} = req.body;

        if(!name || !description || !age){
            return res.status(400).json({
                message: "All field are required"
            });
        }
            const post = await Post.create({ name, description, age });
        
             res.status(201).json({
             message: "Post created successfully", post
             });
        
    }
    catch(error){
        res.status(500).json({
            message: "Internal Server error", error
        });
    }
}



//Read all posts
const getPosts = async(req,res) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    }
    catch(error){
         res.status(500).json({
            message: "Internal Server error", error
        });
    }
}



const updatePosts = async(req,res) => {
   try{
    
    // basic validaition to check if the body is empty
    if(Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "no data provided for update"
        });
    }

    const post = await Post.findByIdAndUpdate(req.params.id, req.body,
        {new: true});
    
    if(!post) return res.status(404).json({
        message: "post not found"
    });

    res.status(200).json({
        message: "post updated successfully", post
    });

  }
  catch(error){
     res.status(500).json({
            message: "Internal Server error", error
        });
  }
}

const deletePosts = async(req,res) => {
    try{
        const deleted = await Post.findByIdAndDelete(req.params.id);
         if(!deleted) return res.status(404).json({
            message: "post not found"
         });

         res.status(200).json({
            message: "post successfully deleted"
         });
    }
    catch(error){
         res.status(500).json({
            message: "Internal Server error", error
        });
    }
}


export {
    createPost,
    getPosts,
    updatePosts,
    deletePosts
};
