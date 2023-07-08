import { AppError } from './../app.error.js';
import catchAsyncError from './../middlware/catchAsyncErorr.js';


export const deleteOne = (model)=>{
    return catchAsyncError(async (req,res,next)=>{
        let {id}= req.params
        let results = await model.findByIdAndDelete(id)
        !results && next( new AppError(  "not found ", 404)) 
        results && res.status(200).json({message :"done",results})
    })
}
