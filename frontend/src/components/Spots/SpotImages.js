import "./Spots.css";

const SpotImages = ({spot}) => {
    let count = 1;
    let imgArr = [];
    const images = () => {
        // console.log("spotImages", spot.SpotImages)
        for(let i = 0; i < 5; i++){
            if(spot.SpotImages[i]){
                let el = spot.SpotImages[i];
                imgArr.push(<img key={el.id} src={`${el.url}`} alt={spot.description} className={el.preview ? "previewImg" : `img${count++}`}/>)
            } else {
                imgArr.push(<img key={`noImage_${i}`}
                    src={"https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"}
                    alt={"noImage"}
                    className={`img${count++}`}
                />)
            }
        }
    }

    images();
    // console.log(imgArr)
    return (
        <div className="spotImageDetailPage">
            {imgArr.map((el)=> el)}
        </div>
    )
};

export default SpotImages;
