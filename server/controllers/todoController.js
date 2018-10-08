var express = require('express');
var router = express.Router();
var cors = require('cors')
const axios = require('axios')
const jwt = require('jsonwebtoken')


const TodoModel= require('../models/todoModel');
const UserModel= require('../models/userModel');
class TodoController{

    static addTask(req,res){
        //console.log(req.body.title)
        //console.log(req.body.date)
        UserModel.findOne({email:req.body.decoded.email})
        .then(result=>{
            console.log(result.id)
            TodoModel.create({ //jika tidak ada maka login berdasarkan oauth,password empty
                title: req.body.title, 
                task: req.body.task,
                date: req.body.date,
                iduser: result.id,
                completed: req.body.status=='true' ? true:false  
            })
            .then(result=>{
                 res.status(200).json({data:result}) 
            })      
            .catch(err=>{
                res.status(500).json({message:err.message})
            })           
        })
        
    }

    static showTask(req,res){
        
        UserModel.findOne({email:req.body.decoded.email})
         .then(result=>{        
             TodoModel.find({iduser:result.id})
             .then(result=>{
                res.status(200).json({data:result}) 
             })   
         })
         .catch(err=>{
             res.status(500).json({ message: err.message})
         })
        
        
    }
    static showTaskbyid(req,res){
        console.log(req.params.id)
        
        TodoModel.findById(req.params.id)
        .then(result=>{
            console.log(result)
                res.status(200).json({data:result}) 
        }) 
        .catch(err=>{
            res.status(500).json({ message: err.message})
        })  
            
    }
    static deleteTaskbyid(req,res){
        console.log(req.params.id)
        
        TodoModel.findByIdAndRemove(req.params.id)
        .then(result=>{
            console.log(result)
                res.status(200).json({data:result}) 
        }) 
        .catch(err=>{
            res.status(500).json({ message: err.message})
        })  
            
    }
    static updateTaskbyid(req,res){
        if(req.body.completed){
        
            TodoModel.findOneAndUpdate(req.params.id,{completed:true})
            .then(result=>{
                console.log(result)
                    res.status(200).json({data:result}) 
            }) 
            .catch(err=>{
                res.status(500).json({ message: err.message})
            })  
         }
         else
         {
            
            let obj={};
            Object.assign(obj, 
                req.body.title ? { title: req.body.title } : null,
                req.body.task ? { task: req.body.task } : null,
                req.body.date ? { date: req.body.date } : null
                )
                var temp=req.body.date.split("/");
                //req.body.date=`${temp[2]}/${temp[0]}/${temp[1]}`
                //console.log(`${temp[2]}/${(parseInt(temp[1]))}/${temp[0]}`)
                //console.log('date:' + new Date(Date.UTC(temp[2],parseInt(temp[1])-1)),temp[0])
                //console.log(req.params.id)
                TodoModel.findOneAndUpdate({ _id: req.params.id },{
                    title: req.body.title,
                    task: req.body.task,
                    date: new Date(Date.UTC(temp[2],parseInt(temp[1])-1,temp[0]))

                })
                .then(result=>{
                        res.status(200).json({data:result}) 
                }) 
                .catch(err=>{
                    res.status(500).json({ message: err.message})
                }) 
            
             
         }
            
    }
    
  
}

module.exports=TodoController;