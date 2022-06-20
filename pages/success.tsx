import { TiTick } from 'react-icons/ti';

export default function success() {

    if (typeof window !== 'undefined') {
        localStorage.removeItem('shopingCart');
    }

    return (
        <div className="mt-32 mx-4 lg:mt-48 text-center">
            <div className="w-fit mx-auto py-14 px-14 lg:px-20  shadow-xl rounded bg-white">
                <h2 className=" text-2xl mb-4"><TiTick className='mb-4 mx-auto p-2 bg-green-600 rounded-full' color='white' size={40} />Pedido realizado correctamente </h2>
                <p>Pronto recibirá un correo con más información</p>
            </div>
        </div>
    );
}