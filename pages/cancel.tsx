import {ImCross} from 'react-icons/im';

export default function cancel() {
    return (
        <div className="mt-32 mx-4 lg:mt-48 text-center">
            <div className="w-fit mx-auto py-14 px-20  shadow-xl rounded bg-white">
                <h2 className=" text-2xl mb-4"><ImCross className='mb-4 mx-auto p-2 bg-red-600 rounded-full' color='white' size={40}/>Oops! Ha habido un error con tu pedido </h2>
                <p>Vuelve a intentarlo en unos minutos</p>
            </div>
        </div>
    );
}