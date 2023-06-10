import "./Spots.css";

const SpotImages = ({spot}) => {
    return (
        <div className="spotImageDetailPage">
            {spot.SpotImages.map(el => (
                <div className="spotImageDetailPage">
                    <img key={el.id} src={`${el.url}`} alt={spot.description}/>
                </div>
            ))}
        </div>
    )
};

export default SpotImages;
