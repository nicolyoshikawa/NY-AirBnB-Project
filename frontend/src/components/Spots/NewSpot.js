import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as spotActions from "../../store/spots";
import "./Spots.css";

const CreateNewSpot = () => {
    const spotsObj = useSelector(state => state.spots);
    const user = useSelector(state => state.session.user);
    // const [isLoaded, setIsLoaded] = useState(false);
    // const spot = spotsObj[spotId];
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(spotActions.createNewSpot())
        .then(()=>setIsLoaded(true))
    },[dispatch]);
    return (
        <>
            {user && (
                <>
                    <button>Create a new spot</button>
                </>
            )}
        </>
    )
};

export default CreateNewSpot;
