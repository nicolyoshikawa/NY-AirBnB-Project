import "./Review.css";

const ReviewAvg = ({spot}) => {
    const avgRating = spot.avgStarRating ? spot.avgStarRating.toFixed(2) : "New";
    return(
        <>
            <i className="fa-sharp fa-solid fa-star"/>
            <div className="reviewAvg">{avgRating}</div>
            <i class="fa-solid fa-circle fa-2xs"></i>
            <div className="reviewAvg">{spot.numReviews} reviews</div>
        </>
    )
};

export default ReviewAvg;
