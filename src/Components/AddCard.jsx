import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import InputBox from "./InputBox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "../zod/todoSchema";
import axios from "axios";
export default function AddCard(props){
    const [today,setToday] = useState("");
    const [title, setTitle] = useState(props.editData ? props.editData.title : "");
    const [description, setDescription] = useState(props.editData ? props.editData.description : "");
    const [date, setDate] = useState(props.editData ? props.editData.date : "");

    useEffect(()=>{
        const t = new Date();
        setToday(t.toISOString().split('T')[0]);
    },[])
    useEffect(() => {
    if (props.editData) {
      setTitle(props.editData.title);
      setDescription(props.editData.description);
      setDate(props.editData.date);
    }

  }, [props.editData]);

    const {
        register,
        handleSubmit,
        formState :{errors}
    } = useForm({
        resolver : zodResolver(todoSchema)
    })

    async function addTodo(data){
        const token = localStorage.getItem("token");
        if(props.editData){
          const res =  await axios.put(`https://todo-app-backedn.onrender.com/api/update/${props.editData.id}`,data,{
            headers: {
                Authorization : `Bearer ${token}`,
                 "Content-Type": "application/json",
            }
        })
        const todos = res.data.todos.reverse();
        props.setTodo(todos);
    }
        else {
        try{
            const res = await axios.post("https://todo-app-backedn.onrender.com/api/user/todo",data,{
            headers: {
                Authorization : `Bearer ${token}`,
                 "Content-Type": "application/json",
            }
        }
        )
        props.setTodo([res.data.todo,...props.todo]);
        }catch(err){
            console.log(err);
        }
    }
   }
        return(
        <div className="bg-[#D9D9D9] w-fit px-4 rounded-[20px] space-y-4 py-7 lg:text-xl lg:space-y-8 lg:px-8 lg:shadow-xl lg:shadow-gray-600/50 relative">
            <IoCloseCircle className="cursor-pointer absolute -top-1 -left-1 text-red-600 text-2xl h-6 w-6 lg:h-8 lg:w-8 translate-1.5 lg:translate-1 hover:text-red-700" onClick={()=>{
                props.onClick(false);
                if(props.editData){
                    props.setEditData(null);
                }
            }}/>

            <form className="space-y-2 mt-2">
                <div className="title space-y-1">
                <label htmlFor="">Title</label>
                <InputBox {...register("title")} maxLength={15} placeholder={"Enter Title"} defaultValue = {title}/>
                {errors.title && <p className="text-sm text-red-700">{errors.title.message}</p>}
                 </div>

            <div className="description space-y-1">
                <label htmlFor="" className="block">Description</label>
                <textarea placeholder="Enter Description" className="bg-[#F7F7F7] w-72 h-24 rounded-lg px-2 py-1 text-sm resize-none lg:w-full" maxLength={50} {...register("description")} defaultValue={description}/>
                {errors.description && <p className="text-sm text-red-700">{errors.description.message}</p>}
            </div>

            <div className="flex justify-between items-center lg:space-x-3">
                <label htmlFor="">End Date</label>
                <div>
                <input type="date" min={today} className="bg-[#F7F7F7] px-3 rounded-lg py-1 lg:textx-md" {...register("date")} defaultValue={date}/>
                {errors.date && <p className="text-sm text-red-700">{errors.date.message}</p>}
                </div>
            </div>
            <div className="flex items-center justify-center mt-6">
            <button className="bg-[#3C3C3C] w-20 h-8 rounded-md cursor-pointer text-[#D9D9D9] hover:bg-[#454545]" onClick={handleSubmit(addTodo)}>Add</button>
            </div>
            </form>
           
        </div>
    )
}
