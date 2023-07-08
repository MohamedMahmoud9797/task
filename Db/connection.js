import mongoose from "mongoose";



export const dbConnection = ()=>{
   mongoose.connect("mongodb+srv://task:task@cluster0.rf0euka.mongodb.net/task").then(()=>console.log("db is connected")).catch((err)=>{
       console.log(err);
   })
   } 

//    mongodb+srv://<username>:<password>@cluster0.rf0euka.mongodb.net/