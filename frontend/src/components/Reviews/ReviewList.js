import "./Review.css";

const ReviewList = ({reviewObj}) => {
    const date = new Date(reviewObj.createdAt)
    const month = date.toLocaleString('default', {month: "long"});
    const year = date.getFullYear()

    return (
        <div className="reviewList">
            <>
                <div>{reviewObj.User?.firstName}</div>
                <div className="date">{month} {year}</div>
                <div>{reviewObj.createdAt}</div>
                <div>{reviewObj.review}</div>
            </>
        </div>
    )
};

export default ReviewList;
