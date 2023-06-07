import SpotTile from "./SpotTile";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as spotActions from "../../store/spots";
import { useHistory, NavLink } from 'react-router-dom';
import "./Spots.css";

const ManageSpots = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const allSpots = useSelector(state => state.spots);
    const spotOwnedByUser = Object.values(allSpots);

    useEffect(()=> {
        dispatch(spotActions.loadSpotsByOwner())
        .then(()=>setIsLoaded(true))
    },[dispatch]);

    const updateClickHandler = () => {

    }
    const deleteClickHandler = () => {

    }

    return(
        <>
            {isLoaded && (
                <>
                    <h1>Manage Your Spots</h1>
                    <div className="allSpots">
                        {spotOwnedByUser.length > 0 ? (
                            spotOwnedByUser.map(el => {
                                return (
                                    <>
                                        <SpotTile key={el.id} spot={el}/>
                                        <button onClick={updateClickHandler}>Update</button>
                                        <button onClick={deleteClickHandler}>Delete</button>
                                    </>
                                )
                            })
                        ) : (
                            <NavLink exact to="/spots/new" className="home">Create a new spot</NavLink>
                        )}
                    </div>
                </>
            )}
        </>
    )
};

export default ManageSpots;
