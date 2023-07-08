import Joi from "joi";


 export const createSchema = Joi.object({
    name : Joi.string().min(2).max(30).required(),
    title: Joi.string().required().max(20),
        description: Joi.string().required()
})


 export const getByIdSchema = Joi.object({
    id : Joi.string().hex().length(24).required()
})



