import { useState } from "react";
import { TbEyeClosed } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
export default function InputBox({defaultValue,placeholder,maxLength,eye,...props}){
    const [showPassword,setShowPassword] = useState(false);

    function passwordVisibility(){
        setShowPassword((curr)=>!curr);
    }
    return(
        <div className="w-72 relative">
            <input type={eye?(showPassword?"text":"password"):"text"} className="bg-[#F7F7F7] w-full h-8 rounded-lg px-2 mt-1" {...props} maxLength={maxLength}
            placeholder={placeholder} defaultValue={defaultValue}/>

            {eye?(showPassword?<FaEye className="absolute top-3 right-2 cursor-pointer" onClick={passwordVisibility}/>:<TbEyeClosed className="absolute top-3 right-2 cursor-pointer" onClick={passwordVisibility}/>):null}

        </div>
            
    )
}