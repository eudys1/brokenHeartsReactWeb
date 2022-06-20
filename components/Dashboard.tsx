import { useUserAuth } from "../context/authContext";
import { useFirestorage } from "../hooks/useFirestorage";
import { deleteDoc, doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { firebaseInit, storage } from "../firebase";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { deleteUser, getAuth } from "firebase/auth";



export default function Dashboard() {
    const { logOut, user }: any = useUserAuth();
    const [docs] = useFirestorage('usuarios');
    const firestore = getFirestore(firebaseInit);
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);
    const auth = getAuth();
    const userr: any = auth.currentUser;

    async function getCustomers() {
        const res = await fetch('/api/customer', {
            method: 'POST',
            // body: JSON.stringify(lineItems),
        });

        const data = await res.json();

        console.log("data", data);
    }

    function changePicture(e: any, user: any) {
        const picture = e.target.files[0];
        const storageRef = ref(storage, `profilePictures/${picture.name}`);
        const firebaseRef = doc(firestore, "usuarios", user.uid);

        try {
            uploadBytes(storageRef, picture).then(
                async () => {
                    await getDownloadURL(storageRef).then((url: any) => {

                        updateDoc(firebaseRef, {
                            profilePicture: url,
                        });
                        setProfilePicture(url)
                    });
                }
            );

        } catch (error) {
            console.log(error);
        }

    }

    async function deleteUserFromFirestorage(collectionName: string, documentId: string) {

        await deleteDoc(doc(firestore, collectionName, documentId));
    }

    async function deleteAccount() {
        await deleteUser(userr).then(() => {
            // User deleted.
        }).catch((error) => {
            console.log(error);
        });

        await deleteUserFromFirestorage("usuarios", user.uid);
    }

    return (
        <div className=" mx-auto grow mt-5">

            {user &&
                user.rol == "admin" ?
                <div>

                    <h1 className="text-3xl text-center">Cuenta del usuario admin</h1>
                    <div className="flex flex-col gap-3 my-5 items-center">
                        {
                            docs.map((doc: any, index: number) => {
                                return (
                                    doc.rol != "admin" &&
                                    <div key={index} className="flex flex-col lg:flex-row items-center gap-3 px-5 py-7 shadow-md rounded border min-w-[250px] md:max-w-[500px] min-h-[200px]">

                                        {/* <label className="hover:cursor-pointer"> */}
                                            {/* <input type="file" className="hidden" onChange={(e) => changePicture(e, doc)} /> */}
                                            <img src={`${doc.profilePicture}`} className="w-[96px] h-[96px] rounded-full" />
                                        {/* </label> */}
                                        <p className="flex flex-col gap-2">
                                            <span><strong>Nombre: </strong>{doc.nombre}</span>
                                            {doc.apellidos && <span><strong>Apellidos: </strong> {doc.apellidos}</span>}
                                            <span className="break-all"><strong>Email: </strong><a href={`mailto:${doc.email}`}>{doc.email}</a></span>
                                        </p>
                                        <button
                                            onClick={() => deleteUserFromFirestorage("usuarios", doc.id)}
                                            className=" lg:mt-0 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 w-fit h-fit">Eliminar usuario</button>
                                    </div>
                                )

                            })
                        }
                    </div>
                </div>
                :
                <div>
                    <h1 className="text-3xl text-center">Eres un CLIENTE</h1>
                    <span className="text-lg">Datos de tu cuenta:</span>
                    <div className="flex flex-col gap-3 my-5">
                        <div className="flex flex-col lg:flex-row items-center gap-3 px-5 py-7 shadow-md rounded border min-w-[250px] md:min-w-[460px] min-h-[200px]">

                            <label className="hover:cursor-pointer">
                                <input type="file" className="hidden" onChange={(e) => changePicture(e, user)} />
                                <img src={`${profilePicture}`} className="w-[96px] h-[96px] rounded-full" />
                            </label>
                            <p className="flex flex-col gap-2">
                                <span><strong>Nombre: </strong>{user.nombre}</span>
                                {user.apellidos && <span><strong>Apellidos: </strong> {user.apellidos}</span>}
                                <span className="break-all"><strong>Email: </strong><a href={`mailto:${user.email}`}>{user.email}</a></span>
                            </p>

                        </div>
                    </div>

                </div>
            }
            <div className="flex flex-col md:flex-row items-center">
                {user.rol != "admin" &&
                    <button
                        onClick={deleteAccount}
                        className=" mb-5 mt-10 py-3 px-10  text-white bg-red-700 hover:bg-red-800 rounded-lg">
                        Eliminar cuenta
                    </button>
                }
                <button className={` flex lg:ml-auto mb-5 mt-10 py-3 px-10  text-white bg-red-700 hover:bg-red-800 rounded-lg `} onClick={() => logOut()}>Cerrar sesión</button>
            </div>
        </div>
    )
}
