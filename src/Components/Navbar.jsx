import { useContext } from "react"
import { AlertContext } from "../Context/alertContext"

export default function Navbar(){
    const {setMessage,setAlertDisplay,setActionType} = useContext(AlertContext);
    function logoutUser(){
        setMessage("Do you want to logout");
        setAlertDisplay(true);
        setActionType("logout");
    }
    return(
        <nav className="h-12 bg-[#D9D9D9] content-center">
            <div className="flex justify-between max-w-5xl mx-auto px-4 text-md md:text-lg items-center">
                <h2 className="font-bold tracking-tighter">QuickList</h2>
                 <button className="text-sm rounded-md bg-[#3C3C3C] text-[#D9D9D9] py-1 px-2 cursor-pointer font-medium hover:shadow-md shadow-gray-400 text-gray" onClick={logoutUser}>Logout</button>
            </div>

        </nav>
    )
}