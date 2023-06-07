import * as spotActions from "../../store/spots";
import { useHistory } from 'react-router-dom';
import SpotForm from "./SpotForm.js";

const UpdateASpot = () => {
    return (
        <>
            <h1>Update Spot Form</h1>
            <SpotForm/>
        </>
    )
};

export default UpdateASpot;
