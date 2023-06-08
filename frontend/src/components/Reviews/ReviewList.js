import { useSelector } from "react-redux";
import DeleteReviewModal from "./DeleteReviewModal.js";
import "./Review.css";

const ReviewList = ({reviewObj, spot}) => {
    const user = useSelector(state => state.session.user);
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
                {(reviewObj.userId === user?.id) ? (
                    <div>
                        <DeleteReviewModal spot={spot} review={reviewObj}/>
                    </div>
                ) : (
                    <div></div>
                )}
            </>
        </div>
    )
};

export default ReviewList;
