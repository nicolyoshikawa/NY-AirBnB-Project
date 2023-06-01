import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import SpotReviews from "../Reviews/index.js";
import * as spotActions from "../../store/spots";
import "./Spots.css";

const SpotDetails = () => {
    const { spotId } = useParams();
    const spotsObj = useSelector(state => state.spots);
    const spot = spotsObj[spotId];
    // const dispatch = useDispatch();
    // const allSpots = useSelector(state => Object.values(state.spots));
    // const spot = allSpots.find(el => (el.id === +spotId))

    // useEffect(()=> {
    //     dispatch(spotActions.loadAllSpots());
    // },[dispatch]);
    return (
        <>
            <h1 className="allSpots">{spot.name}</h1>
            <div className="allSpots">{spot.city}, {spot.state}, {spot.country}</div>
            <div className="allSpots">{spot.description}</div>
            <div><SpotReviews spotId={spotId} /></div>
        </>
    )
};

export default SpotDetails;
