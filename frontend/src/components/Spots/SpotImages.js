import "./Spots.css";

const SpotImages = ({spot}) => {
    let count = 1;

    return (
        <div className="spotImageDetailPage">
            {spot.SpotImages.map(el => (
                // <div className={el.preview ? "previewImg" : `img${count++}`}>
                    <img key={el.id} src={`${el.url}`} alt={spot.description} className={el.preview ? "previewImg" : `img${count++}`}/>
                // </div>
            ))}
        </div>
    )
};

export default SpotImages;
