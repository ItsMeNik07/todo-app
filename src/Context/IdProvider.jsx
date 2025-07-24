import { useState } from "react";
import { IdContext } from "./idContext";

export default function IdProvider({ children }){
    const [data,setData] = useState(null);
    return(
        <IdContext.Provider value = {{data,setData}}>
            {children}
        </IdContext.Provider>
    )
}