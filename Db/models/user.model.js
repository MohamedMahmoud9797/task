import mongoose from "mongoose";
import bcrypt from'bcrypt'

const userSchema = mongoose.Schema({
    first_name : {
        type: String,
        trim : true,
        required : [true, "user name is required"],
        minLenght : [1, "too short user name"]
    },
    last_name : {
        type: String,
        trim : true,
        required : [true, "user name is required"],
        minLenght : [1, "too short user name"]
    },
    email :{
        type: String,
        lowercase : true,
        required : [true, "user email is required"],
        unique :[true, "email must be unique "] ,
        minLenght : [1, "too short user email"],
    },
    password :{
        type: String,
        required : [true, "user password is required"],
        minLenght : [6, "too short user password"],
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    role : {
         type: String,
         enum:["user","admin"],
         default :"user"
     },
    changePasswordAt: Date
}, {timeStamps : true})

userSchema.pre("save",function () {
    this.password = bcrypt.hashSync(this.password,7)
})

userSchema.pre("findOneAndUpdate",function () {
    if( this._update.password)this._update.password = bcrypt.hashSync(this._update.password,7)
})
export const userModel = mongoose.model("User", userSchema)
