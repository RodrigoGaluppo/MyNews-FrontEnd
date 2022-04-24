
import Document,{Html,Head,Main,NextScript} from "next/document"

export default class MyDocument extends Document{
    render(){
        return(
            <Html>
            <Head>

            <base href="/" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="theme-color" content="#323232" />
            
            <meta name="author" content="RussoCode - Rodrigo Russo" />
            <meta name="description" content="A Modern news indexer" />
            <meta name="keywords" content="news, news now, news about everything, news" />
            <meta name="robots" content="index,follow" />
            
            <meta property="og:title" content="myNews - news indexer" />
            <meta property="og:site_name" content="MyNews" />
            <meta property="og:description" content="A Modern news indexer" />
            <meta property="og:url" content="" />
            <meta property="og:image" content="/Images/Icon192.png" />
            <meta property="og:image:type" content="image/png" />

            <meta name="apple-mobile-web-app-status-bar-style" content="black" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-title" content="Chat Me" /> 


            <link rel="apple-touch-icon" sizes="76x76" href="/Images/Icon72.png" />

       
            <link rel="apple-touch-icon" sizes="167x167" href="/Images/Icon192.png" />

        
            <link rel="icon" sizes="192x192" href="/Images/Icon192.png" />

            <link rel="icon" sizes="144x144" href="/Images/Icon144.png" />

            <link rel="manifest" href="/manifest.json" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet" />

            <title >MyNews</title >
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet" />

            </Head>
            <body>
               <Main></Main>
               <NextScript></NextScript>
            </body>
            </Html>
        )
    }
}