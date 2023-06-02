import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import Reviews from "../Reviews/index.js";
import SpotImages from "./SpotImages.js";
import CallOutBox from "./CallOutBox.js";
import * as spotActions from "../../store/spots";
import "./Spots.css";

const SpotDetails = () => {
    const { spotId } = useParams();
    const spotsObj = useSelector(state => state.spots);
    const [isLoaded, setIsLoaded] = useState(false);
    const spot = spotsObj[spotId];
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(spotActions.loadSpotById(spotId))
        .then(()=>setIsLoaded(true))
    },[dispatch, spotId]);
    return (
        <>
            {isLoaded && (
                <>
                    <h1 className="allSpots">{spot.name}</h1>
                    <div className="allSpots">{spot.city}, {spot.state}, {spot.country}</div>
                    <div className="allSpots"><SpotImages spot={spot}/></div>
                    <div className="callOutBox"><CallOutBox spot={spot}/></div>
                    <div className="allSpots">Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
                    <p className="allSpots">{spot.description}</p>
                    <div><Reviews spot={spot}/></div>
                </>
            )}
        </>
    )
};

export default SpotDetails;
