import { AppError } from './../../../utlits/app.error.js';
import catchAsyncError from './../../../utlits/middlware/catchAsyncErorr.js';
import { deleteOne } from './../../../utlits/handelrs/refactor.js';
import apiFeatuers from '../../../services/api.featuer.js';
import { taskModel } from './../../../Db/models/task.model.js';




const createTask = catchAsyncError(async (req,res,next)=>{
    let Task = new taskModel(req.body)
    await Task.save();
    res.status(201).json({message :"added",Task})
}
)


const getAllTask = catchAsyncError(async (req,res,next)=>{

    let apiFeatuer=  new apiFeatuers(taskModel.find(),req.query)
    let results = await apiFeatuer. mongooseQuery
        res.json({message :"done",page: apiFeatuer.page,results})
    })

     
     

const getTaskById = catchAsyncError(async (req,res,next)=>{
    let {id}= req.params
    let results = await taskModel.findById(id)
    res.status(200).json({message :"done",results})
    })

    
const updateTask = catchAsyncError(async (req,res,next)=>{
    let {id}= req.params
    let {title}=req.body;
    let results = await taskModel.findByIdAndUpdate(id, {title},{new:true})

    !results && next( new AppError(  "not found ", 404)) 
    results && res.status(200).json({message :"done",results})
     
    })


const deleteTask = deleteOne(taskModel)


        export{ createTask, getAllTask,getTaskById , updateTask, deleteTask}