import styles from "./news.styles.module.scss"
import Head from "next/head"
import { GetServerSideProps } from "next"
import Link from "next/link"
import SearchInput from "../../components/SearchInput"
import { api } from "../../services/api"
import {FormHandles} from "@unform/core"
import {Form} from "@unform/web"
import { useCallback, useEffect, useRef, useState } from "react"
import { useLang } from "../../hooks/LangContext"

interface INews{
    link: string
    title:string
    source:string
    timeStamp:string
    description:string
    imgSrc:string
}




export default  function News(){

    const [query,SetQuery] =  useState("news")
    const formRef = useRef<FormHandles>(null)
    const [articles,setArticles] = useState<INews[]>()
    const {setLanguage, lang} = useLang()

    const HandleSearch = useCallback((data)=>{
        const Newquery = data.query
        SetQuery(Newquery)
    },[])

    

    useEffect(()=>{

        api.post("/yahoonews",{query,lang})
        .then((res)=>{

            let art = res.data.news
            
            art = art.filter((article:INews)=>(
                !!article.title && !!article.link  
            ))

            setArticles(art)  
            
        })

        .catch((e)=>{
            alert(e)
            setArticles([])

        })
    
    /* eslint-disable react-hooks/exhaustive-deps */
    },[query])

        return (
            <>
                

                <main className={styles.container} > 
                    <Form ref={formRef} onSubmit={HandleSearch} >
                        <SearchInput  placeholder="Search any news"  name="query" >

                        </SearchInput>
                    </Form>
                    
                    <div className={styles.posts} >

                        {
                            articles?.length > 0 ?
                            articles?.map(post=>(
                                <Link key={post.link + `${Date.now()}`} href={`/news/${post.link}`}>
                                    <a >
                                        <time>{post.timeStamp}</time>
                                        <strong>{post.title}</strong>
                                        <p>{post.description}</p>
                                    </a>
                                </Link>
                            )) 
                            
                            :
                            
                            <h1 className={styles.loadingMessage} > Loading ... </h1>
                        }

                    </div>
                </main>
            </>
        )
   
        
}

export const getServerSideProps: GetServerSideProps = async ()=>{

    return {
        props:{}
    }

    
}