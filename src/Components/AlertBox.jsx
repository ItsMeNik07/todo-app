import { useContext, useState } from "react"
import { AlertContext } from "../Context/alertContext"
import { IdContext } from "../Context/idContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AlertBox({message,actionType,setTodo}){
    const {setAlertDisplay} = useContext(AlertContext);
    const {data} = useContext(IdContext);
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();

    const functions = {
        delete : async() => {
            setIsLoading(true); 
            const token = localStorage.getItem("token");
            const res1 = await axios.delete(`https://todo-app-backedn.onrender.com/api/delete/${data.id}`,{
                headers : {
                    Authorization : `Bearer ${token}`,
                    "Content-Type" : "application/json",
                }
            })

                const res2 = await axios.get("https://todo-app-backedn.onrender.com/api/todo",{
                headers : {
                    Authorization : `Bearer ${token}`,
                    "Content-Type" : "application/json",
                }
            });
            setTodo(res2.data.todos);
            setAlertDisplay(false);
            setIsLoading(false);
        },
        logout : ()=>{
            localStorage.removeItem("token");
            setAlertDisplay(false);
            navigate("/");
        }
    }

    const performAction = () => {
        const fn = functions[actionType];
        if(fn){
            fn();
        }
        else{
            console.log("invalid action");
        }
    }
    return(
             isLoading ?<div>
                    <h6 className="text-[#D9D9D9] font-medium">Deleting todo...</h6>
                </div> : <div className="bg-[#D9D9D9] px-10 py-6 rounded-2xl mx-6 md:px-10 space-y-4 font-medium"><h6>{message}</h6>
                <div className="text-[#D9D9D9] text-sm flex justify-between">
                    <button className="bg-[#3C3C3C] px-4 py-1 rounded-md cursor-pointer hover:bg-[#454545]" onClick={performAction}>Yes</button>
                    <button className="bg-[#3C3C3C] px-4 py-1 rounded-md cursor-pointer hover:bg-[#454545]" onClick={()=>setAlertDisplay(false)}>No</button>
                </div>
            </div>
            
    )
}
