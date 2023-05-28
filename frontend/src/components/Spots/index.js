import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import SpotTile from "./SpotTile.js";
import "./Spots.css";

const Allspots = () => {
    const dispatch = useDispatch();
    const allSpots = useSelector(state => Object.values(state.spots));

    useEffect(()=> {
        dispatch(spotActions.loadAllSpots());
    },[dispatch]);

    return(
        <>
            <div className="allSpots">
                {allSpots.map(el => (<SpotTile spot={el}/>))}
            </div>
        </>
    )
};

export default Allspots;
