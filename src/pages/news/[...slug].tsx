import styles from "./article.styles.module.scss"
import Head from "next/head"
import { GetStaticProps } from "next"
import { api } from "../../services/api"
import { useEffect, useState } from "react"


interface INews{
    link: string
    title:string
    authors:string[]
    description:string
    timeStamp:string
    content:string
    source:string
    imgSrc:string
}

interface newsProps{
    URL_POST:string
}


export default  function News(props : newsProps){

    const [article, setArticle] = useState<INews>()

    useEffect(()=>{

        const URL_POST = props.URL_POST

        api.post("/article",{link:URL_POST},{})
        .then((res)=>{
            const newArticle = res.data.article
            newArticle.link = URL_POST
            setArticle(newArticle)
            
        })
        .catch(()=>{

            setArticle(null)
        })

    },[])
    
        return (
            <>
                <Head>
                    <title>News | Ignews</title>
                </Head>
                {
                    !!article?.title ?
                
                <main className={styles.container}  >
                        <article className={styles.post} > 
                            <h1>{article.title}</h1>
                            <img src={article.imgSrc} alt={article.title} />
                            <time>{article.timeStamp}</time>
                            
                            <p className={styles.postContent} >
                                {article.content}
                            </p>
                            <strong>Source: <a href={article.source}> {article.source} </a></strong>
                        </article>
                </main>
                :
                <h1 className={styles.loadingMessage} >Loading...</h1>
                }
            </>
        )
    
}

export const getStaticPaths = async () =>{
    return{
        paths:[],
        fallback:"blocking"
    }
}

export const getStaticProps: GetStaticProps = async (info)=>{

    const URL_POST = info.params.slug[0].split("URL=")[1]

    return {
        props:{URL_POST},
        revalidate: 60 * 60 * 60 * 12 // 12 hours 
    }

    
}