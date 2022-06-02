import { useUserAuth } from "../context/authContext";
import { useFirestorage } from "../hooks/useFirestorage";



export default function Dashboard() {
    const { logOut, user }: any = useUserAuth();
    const [docs] = useFirestorage('usuarios');

    return (
        <div className="w-fit m-auto text-center">

            {user &&
                user.rol == "admin" ?
                <div>

                    <h1 className="text-3xl">Eres un usuario ADMIN</h1>
                    <div className="flex flex-col gap-3 my-5">
                        {
                            docs.map((doc: any, index: number) => {
                                return <span key={index}>{doc.nombre}, {doc.apellidos}, <strong>{doc.email}</strong></span>
                                
                            })
                        }
                    </div>
                </div>
                : <h1>Eres un CLIENTE</h1>
            }

            <button className={` my-5 py-3 px-10  text-white bg-[#2286FF] hover:bg-[#24599a] rounded-lg `} onClick={() => logOut()}>Cerrar sesión</button>
        </div>
    )
}
