import styles from "./styles.module.scss";

import { ActiveLink } from "../ActiveLink";
import Link from "next/link";
import { useRef } from "react";

export function Header(){

    const divContent = useRef<HTMLDivElement>()

    const toogleMenu = (event)=>{

        if(event.type === "touchstart")
            event.preventDefault()

        divContent.current.classList.toggle(styles['nav-active'])

    }

    return(
        <header className={styles.headerContainer} >
            <div className={styles.headerContent} >

                <Link href="/" >
                    
                    <img src="/Images/logo.svg" alt="ig.news" />
                </Link> 

                <nav>

                    <ActiveLink activeClassName={styles.active} href="/" >
                        <a>Home</a>
                    </ActiveLink>
                    
                    <ActiveLink activeClassName={styles.active}   href="/news" prefetch>
                        <a>News</a>
                    </ActiveLink>

                    <ActiveLink activeClassName={styles.active} href="/config" >
                            <a> Config </a>
                    </ActiveLink>
                    
                </nav>

                
            </div>

            <div ref={divContent} className={styles.headerContentMobile} >

                <div>
                    <Link href="/" >
                        <img src="/Images/logo.svg" alt="ig.news" />
                    </Link> 
                </div>

                <button onClick={(e)=>{toogleMenu(e)}} className={styles.btnMobile} >
                    <span className={styles.hamburguer} ></span>
                </button>
  
                <nav  >

                    <ul>
                        <ActiveLink activeClassName={styles.active} href="/" >
                            <a  >Home</a>
                        </ActiveLink>
                        
                        <ActiveLink activeClassName={styles.active}   href="/news" prefetch>
                            <a  >News</a>
                        </ActiveLink>

                        <ActiveLink activeClassName={styles.active} href="/config" >
                            <a> Config </a>
                        </ActiveLink>

                    </ul>
                    
                </nav>

               

                
            </div>
        </header>
    )
}