import catchAsyncError from './../../../utlits/middlware/catchAsyncErorr.js';
import { userModel } from './../../../Db/models/user.model.js';
import { AppError } from '../../../utlits/app.error.js';

const createUser = catchAsyncError(async (req,res,next)=>{
    let user = await userModel.findOne({email: req.body.email})
    if(user) return next(new AppError("email is already registered",409)) 
      let results= new userModel(req.body)
      let added = await results.save()
      res.status(201).json({message :"added",added})
  }
  )

  export const logOut =catchAsyncError( async (req, res) => {
    const user = await userModel.findByIdAndUpdate(req.user._id, { isLoggedIn: false })
    res.status(201).json({ message: "Log Out successfully" })
})

  const changePassword = catchAsyncError(async (req,res,next)=>{
    let {id}= req.params
    req.body.changePasswordAt= Date.now()
    let results = await userModel.findByIdAndUpdate(id,req.body,{new:true})
    !results && next( new AppError(  "not found ", 404)) 
    results && res.status(200).json({message :"done",results})
    
    })





  export{createUser,changePassword}