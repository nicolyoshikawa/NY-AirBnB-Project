import "./Spots.css";

const SpotImages = ({spot}) => {
    let count = 1;

    return (
        <div className="spotImageDetailPage">
            {spot.SpotImages.map(el => (
                <img key={el.id} src={`${el.url}`} alt={spot.description} className={el.preview ? "previewImg" : `img${count++}`}/>
            ))}
        </div>
    )
};

export default SpotImages;
