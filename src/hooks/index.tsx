import React from "react"
import {LangProvider} from "./LangContext"

const AppProvider:React.FC = ({children})=>{
    return(
        <LangProvider>
                {children}
        </LangProvider>
    )
}
export default AppProvider