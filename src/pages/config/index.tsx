
import Head from "next/head"
import { GetStaticProps } from "next"
import styles from "./styles.module.scss"
import { api } from "../../services/api"
import { useRef } from "react"
import { useLang } from "../../hooks/LangContext"


export default function Config({languages}) {

  const ref = useRef<HTMLSelectElement>()

  const {setLanguage, lang} = useLang()

  function handleSelect(){

    setLanguage(ref.current.value)
    
  }
  if(languages?.length > 0){
  return (
    
    <>

      <Head>
        <title>Config | ignews</title>
      </Head>

      <main className={styles.main} >
         
         <section>
          <h2>Searching Language</h2>
          <select defaultValue={lang} onChange={()=>{handleSelect()}} ref={ref} >
            {languages.map(language=>(
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
         </section>
          
      </main>
      
    </>
  )
  }
  else
  {
    return(
      <>

      <Head>
        <title>Config | ignews</title>
      </Head>

      <main className={styles.main} >
         
         <section>
          <h2>Could not conect to the server</h2>
         </section>
          
      </main>
      
    </>
    )
  }

}

export const getStaticProps:GetStaticProps = async ()=>{

  let languages:string[] = []

  try{
           
      const res = await api.get("/languages",{})
      
      languages = res.data.languages
      
      return {
          props:{languages},
          revalidate: 60 * 60 * 30 // 30 minutes
      }

  }
  catch(e){
      return {
          props:{languages}
      }
  }
}