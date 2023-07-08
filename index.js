import express  from 'express'
import { dbConnection } from './Db/connection.js'
import { userRouter } from './src/modules/user/user.routes.js'
import { AppError } from './utlits/app.error.js'
import globalError from './utlits/middlware/globalErrorHandler.js'
import authRouter from './auth/auth.routes.js';
import { taskRouter } from './src/modules/task/task.routes.js';
import cors from "cors"
const app = express()
app.use(express.json())

const port = 3000
app.use(cors())

dbConnection()
app.use("/api/v1/user",userRouter)
app.use("", authRouter)
app.use("/api/v1/task", taskRouter)
app.all("*",(req,res,next)=>next(new AppError( `not found url ${req.originalUrl}` ,400 ))
)
app.listen( process.env.PORT||port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.use(globalError)
