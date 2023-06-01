import "./Review.css";

const ReviewList = ({reviewObj}) => {
    return (
        <div className="reviewList">
            <div>{reviewObj.User.firstName}</div>
            <div className="date">{reviewObj.updatedAt}</div>
            <div>{reviewObj.review}</div>
        </div>
    )
};

export default ReviewList;
