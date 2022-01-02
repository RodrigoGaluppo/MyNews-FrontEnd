import styles from "./news.styles.module.scss"
import Head from "next/head"
import { GetStaticProps } from "next"
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

interface newsProps{
    news:INews[]
}


export default  function News({news}:newsProps){

    const [query,SetQuery] =  useState("news")
    const formRef = useRef<FormHandles>(null)
    const [articles,setArticles] = useState<INews[]>(news)
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
            setArticles(news)

        })
    
    /* eslint-disable react-hooks/exhaustive-deps */
    },[query])


    if(articles?.length > 0)
        return (
            <>
                <Head>
                    <title>News | Ignews</title>
                </Head>

                <main className={styles.container} > 
                    <Form ref={formRef} onSubmit={HandleSearch} >
                        <SearchInput  placeholder="Search any news"  name="query" >

                        </SearchInput>
                    </Form>
                    <div className={styles.posts} >

                        {
                            articles.map(post=>(
                                <Link key={post.link + `${Date.now()}`} href={`/news/${post.link}`}>
                                    <a >
                                        <time>{post.timeStamp}</time>
                                        <strong>{post.title}</strong>
                                        <p>{post.description}</p>
                                    </a>
                                </Link>
                            ))
                        }

                    </div>
                </main>
            </>
        )
    else
        return(
            <>
                <Head>
                    <title>Posts | Ignews</title>
                </Head>

                <h1 className={styles.errorMessage} >Could not load posts</h1>

            </>
        )
}

export const getStaticProps: GetStaticProps = async ()=>{

    let news = [] as INews[]

    try{
        
        const res = await api.post("/yahoonews",{},{})
        
        news = res.data.news
        

        return {
            props:{news},
            revalidate: 60 * 60 * 30 // 30 minutes
        }

    }
    catch(e){
        return {
            props:{news}
        }
    }

    
}