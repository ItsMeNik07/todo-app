import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// userSchema
const users = {
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        required : true,
        type : String,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
}

// todoSchema
const todos = {
    userId : {
        type : ObjectId,
        required : true
    },
    title : {
        required : true,
        type : String,
    },
    description : {
        required : true,
        type : String,
    }, 
    date : {
        required : true,
        type : String
    },
    done : {
        type : Boolean
    }
}
// userModel
const UserModel = mongoose.model("users",users);
const TodoModel = mongoose.model("todos",todos);

export {UserModel,TodoModel};