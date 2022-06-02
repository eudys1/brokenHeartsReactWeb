import { useEffect, useState } from "react";

interface AuthWebProps {
    passwd?: string;
    children?: React.ReactNode;
}

export default function AuthWeb({ children }: AuthWebProps) {
    const [isAuth, setIsAuth] = useState(false);
    const [passwd, setPasswd] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {

        passwd == "12345qwert" ?
            (setIsAuth(true), sessionStorage.setItem("signed", "true"), setError(""))
            :
            (setIsAuth(false), setError("Contraseña incorrecta"),document.getElementsByTagName("input")[0].value = "")

        console.log(process.env.REACT_APP_AUTH_PASSWD);

    }


    useEffect(() => {
        const signed = sessionStorage?.getItem("signed");
        setIsAuth(signed === "true");

    }, [])

    return (<>

        {isAuth ? children :
            <div className="max-w-2xl mx-auto flex flex-row md:flex-col text-center mt-10">
                <h1 className="text-4xl font-bold text-[#2286FF]">Web en producción</h1>
                <p className="py-5">Introduce la contaseña para entrar y ver lo que hay por ahora</p>

                <div className="m-5 flex flex-col md:flex-row gap-4 items-center justify-center">

                    <label>Contraseña:
                        <input type="password" name="passwd" value={passwd} onChange={(e) => setPasswd(e.target.value)} />
                    </label>
                    <input type="submit" value="Entar" onClick={handleSubmit} />
                </div>
                <span className="text-[#ff0000]">{error}</span>

            </div>}

    </>
    )
}


