import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useContext, useState,useEffect } from "react";
import { AlertContext } from "../Context/alertContext";
import { IdContext } from "../Context/idContext";
import axios from "axios";

export default function Todo({title,description,date,onEdit,id,status}){
    const {setAlertDisplay,setActionType,setMessage} = useContext(AlertContext);
    const {setData} = useContext(IdContext);
    const [isDone,setIsDone] = useState(status?status:false);
    const [isOverdue,setIsOverdue] = useState()

    async function handleStatus(id){
        const token = localStorage.getItem("token");
        if(isDone){
            await axios.put(`http://localhost:5000/api/update_status/${id}`,{
                status : false
            },{
            headers: {
                Authorization : `Bearer ${token}`,
                 "Content-Type": "application/json",
            }
        })
        setIsDone(false);
        }
        else{
             await axios.put(`http://localhost:5000/api/update_status/${id}`,{
                status : true
            },{
            headers: {
                Authorization : `Bearer ${token}`,
                 "Content-Type": "application/json",
            }
        })
        setIsDone(true);
        }
    }

     useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        if(date < today){
            setIsOverdue(true);
        }
        else{
            setIsOverdue(false);
        }
    }, [date]);
    return(
        <div className={`${isOverdue ? "bg-red-700 text-[#D9D9D9]":isDone?"bg-[#008000] text-[#D9D9D9]":"bg-[#D9D9D9]"} mt-4 max-w-5xl p-3 rounded-md mx-4 mb-2 space-y-2 lg:mx-auto ${isDone || isOverdue?null:"hover:bg-[#c8c8c8]" } lg:p-4 group`} id={id}>
            <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                <p className="font-medium">{title}</p>
                <button className="text-xs rounded-md bg-[#3C3C3C] text-[#D9D9D9] p-1 cursor-pointer font-medium hover:shadow-md shadow-gray-400 text-gray lg:hidden group-hover:block" onClick={()=>handleStatus(id)}>Mark as {isDone?"Undone":"Done"}</button>
                </div>
                <MdEdit className="text-lg cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out lg:hidden group-hover:block" onClick={()=>onEdit({title,description,date,id})}/>
            </div>
            <div>
                <p className="text-sm max-h-18 overflow-y-auto">{description}</p>
            </div>

            <div className="flex items-center justify-between lg:justify-end mt-2 lg:mt-4 group-hover:justify-between">
                <AiFillDelete className="text-lg cursor-pointer hover:text-red-700 lg:hidden group-hover:block" onClick={()=>{
                    setMessage("Do you want to delete")
                    setAlertDisplay(true);
                    setData({id});
                    setActionType("delete");
                }}/>
                <p className="text-xs">Due : {date}</p>
            </div>

        </div>
    )
}