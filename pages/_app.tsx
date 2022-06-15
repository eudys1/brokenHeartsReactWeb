import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserAuthContextProvider } from '../context/authContext';
import Footer from '../components/Footer';
import { ShopingCartContextProvider } from '../context/shopingCartContext';
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserAuthContextProvider>
            <ShopingCartContextProvider>
                {/* <AuthWeb> */}
                <div className="flex flex-col h-screen">
                    <div className="grow">
                        <Header className='justify-between ' />
                        <Component {...pageProps} />
                    </div>
                    <div className='bg-black px-5 mt-14 '>
                        <Footer className='text-center lg:text-left' />
                    </div>
                </div>
                {/* </AuthWeb> */}
            </ShopingCartContextProvider>
        </UserAuthContextProvider>
    )
}

export default MyApp
