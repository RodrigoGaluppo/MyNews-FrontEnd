import styles from "./home.styles.module.scss"

import Head from "next/head"
import {GetStaticProps} from "next/"


export default function Home() {
  return (
    <>

      <Head>
        <title>Home| ig.news</title>
      </Head>

      <main className={styles['content-container']}>
        <section className={styles.hero} >
          <span>👏 Hey, welcome</span>
          <h1>News about <span>Everything</span> in the world</h1>
          <p>Start using it<span> now</span></p>

        </section>
        <img src="/images/avatar.svg" alt="girl coding" />


      </main>
    </>
  )
}


export const getStaticProps:GetStaticProps = async ()=>{



  return {
    props: {

    },
    revalidate: 60 * 60 * 24 * 3 // 3 days
  }
}