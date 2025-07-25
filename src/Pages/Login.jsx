import { useForm } from "react-hook-form";
import InputBox from "../Components/InputBox";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../zod/loginSchema";
import { useNavigate } from "react-router-dom";
export default function Login(){
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState : {errors,isSubmitting}
    } = useForm({
        resolver:zodResolver(loginSchema)
    });

    async function loginHandler(data){
            try{
            const res = await axios.post("https://todo-app-backedn.onrender.com/api/login/user",data);
            localStorage.setItem("token",res.data.token);
            navigate("/todo")

            }catch(err){
                if(err.response.data.data === 2001 || err.response.data.data === 3001 ){
                    setError(err.response.data.field,{
                        type : "manual",
                        message : err.response.data.message
                    })
                }
                console.log(err);
            }
    }
    return(
         <div className="flex justify-center items-center h-screen">
            <div className="bg-[#D9D9D9] p-6 rounded-2xl mx-6 md:px-10">

                <div>
                    <h2 className="text-center text-xl mb-12 font-semibold lg:text-2xl">Login to <span className="tracking-tighter">QuickList</span></h2>
                </div>
                <form className="space-y-4" >

                    {/* mail */}
                    <div>
                         <label> Email </label>
                            <InputBox {...register('email')}
                            maxLength={40}/>
                            {errors.email && <p className="text-sm text-red-700">{errors.email.message}</p>}
                    </div>

                    {/* password */}
                        <div>
                            <label> Password </label>
                            <InputBox {...register('password')}
                            maxLength={12}
                            eye/>
                            {errors.password && <p className="text-sm text-red-700">{errors.password.message}</p> }
                        </div>

                        {/* login button */}
                        <button className="bg-[#3C3C3C] w-full h-8 rounded-md cursor-pointer text-[#D9D9D9] hover:bg-[#454545] mt-6" onClick={handleSubmit(loginHandler)} disabled={isSubmitting}>{isSubmitting ? "Logging":"Login"}</button>
                </form>
            </div>
        </div>
    )
}
