import ImageComponent from "./ImageComponent";


export default function Gallery(){

    return(
        <div className={` md:masonry-2-col lg:masonry-3-col box-border mx-auto before:box-inherit after:box-inherit `}>
                <ImageComponent className="" src={"/marta.jpg"} width={450} height={300} alt={"marta"} scale={true} />
                <ImageComponent className="" src={"/marta.jpg"} width={250} height={350} alt={"marta"} scale={true} />
                <ImageComponent className="" src={"/jaime.jpg"} width={100} height={450} alt={"jaime"} scale={true} />
                <ImageComponent className="" src={"/marta.jpg"} width={200} height={350} alt={"marta"} scale={true} />
                <ImageComponent className="" src={"/3personas-skate.jpg"} width={250} height={450} alt={"3 personas en skate"} scale={true} />
                <ImageComponent className="" src={"/jaime.jpg"} width={350} height={200} alt={"jaime"} scale={true} />
                <ImageComponent className="" src={"/jaime.jpg"} width={300} height={500} alt={"jaime"} scale={true} />
                <ImageComponent className="" src={"/3personas-skate.jpg"} width={250} height={300} alt={"3 personas en skate"} scale={true} />
                <ImageComponent className="" src={"/jaime.jpg"} width={250} height={350} alt={"jaime"} scale={true} />
                <ImageComponent className="" src={"/3personas-skate.jpg"} width={250} height={450} alt={"3 personas en skate"} scale={true} />
                <ImageComponent className="" src={"/marta.jpg"} width={250} height={300} alt={"marta"} scale={true} />
                <ImageComponent className="" src={"/3personas-skate.jpg"} width={450} height={500} alt={"3 personas en skate"} scale={true} />
                <ImageComponent className="" src={"/jaime.jpg"} width={300} height={450} alt={"jaime"} scale={true} />
        </div>
    )
}