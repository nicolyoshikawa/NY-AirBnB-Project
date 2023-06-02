import "./Spots.css";

const SpotImages = ({spot}) => {
    return (
        <>
            {spot.SpotImages.map(el => (<img key={el.id} src={`${el.url}`} alt={spot.description}/>))}
        </>
    )
};

export default SpotImages;
