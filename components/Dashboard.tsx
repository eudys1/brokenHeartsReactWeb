import { useUserAuth } from "../context/authContext";
import { useFirestorage } from "../hooks/useFirestorage";
import { getFunctions, httpsCallable } from "firebase/functions";



export default function Dashboard() {
    const { logOut, user }: any = useUserAuth();
    const [docs] = useFirestorage('usuarios');


    // const functions = getFunctions();
    // const deleteUser = httpsCallable(functions, 'deleteUser');

    async function deleteUser(uid: any) {
        const res = await fetch('/api/hello', {
            method: 'POST',
            body: JSON.stringify(uid),
        });

        const data = await res.json();
        console.log(data);
    }

    return (
        <div className="w-fit mx-auto text-center grow mt-5">

            {user &&
                user.rol == "admin" ?
                <div>

                    <h1 className="text-3xl">Eres un usuario ADMIN</h1>
                    <div className="flex flex-col gap-3 my-5">
                        {
                            docs.map((doc: any, index: number) => {
                                return (
                                    <div key={index} className="">
                                        <span >{doc.nombre}, {doc.apellidos}, <strong>{doc.email}</strong></span>
                                        <button
                                            onClick={() => deleteUser(doc.id)}
                                            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">Eliminar usuario</button>
                                    </div>
                                )

                            })
                        }
                    </div>
                </div>
                :
                <div>
                    <h1 className="text-3xl">Eres un CLIENTE</h1>
                    <span className="text-lg">Datos de tu cuenta:</span>
                    <div className="flex flex-col gap-3 my-5">
                        <span>{user.nombre}, {user.apellidos}, <strong>{user.email}</strong></span>
                    </div>
                </div>
            }

            <button className={` my-5 py-3 px-10  text-white bg-[#2286FF] hover:bg-[#24599a] rounded-lg `} onClick={() => logOut()}>Cerrar sesión</button>
        </div>
    )
}
