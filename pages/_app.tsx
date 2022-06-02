import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AuthWeb from '../components/AuthWeb';
import { UserAuthContextProvider } from '../context/authContext';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserAuthContextProvider>
            <AuthWeb>
                <Component {...pageProps} />
            </AuthWeb>
            {/* <Component {...pageProps} /> */}
        </UserAuthContextProvider>
    )
}

export default MyApp
