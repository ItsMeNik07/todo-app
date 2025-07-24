import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { TodoModel, UserModel } from "./db/schema.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
// env variables
const DB = process.env.DB_URL;
const PORT = process.env.PORT || 4000;

async function startServer(){
    try{
        await mongoose.connect(DB);
        console.log("Connection estbalished");
    }
    catch(err){
        console.log("Failed to start server",err);
    }
}
const app = express();

// JWT secret
const JWT_SECRET = process.env.MY_JWT_SECRET;

app.use(express.json())
app.use(cors());

// middleware
function middleware(req,res,next){
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
      if(!token){
        res.status(400).json({
            message : "Token not provided"
        })
    }
    try{
        const decodedUser = jwt.verify(token,JWT_SECRET);
        req.user = decodedUser;
        next();   
    }
    catch(err){
        res.status(400).json({
            message : "Invalid token"
        })
    }
    

}

// signup endpoint
app.post("/api/register/user",async function(req,res){
    try{
        
        const {firstName,lastName,email,password} = req.body;
        // hashing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);

        await UserModel.create({
            firstName,
            lastName,
            email,
            password : hashedPassword
        })

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
        });
    }catch(err){
        // duplicate email error
        if(err.code === 11000){
            return res.status(400).json({
                data : 11000 ,
                message : "Email already exists"
            })
        }

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
        });
    }

})

// login endpoint
app.post("/api/login/user",async function (req,res){
    const {email,password} = req.body;

    // finding userby email
    const user = await UserModel.findOne({email});
    if(!user){
        return res.status(400).json({
            data : 2001,
            field : "email",
            message : "User does not exists"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password);

    if(!isPasswordCorrect){
        return res.status(400).json({
            data : 3001,
            field: "password",
            message:"Incorrect password"
        })
    }

    const token = jwt.sign({userId:user._id},JWT_SECRET);
    return res.json({
        token,
        message : "Logged in successfully"
    })

})

// create todo endpoint
app.post("/api/user/todo",middleware,async function(req,res){
    const userId = req.user.userId;
    const {title,description,date} = req.body;

    // putting it in db
    try{
     const newTodo =  await TodoModel.create({
            userId,
            title,
            description,
            date,
            done : false
        })

        res.json({
            todo : newTodo,
            message : "Todo Added Successfully"
        })
    }
    catch(err){
        res.status(400).json({
            message : "Failed to add Todo"
        })
    }
})

// get todo
app.get("/api/todo",middleware,async function (req,res) {
    const userId = req.user.userId;
    try{
    const todo = await TodoModel.find({userId});
    // fetch all todo
    return res.json({
        todos : todo,
        message : "Todos fetched"
    })
    }catch(err){
        res.status(400).json({
            message : "Error fetching todo"
        })
    }
   

})

// update todo
app.put("/api/update/:id",middleware,async function(req,res){
    const id = req.params.id;
    const userId = req.user.userId;
    const {title,description,date} = req.body;
    
    // update db with the id
    try{
         await TodoModel.updateOne({
        _id : id
    },{
        $set : {
            title,
            description,
            date
        }
    })
    const todos = await TodoModel.find({userId});
    res.json({
        todos,
        message : "Database updated"
    })
    }catch(err){
        res.status(400).json({
            message : "Error updating data"
        })
    }

})

// update done status
app.put("/api/update_status/:id",middleware,async function (req,res) {
    const id = req.params.id;
    const {status} = req.body;

    await TodoModel.updateOne({_id : id},{
        $set : {
            done : status
        }
    });
    res.json({
        message : "Todo updated"
    })
})

// delete todo
app.delete("/api/delete/:id",middleware,async function (req,res) {
    const todoId = req.params.id;
    try{
        await TodoModel.deleteOne({_id:todoId});
        res.json({
            message : "Todo deleted"
        })
    }catch(err){
        res.status(400).json({
            message : "error deleting todo"
        })
    }
    
})

// server starting
app.listen(PORT,()=>{
    startServer();
    console.log(`Listening on port ${PORT}`)
})