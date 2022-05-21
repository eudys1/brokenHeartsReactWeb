import { useEffect, useState } from "react";

interface AuthWebProps {
    passwd?: string;
    children?: React.ReactNode;
}

export default function AuthWeb({ children }: AuthWebProps) {
    const [isAuth, setIsAuth] = useState(false);
    const [passwd, setPasswd] = useState("");

    const handleSubmit = () => {

        passwd == "12345qwert" ? (setIsAuth(true), sessionStorage.setItem("signed", "true")) : setIsAuth(false);
        console.log(process.env.REACT_APP_AUTH_PASSWD);

    }


    useEffect(() => {
        const signed = sessionStorage?.getItem("signed");
        setIsAuth(signed === "true");

    }, [])

    // if (isAuth) return (<>{children}</>)
    return (<>

        {isAuth ? children : <div>
            <div>
                <label>Contraceña:
                    <input type="password" name="passwd" value={passwd} onChange={(e) => setPasswd(e.target.value)} />
                </label>
                <input type="submit" value="Entar" onClick={handleSubmit} />
            </div>
        </div>}

    </>
    )
}


