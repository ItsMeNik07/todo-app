import { useState } from "react";
import { AlertContext } from "./alertContext";

export default function AlertProvider({children}){
    const [alertDisplay,setAlertDisplay] = useState(false);
    const [actionType,setActionType] = useState();
    const [message,setMessage] = useState("");
    return(
        <AlertContext.Provider value = {{alertDisplay,setAlertDisplay,actionType,setActionType,message,setMessage}} >
            {children}
        </AlertContext.Provider>
    )
}