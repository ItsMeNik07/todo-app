import { useContext, useEffect, useState } from "react";
import AddButton from "../Components/AddButton";
import AddCard from "../Components/AddCard";
import Navbar from "../Components/Navbar";
import TodoImagebw from "../assets/TodoImagebw.png"
import Todo from "../Components/Todo";
import axios from "axios";
import AlertBox from "../Components/AlertBox";
import { AlertContext } from "../Context/alertContext";
import { useNavigate } from "react-router-dom";
export default function TodoPage(){
    const [display,setDisplay] = useState(false);
    const [editData,setEditData] = useState(null);
    const [todo,setTodo] = useState([]);
    const {alertDisplay,actionType,message} = useContext(AlertContext);
    const navigate = useNavigate();
    useEffect(()=>{
        async function getTodo(){
            const token = localStorage.getItem("token");
            try{
                const res = await axios.get("http://localhost:5000/api/todo",{
                headers : {
                    Authorization : `Bearer ${token}`,
                    "Content-Type" : "application/json",
                }
            });
            setTodo(res.data.todos.reverse());
            }catch(err){
                navigate("/");
                console.log(err);
            }
            
        }
        getTodo();
    },[])
    return(
        <div>
             <Navbar />
             {/* image will display when there is no todo */}
            {todo.length === 0?<div className="flex items-center justify-center h-[90vh]">
                <img src={TodoImagebw} alt="" className="object-cover" />
            </div> : <div>{todo.map((todo)=>(
                    <Todo 
                    key = {todo._id}
                    id = {todo._id}
                    title = {todo.title}
                    description = {todo.description}
                    date = {todo.date} 
                    status = {todo.done}
                    onEdit = {(data)=>{
                        setEditData(data);
                        setDisplay(true);
                    }}/>
            ))}
            </div>}

             {alertDisplay &&
             <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center z-60"> 
             <AlertBox message={message} actionType={actionType} setTodo = {setTodo}/>
             </div>}
             {display && (
                <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center z-50">
                 <AddCard onClick={setDisplay} setTodo = {setTodo} todo={todo} editData = {editData} setEditData = {setEditData}/>
                </div>
                )}
            <div className="fixed right-[45%] bottom-7 md:right-18 z-55">
            <AddButton onClick = {setDisplay}/>
            </div>
        </div>
    )
}