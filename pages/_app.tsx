import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AuthWeb from '../components/AuthWeb'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthWeb>
            <Component {...pageProps} />
        </AuthWeb>
        // <Component {...pageProps} />  
    )
}

export default MyApp
