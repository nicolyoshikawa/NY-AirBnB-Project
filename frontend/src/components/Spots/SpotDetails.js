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
                <div className="spotDetailPage">
                    <div className="heading">
                        <h2 >{spot.name}</h2>
                        <div >{spot.city}, {spot.state}, {spot.country}</div>
                    </div>
                    <div className="spotImageContainer"><SpotImages spot={spot}/></div>
                    <div className="spotDetailContainer">
                        <div className="description">
                            <div className="firstName">Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
                            <p className="lighterFontWeight">{spot.description}</p>
                        </div>
                        <div className="callOutBox"><CallOutBox spot={spot}/></div>
                    </div>
                    <div className="section"></div>
                    <div><Reviews spot={spot}/></div>
                </div>
            )}
        </>
    )
};

export default SpotDetails;
