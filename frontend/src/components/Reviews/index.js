import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/reviews.js";
import ReviewList from "./ReviewList.js";
import ReviewAvg from "./ReviewAvg.js";
import ReviewFormModal from "../Reviews/ReviewModal";
import "./Review.css";

const Reviews = ({spot}) => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const spotId = spot.id;
    const user = useSelector(state => state.session.user);
    let userPostedToSpot = false;
    const reviews = useSelector(state => state.reviews);
    const allReviews = Object.values(reviews).filter((review)=>{
        if(review.spotId === spotId) return true;
        return false;
    });

    useEffect(()=> {
        dispatch(reviewActions.loadAllReviews(spotId))
        .then(()=>setIsLoaded(true))
    },[dispatch, spotId]);


    const sorted = allReviews.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    const userReviews = allReviews.filter((review) => {
        return (review.userId === user?.id);
    });
    userPostedToSpot = (userReviews.length > 0) ? true : false;

    let reviewPage;
    if(user && allReviews.length === 0 && user.id !== spot.Owner.id){
        reviewPage = (
            <>
                <div><ReviewAvg spot={spot}/></div>
                <div>Be the first to review!</div>
                <ReviewFormModal user={user} spot={spot}/>
            </>
        )
    } else if(user && user.id !== spot.Owner.id && (!userPostedToSpot)){
        reviewPage = (
            <>
                <div><ReviewAvg spot={spot}/></div>
                <ReviewFormModal user={user} spot={spot}/>
                {sorted.map(el => <ReviewList key={el.id} reviewObj={el} spot={spot}/>)}
            </>
        );
    } else {
        reviewPage = (
            <>
                <div><ReviewAvg spot={spot}/></div>
               {sorted.map(el => <ReviewList key={el.id} reviewObj={el} spot={spot}/>)}
            </>
        )
    }
    return(
        <>
            {isLoaded && (
                <>
                    {reviewPage}
                </>
            )}
        </>
    )
};

export default Reviews;
