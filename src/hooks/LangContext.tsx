import React,{createContext, useCallback,useState,useContext} from "react"

interface ILnguageContext{
    setLanguage:(lang:string) => void
    lang:string
}

const LnguageContext = createContext<ILnguageContext>({} as ILnguageContext)

export const LangProvider:React.FC = ({children})=>{

    const [language,setLanguage] = useState<string>(()=>{
        if (typeof window !== "undefined") {

            const language = window.localStorage.getItem("@MyNews:language")
        
            if (language){
                return language
            }else{
                return "en-US"
            }
            
        }
        
    })

    const setlanguage = useCallback((lang:string)=>{
        if (typeof window !== "undefined") {
            if(window.localStorage.getItem("@MyNews:language"))
                window.localStorage.removeItem("@MyNews:language")

            window.localStorage.setItem("@MyNews:language",lang)
            setLanguage(lang)
        }
    },[])

    return(
        <LnguageContext.Provider value={{lang:language,setLanguage:setlanguage}} >
            {children}
        </LnguageContext.Provider>
    )
}

export const useLang = ():ILnguageContext=>{
    const context = useContext(LnguageContext)
    if(!context){
        throw new Error("useLang must be used within an Lang provider")
    }else{
        return context
    }

}
