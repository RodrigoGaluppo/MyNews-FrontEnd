import styles from "./article.styles.module.scss"
import Head from "next/head"
import { GetStaticProps } from "next"
import { api } from "../../services/api"


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
    article:INews
}


export default  function News({article}:newsProps){
    if(!!article.title)
        return (
            <>
                <Head>
                    <title>News | Ignews</title>
                </Head>

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
            </>
        )
    else
        return(
            <>
                <Head>
                    <title>Posts | MyNews</title>
                </Head>

                <h1 className={styles.errorMessage} >Could not load posts</h1>

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

    let article = {} as INews

    try{
        
        const res = await api.post("/article",{link:URL_POST},{})
        
        article = res.data.article

        article.link = URL_POST

        return {
            props:{article},
            revalidate: 60 * 60 * 24 * 7 // 7 days
        }

    }
    catch(e){
        console.log(e);
        
        return {
            props:{article}
        }
    }

    
}