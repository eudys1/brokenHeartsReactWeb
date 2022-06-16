import ImageComponent from "./ImageComponent";


export default function SmallGalery() {


    return (

        <div className=' py-10'>
            <div className="flex gap-10 mb-10 justify-center items-center flex-col lg:flex-row lg:items-start">

                <ImageComponent src={"/marta.jpg"} width={250} height={300} alt={"marta"} scale />
                <ImageComponent src={"/jaime.jpg"} width={300} height={300} alt={"jaime"} scale />
                <ImageComponent src={"/3personas-skate.jpg"} width={250} height={300} alt={"3 personas en skate"} scale />

            </div>

            <div className="flex justify-center items-center">
                <ImageComponent src={"/alberto.jpg"} width={880} height={290} alt={"alberto"} scale />
            </div>
        </div>

    )
}