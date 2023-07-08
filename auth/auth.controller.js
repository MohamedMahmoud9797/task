import jwt from "jsonwebtoken"
import  bycrpt  from 'bcrypt';
import { AppError } from "../utlits/app.error.js";
import catchAsyncError from './../utlits/middlware/catchAsyncErorr.js';
import { userModel } from './../Db/models/user.model.js';


export const signUp =  catchAsyncError(async (req,res,next)=>{
let founded = await userModel.findOne({email:req.body.email})
if (founded)return next(new AppError("email is already regestierd",409))
let user = new  userModel(req.body)
await user.save()
res.json({message : "added",user})
})


export const signIn = catchAsyncError(async(req,res,next)=>{
    let {email,password} =req.body 
    let founded = await userModel.findOne({email})
    let match = bycrpt.compareSync(password, founded.password)
    if (founded && match) {
        let token = jwt.sign({name : founded.name, userId : founded._id, role: founded.role},"node")
      return  res.json({message: "succes", token})
    }
    next(new AppError("email or password is incorrect", 409))
    })


    export const signOut =  catchAsyncError(async(req, res,next) => {
      let {id} = req.params
      const founded = await userModel.findByIdAndUpdate(id, { isLoggedIn: false })
      let user = await userModel.findOne(founded).select("-password")
      res.json({ message: "Log Out successfully" ,user})
  }
    )

export const protectedRoutes = catchAsyncError(async (req,res,next)=>{
    let {token} = req.headers
    if (!token)  return next (new AppError("please provide token",401))
    let decoded =   jwt.verify(token,"node")
    let user = await userModel.findById(decoded.userId)
    if (!user) return next(new AppError("invalid user",401))

    if (user.changePasswordAt) {
    let changePasswordTime = parseInt(user.changePasswordAt.getTime()/1000)
    if (changePasswordTime > decoded.iat) return next (new AppError("token is invalid",401))  
}
    req.user=user
    next()
})


export const allowTo = (...roles)=>{
return catchAsyncError((req,res,next)=>{
  if(!roles.includes(req.user.role))  return next (new AppError(`YOU are not authorized + ${req.user.role} ` ,401))
  next()
})
}

