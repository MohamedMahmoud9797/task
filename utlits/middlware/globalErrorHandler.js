const globalError = (err,req,res,next )=>{
    const statusCode = err.statusCode ||500
    res.status(statusCode).json({message : "error", err: err.message})
}


export default globalError