import InputBox from "../Components/InputBox";
import { useForm } from 'react-hook-form';
import { schema } from '../zod/userSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Signup(){
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors,isSubmitting },
  } = useForm({
    resolver: zodResolver(schema)
  });

  async function submitHandler(data){
    setError("");
    try{
      const res = await axios.post("https://todo-app-backedn.onrender.com/api/register/user",data)
      navigate("/login");
    }catch(err){
      if(err.response.data.data === 11000){
          setError("email",{
            type:"manual",
            message : err.response.data.message
          })
      }
    }
    
  }

  const firstErrorField = Object.keys(errors)[0];
    return(
        <div className="flex justify-center items-center h-screen">
            <div className="bg-[#D9D9D9] p-6 rounded-2xl mx-6 md:px-10">
                <h2 className="text-center text-xl mb-12 font-semibold lg:text-2xl">Signup to <span className="tracking-tighter">QuickList</span></h2>
                <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
                    <div className="flex flex-col">
                        <label> First Name </label>
                        <InputBox {...register('firstName',{required:true})}
                        maxLength={12}/>
                        {firstErrorField === "firstName"  && <p className="text-sm text-red-700">{errors.firstName.message}</p>}
                    </div>

                     <div>
                        <label> Last Name </label>
                        <InputBox {...register('lastName')}
                        maxLength={12}/>
                        {firstErrorField === "lastName" && <p className="text-sm text-red-700">{errors.lastName.message}</p>}
                    </div>

                     <div>
                        <label> Email </label>
                        <InputBox {...register('email')}
                        maxLength={40}/>
                        {(firstErrorField === "email" || errors.email) && <p className="text-sm text-red-700">{errors.email.message}</p>}
                    </div>

                     <div>
                        <label> Password </label>
                        <InputBox {...register('password')}
                        maxLength={12}
                        eye/>
                        {firstErrorField === "password" && <p className="text-sm text-red-700">{errors.password.message}</p>}
                    </div>

                     <div>
                        <label> Confirm Password </label>
                        <InputBox {...register('confirmPassword')}
                        maxLength={12}
                        eye
                        />
                        {firstErrorField === "confirmPassword" && <p className="text-sm text-red-700">{errors.confirmPassword.message}</p>}
                    </div>

                    <button className="bg-[#3C3C3C] w-20 h-8 rounded-md cursor-pointer text-[#D9D9D9] hover:bg-[#454545]" disabled={isSubmitting}>{isSubmitting?"Submitting":"Submit"}</button>
                </form>
            </div>
        </div>
    )   
}
