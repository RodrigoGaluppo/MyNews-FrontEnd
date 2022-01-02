import "../styles/global.scss"
import {AppProps} from "next/app"
import { Header } from "../components/Header"
import AppProvider from '../hooks';


function MyApp({ Component, pageProps }: AppProps) {
  return (

     <AppProvider>
      <Header></Header>
         <Component {...pageProps} />
     </AppProvider>

  )
}

export default MyApp
