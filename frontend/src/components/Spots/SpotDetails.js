import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./Spots.css";

const SpotDetails = () => {
    const { spotId } = useParams();
    const spotsObj = useSelector(state => state.spots);
    const spot = spotsObj[spotId];
    return (
        <>
            <h1>{spot.name}</h1>
            <div>{spot.city}, {spot.state}, {spot.country}</div>
            <div>{spot.description}</div>
        </>
    )
};

export default SpotDetails;
