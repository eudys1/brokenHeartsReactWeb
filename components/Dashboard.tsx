import { useUserAuth } from "../context/authContext";


export default function Dashboard() {
    const {logOut, user}:any = useUserAuth();


    return (
        <div className="w-fit m-auto">

            {user&&
                user.rol == "admin" ? <h1>Eres usuario ADMIN</h1> : <h1>Eres un CLIENTE</h1>
            }

            <button className={` my-5 py-3 px-10  text-white bg-[#2286FF] hover:bg-[#24599a] rounded-lg `} onClick={() => logOut()}>Cerrar sesión</button>
        </div>
    )
}
