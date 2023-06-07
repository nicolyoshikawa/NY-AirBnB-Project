import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots";

function DeleteASpot({spot}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const clickHandler = async () => {
        const spotDeleted = await dispatch(spotActions.deleteSpot(spot.id))
        .catch(async (res) => {
            const data = await res.json();
              if (data && data.message) {
                  setErrors(data.message);
              };
        });

        if (spotDeleted) {
            history.push("/spots/current");
        };
    }

    return (
      <>
        <h1>Confirm Delete</h1>
        {errors.length > 0 && <p className="errors">{errors}</p>}
        <div>Are you sure you want to remove this spot from the listings?</div>
        <button onClick={clickHandler}>Yes (Delete Spot)</button>
        <button>No (Keep Spot)</button>
      </>
    );
}
export default DeleteASpot;
