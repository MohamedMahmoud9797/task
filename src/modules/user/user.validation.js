import joi from "joi"


export const signUpSchema = 
     joi.object({
        first_name: joi.string().required(),
        last_name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        Cpass: joi.string().valid(joi.ref('password')).required(),
        age: joi.number().min(18).max(40)
    })


export const signInSchema =
     joi.object({
        email: joi.string().email().required(),
        password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
})