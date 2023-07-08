
export const validation = (schema)=>{
    return (req,res,next)=>{
        let reqType= {...req.body, ...req.params,... req.query}
        let {error}= schema.validate(reqType, {abortEarly :false})
        if (error) {
            let err= error.details.map((detail)=>detail.message)
            res.json({error: err})
            } else {
    next()
            }
}
}