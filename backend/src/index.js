import dotenv from "dotenv";
import app from "./app.js"
import connectDB from "./config/database.js";
dotenv.config({path: './.env'})
console.log(process.env.PORT)
const startServer = async()=>{
    try{
        await connectDB();
        app.on("error",(error)=>{
        console.log("ERROR",error);
        throw error;
    });                      //process.env.PORT
                            //${process.env.PORT}
    app.listen(process.env.PORT ||8000, () =>{
        console.log(`Server is running on port: ${process.env.PORT}`);
    });
    }
    catch(error){
        console.log("MongoDB connection failed",error);
    }
    }
    startServer();
