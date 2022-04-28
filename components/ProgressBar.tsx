// import { useEffect } from "react";
// import useStorage from "../hooks/useStorage"

// export default function ProgressBar(file:any, setFile:Function) {
//     console.log("me he ejecutado bar");
    
//     const [url, progress] = useStorage(file);
//     // console.log(progress, url);
    
//     // useEffect( () => {
//     //     if(url){
//     //         setFile(null);
//     //     }

//     // },[url,setFile]);

//     return(
//         <div className="h-1 bg-orange-400 mt-4" style={{ width: progress + '%'}}>

//         </div>
//     )
// }