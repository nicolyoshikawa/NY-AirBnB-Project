import "./Review.css";

const ReviewAvg = ({spot}) => {
    const avgRating = spot.avgStarRating ? Number(spot.avgStarRating).toFixed(2) : "New";
    const numReviews = spot.numReviews ? Number(spot.numReviews) : 0;
    let reviewLine;
    if(numReviews === 1){
        reviewLine = (
            <>
                <div className="reviewAvg"> · {numReviews} review</div>
            </>
        )
    } else if (numReviews > 1) {
        reviewLine = (
            <>
                <div className="reviewAvg"> · {numReviews} reviews</div>
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
