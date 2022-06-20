import ImageComponent from "./ImageComponent";


export default function SmallGalery() {


    return (

        <div className=' py-10'>
            <div className="flex gap-10 mb-10 justify-center items-center flex-col lg:flex-row lg:items-start">

                <ImageComponent className="rounded" src={"/marta.jpg"} width={250} height={300} alt={"persona posando"} scale />
                <ImageComponent className="rounded" src={"/jaime.jpg"} width={300} height={300} alt={"persona posando"} scale />
                <ImageComponent className="rounded" src={"/3personas-skate.jpg"} width={250} height={300} alt={"3 personas en skate"} scale />

            </div>

            <div className="flex justify-center items-center">
                <ImageComponent className="rounded" src={"/alberto.jpg"} width={880} height={290} alt={"persona posando"} scale />
            </div>
        </div>

    )
}