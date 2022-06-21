import Link from 'next/link';
import { useState } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { HiMenu } from "react-icons/hi";
import Logo from './Logo';

export default function MobileNavbar() {
    const [toggle, setToggle] = useState(false)

    const toggleHandler = () => {
        setToggle(false)
    }
    return (
            <Menu className='absolute bg-black bg-opacity-80 backdrop-filter backdrop-blur-lg' right customBurgerIcon={<HiMenu color='white' size={30} />}
                onOpen={() => {
                    setToggle(true)
                }}
                onClose={toggleHandler}
                isOpen={toggle}
            >
                <Link href="/">
                    <a onClick={toggleHandler}><Logo className="w-max mx-auto mb-4" /></a>
                </Link>
                
                <Link href="/" ><a onClick={toggleHandler} className="hover:text-[#b8b7ad] " >Inicio</a></Link>
                <Link href="/Fotografia" ><a onClick={toggleHandler} className="hover:text-[#b8b7ad]" >Fotografía</a></Link>
                <Link href="/Tienda" ><a onClick={toggleHandler} className="hover:text-[#b8b7ad]" >Tienda</a></Link>
                <Link href="/Cuenta" ><a onClick={toggleHandler} className=" hover:text-[#b8b7ad]" > Cuenta</a></Link>
                <Link href="/Carrito" ><a onClick={toggleHandler} className="hover:text-[#b8b7ad]" >Carrito</a></Link>
            </Menu>
    );

}