import {User} from "../models/user.model.js";
const registerUser = async(req,res)=>{
    try{
        const  {username,email,password }=reg.body;//سنحتفظ به في نص الطلب


        //basic validation
        if(!username || !email || !password){
            return res.status(400).json({message: "all fields are important!"})
        }

        //check if user exists already
        const existing = await User.findOne({email: email.toLowerCase() });
        if(existing) {
            return res.status(400).json({message: "user already exists" });
        }

        const user = await User.create({
           username,
           email: email.toLowerCase(),
           password,
           loggedIn: false,
        });
        
        
        res.status(201).json({message: "User registed",
        user: { id: user._id, email: user.email, username: user.username}
        });
    }
    catch(error){
        res.status(500).json({ message: "Internal server error", error: error.message});
    }
};


const loginUser = async(req,res) => {
    try{
          //checking if the user already exists
          const {email, password} = req.body;
          const user = await User.findOne({
            email: email.toLowerCase()
          });
          if (!user) return res.status(400).json({
            message: "user not found"
          });


          // compare passwords
          const isMatch = await user.comparePassword(password);
          if(!isMatch) return res.status(400).json({
            message: "Invalid credentials"
          })

          res.status(200).json({
            message: "user logged in",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
          })
    }
    catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
} 


const logoutuser = async(req,res) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({
            email
        });
        if(!user) return res.status(404).json({
            message: "User not found"
        });
         res.status(200).json({
            mesage: "logout successful"
         });
    }
    catch(error){
        res.status(500).json({
            message: "Internal Server Error",error
        });
    }
}




export {
    registerUser,
    loginUser,
    logoutuser
};
