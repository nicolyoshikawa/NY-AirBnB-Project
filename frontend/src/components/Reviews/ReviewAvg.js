import "./Review.css";

const ReviewAvg = ({spot}) => {
    const avgRating = spot.avgStarRating ? spot.avgStarRating.toFixed(2) : "New";
    let reviewLine;
    if(spot.numReviews === 1){
        reviewLine = (
            <>
                <div className="reviewAvg"> · {spot.numReviews} review</div>
            </>
        )
    } else if (spot.numReviews > 1) {
        reviewLine = (
            <>
                <div className="reviewAvg"> · {spot.numReviews} reviews</div>
            </>
        )
    } else {
        reviewLine = "";
    }

    return(
        <>
            <i className="fa-sharp fa-solid fa-star"/>
            <div className="reviewAvg">{avgRating}</div>
            {reviewLine}
        </>
    )
};

export default ReviewAvg;
