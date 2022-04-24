
import Head from "next/head"
import { GetStaticProps } from "next"
import Link from "next/link"
import styles from "./404.styles.module.scss";


export default function Page404() {
  return (
    <>
    
      <main className={styles.main} >
          <h1>Could not find the page you are looking for</h1>
          <Link href="/" >
            <a > Go back to home </a>
          </Link>
      </main>
      
    </>
  )
}


export const getStaticProps:GetStaticProps = async ()=>{

  return {
    props: {},
    revalidate: 60 * 60 * 24 * 30 // 30 days
  }
}