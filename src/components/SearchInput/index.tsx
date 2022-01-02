import { useField } from "@unform/core";
import React,{InputHTMLAttributes,useEffect,useRef} from "react";
import { api } from "../../services/api";
import styles from "./styles.module.scss";


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name:string
}

const SearchInput:React.FC<InputProps>= ({name,...rest})=>{

    const inputRef = useRef<HTMLInputElement>(null);

    const {fieldName,registerField} = useField(name);

    useEffect(()=>{
        registerField({
            name:fieldName,
            ref:inputRef.current,
            path:"value"
        })
    },[fieldName,registerField])

    async function handleInput(){
        
        const query = inputRef?.current.value;

        if(query === "" || !query){
            return;
        }

        const res = await api.post("/yahoonews",{
            query:query,
            lang:"en-US"
        },{
            headers:{
                "Content-Type":"Authorization"
            }
        })

        console.log(res);
        
    }

    return (
        <div className={styles.container} >
            <input 
            type="text"  
            ref={inputRef}
            {...rest}
            />
            <div className={styles.containerButton}>
                
                <button onClick={(e)=>{
                    handleInput()
                }} type="submit">Search</button>
            </div>
        </div>
        
    )
}

export default SearchInput