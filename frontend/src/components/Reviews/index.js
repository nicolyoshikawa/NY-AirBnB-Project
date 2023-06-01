import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/reviews.js";
import ReviewList from "./ReviewList.js";
import "./Review.css";

const SpotReviews = ({spotId}) => {
    const dispatch = useDispatch();
    const allReviews = useSelector(state => Object.values(state.reviews));

    useEffect(()=> {
        dispatch(reviewActions.loadAllReviews(spotId));
    },[dispatch, spotId]);

    return(
        <>
            <div>
                {allReviews.map(el => (<ReviewList key={el.id} reviewObj={el}/>))}
            </div>
        </>
    )
};

export default SpotReviews;
