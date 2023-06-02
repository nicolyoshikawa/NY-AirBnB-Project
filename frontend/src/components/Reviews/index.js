import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/reviews.js";
import ReviewList from "./ReviewList.js";
import ReviewAvg from "./ReviewAvg.js";
import "./Review.css";

const Reviews = ({spot}) => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const spotId = spot.id;
    const user = useSelector(state => state.session.user);
    const allReviews = useSelector(state => Object.values(state.reviews).filter((review)=>{
        if(review.spotId === spotId) return true;
        return false;
    }));
    useEffect(()=> {
        dispatch(reviewActions.loadAllReviews(spotId))
        .then(()=>setIsLoaded(true))
    },[dispatch, spotId]);

    const sorted = allReviews.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

    return(
        <>
            {isLoaded && (
                <>
                    <div>
                        <ReviewAvg spot={spot}/>
                    </div>
                    {(user && allReviews.length === 0 && user.id !== spot.Owner.id) ? (
                        <div>Be the first to review!</div>
                    ) : (
                        <>{sorted.map(el => <ReviewList key={el.id} reviewObj={el}/>)}</>
                    )}
                </>
            )}
        </>
    )
};

export default Reviews;
