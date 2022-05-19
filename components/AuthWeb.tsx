import React from "react";

interface xxxx {
    passwd?: string;
    children?: React.ReactNode;
}

export default function AuthWeb({ passwd, children }: xxxx) {

    const handleSubmit = (data:any) => {
        console.log(data);
        
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Contraceña:
                    <input type="password" />
                </label>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}


