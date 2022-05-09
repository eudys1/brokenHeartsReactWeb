import {firebaseInit} from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseInit);
const firestore = getFirestore(firebaseInit);

export default function Dashboard(user?: any) {

    console.log("user dashboard: ", user);
    console.log("rol: ", user.user.rol);

    return (
        <div className="w-fit m-auto">

            {
                user.user.rol == "admin" ? <h1>Mi cuenta, eres usuario ADMIN</h1> : <h1>Mi cuenta, eres un CLIENTE</h1>

            }

            <button className={` my-5 py-3 px-10  text-white bg-[#2286FF] hover:bg-[#24599a] rounded-lg `} onClick={() => signOut(auth)}>Cerrar sesión</button>
        </div>
    )
}