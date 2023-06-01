import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/reviews.js";
import ReviewList from "./ReviewList.js";
import ReviewAvg from "./ReviewAvg.js";
import "./Review.css";

const Reviews = ({spot}) => {
    const dispatch = useDispatch();
    const allReviews = useSelector(state => Object.values(state.reviews));
    console.log(spot)
    useEffect(()=> {
        dispatch(reviewActions.loadAllReviews(spot.id));
    },[dispatch, spot.id]);

    return(
        <>
            <div>
                <ReviewAvg spot={spot}/>
            </div>
            <div>
                {allReviews.map(el => (<ReviewList key={el.id} reviewObj={el}/>))}
            </div>
        </>
    )
};

export default Reviews;
