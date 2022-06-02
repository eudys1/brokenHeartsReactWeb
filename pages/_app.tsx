import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AuthWeb from '../components/AuthWeb';
import { UserAuthContextProvider } from '../context/authContext';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserAuthContextProvider>
            <AuthWeb>
                <Component {...pageProps} />

                <div className='bg-black px-5 mt-5'>
                    <Footer className='text-center lg:text-left' />
                </div>
            </AuthWeb>
            {/* <Component {...pageProps} /> */}
        </UserAuthContextProvider>
    )
}

export default MyApp
