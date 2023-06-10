import "./Spots.css";

const SpotImages = ({spot}) => {
    let count = 1;
    // console.log(spot.SpotImages)
    return (
        <div className="spotImageDetailPage">
            {spot.SpotImages.map(el => (
                // <div className={el.preview ? "previewImg" : `img${count++}`}>
                    <img key={el.id} src={el.url ? `${el.url}` : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"} alt={spot.description} className={el.preview ? "previewImg" : `img${count++}`}/>
                // </div>
            ))}
        </div>
    )
};

export default SpotImages;
