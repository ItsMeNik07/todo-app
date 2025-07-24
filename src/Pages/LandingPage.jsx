import Button from "../Components/Button";
import Book from "../assets/Book.png"
import { Link,useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export default function LandingPage(){
     const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);

          // Token valid, redirect to todo
          navigate("/todo");
      }catch(err){
        console.log(err);
      }
    }
  }, []);
    return(
        <section className="bg-[#3C3C3C] w-full min-h-screen flex items-center justify-center overflow-hidden md:p-12">
            <div className="md:grid md:grid-cols-2 md:bg-[#D9D9D9] md:h-[468px] max-w-5xl rounded-3xl p-4 md:gap-4 lg:gap-6 lg:shadow-xl lg:shadow-gray-500/50">
            <div className="hidden md:block h-full w-full">
            <img src={Book} alt="Book" className="object-cover w-full rounded-3xl h-[435px]"/>

            </div>
            <div className="right-container text-[#D9D9D9] md:text-black text-center p-4 md:flex flex-col justify-around ">
                <h2 className="text-[40px] font-semibold tracking-tighter mb-12 lg:text-5xl">QuickList</h2>
                <div className="text-[20px] lg:text-2xl">
                <p className="">Welcome to QuickList</p>
                <div className="leading-9">
                <p className="">Please login or create new account to continue.</p>
                </div>
                </div>
                <div className="flex flex-col text-black items-center mt-12">
                <Link to = "login"><Button 
                text = "Login"
                className="bg-[#D9D9D9] w-[292px] py-2 rounded-3xl mb-6 text-lg md:bg-[#3C3C3C] md:text-[#B0B0B0] cursor-pointer lg:hover:shadow-lg lg:hover:shadow-gray-500/50 lg:hover:font-medium"
                /></Link>

                <Link to="signup"> <Button 
                text = "Create New Account"
                className="bg-[#D9D9D9] w-[292px] py-2 rounded-3xl text-lg md:bg-[#3C3C3C] md:text-[rgb(176,176,176)] cursor-pointer lg:hover:shadow-lg lg:hover:shadow-gray-500/50 lg:hover:font-medium"
                /></Link>
                </div>
            </div>
            </div>

        </section>
    )
}