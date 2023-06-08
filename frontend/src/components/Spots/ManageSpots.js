import SpotTile from "./SpotTile";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as spotActions from "../../store/spots";
import { NavLink, useHistory } from 'react-router-dom';
import DeleteFormModal from "./DeleteModal.js";
import "./Spots.css";

const ManageSpots = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const allSpots = useSelector(state => state.spots);
    const spotOwnedByUser = Object.values(allSpots);

    useEffect(()=> {
        dispatch(spotActions.loadSpotsByOwner())
        .then(()=>setIsLoaded(true))
    },[dispatch]);

    const updateClickHandler = (spot) => {
        history.push(`/spots/${spot.id}/edit`);
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
                                        <SpotTile key={`spotTile_${el.id}`} spot={el}/>
                                        <button onClick={()=>updateClickHandler(el)}>Update</button>
                                        <DeleteFormModal key={`delete_${el.id}`} spot={el}/>
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
