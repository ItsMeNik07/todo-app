import { FaCirclePlus } from "react-icons/fa6";

export default function AddButton(props){
    function handleClick(){
        props.onClick(true);
    }
    return(
        <div className="">
            <FaCirclePlus className="h-10 w-10 text-yellow-600 cursor-pointer lg:h-12 lg:w-12 hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out" onClick={handleClick}/>

        </div>
    )
}