import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { firebaseInit } from "../firebase";
import { User as FirebaseUser } from "firebase/auth";


interface saveUserInFirestorageProps {
    userUid: React.ReactNode;
    nombre?: React.ReactNode;
    apellidos?: React.ReactNode;
    email?: React.ReactNode;
    rol?: React.ReactNode;
    profilePicture?: React.ReactNode;
}

interface UserAuthContextProviderProps {
    children: React.ReactNode;
}

const auth = getAuth(firebaseInit);
const firestore = getFirestore(firebaseInit);
const provider = new GoogleAuthProvider();
const userAuthContext = createContext({});
// const userAuthContext = createContext<any>(null);

//function to save user in firestore
function saveUserInFirestorage({ userUid = "", nombre = "", apellidos = "", email = "", rol = "client",profilePicture="" }: saveUserInFirestorageProps) {

    const docRef = doc(firestore, `usuarios/${userUid}`);
    setDoc(docRef, { nombre: nombre, apellidos: apellidos, email: email, rol: rol, profilePicture: profilePicture });
}



export function UserAuthContextProvider({ children }: UserAuthContextProviderProps) {
    const [error, setError] = useState('');
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    //
    async function getFirestoreUserData(uid: any) {
        const docRef = doc(firestore, `usuarios/${uid}`);
        const docCifrada = await getDoc(docRef);
        const userInfo = docCifrada.data();

        return userInfo;
    }

    // 
    async function setFirebaseUserWithNecesaryData(firebaseUser: any) {
        //
        const userInfo = await getFirestoreUserData(firebaseUser.uid);

        if (!userInfo) return;

        const userData: any = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            nombre: userInfo.nombre,
            apellidos: userInfo.apellidos,
            rol: userInfo.rol,
            profilePicture: userInfo.profilePicture,
        };

        setUser(userData);


    }

    //create an user and save it in the database
    function signUp(nombre: string, apellidos: string, email: string, password: string, rol = "client", profilePicture = "/defaultProfilePicture.png") {

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                saveUserInFirestorage({ userUid: user.uid, nombre: nombre, apellidos: apellidos, email: email, rol: rol, profilePicture: profilePicture });

                return user;
            })
            .catch((error) => {
                const errorCode = error.code;
                errorCode === 'auth/weak-password' && setError('La contraseña es muy débil (mínimo 6 carácteres');
                return errorCode; //?
            });
    }

    //login with an email and password
    function logIn(auth: any,email: string, password: string) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                console.log(error);
                
                const errorCode = error.code;
                errorCode === 'auth/wrong-password' && setError('Contraseña incorrecta');
                errorCode === 'auth/user-not-found' && setError('Usuario no encontrado');
            });
    }

    //Login a user with google
    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (!credential) return;
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                saveUserInFirestorage({ userUid: user.uid, nombre: user.displayName, email: user.email, rol: "client",profilePicture : "/defaultProfilePicture.png" });

            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                console.log(errorCode);

                const errorMessage = error.message;
                console.log(errorMessage);
                // The email of the user's account used.
                const email = error.email;
                console.log(email);

                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }

    //Logout
    function logOut(){
        return signOut(auth);
    }

    //to control the login of the users
    useEffect(() => {
        
        onAuthStateChanged(auth, async (firebaseUser: any) => {
            (!user && firebaseUser) && await setFirebaseUserWithNecesaryData(firebaseUser);
            !firebaseUser && setUser(null);
            setIsLoading(false);
        });

    }, []);



    return (
        <userAuthContext.Provider value={{ user, error,isLoading, signUp, logIn, handleGoogleLogin, logOut }}>
            {children}
        </userAuthContext.Provider>
    )
}


//custom hook
export function useUserAuth() {
    return useContext(userAuthContext);
}


