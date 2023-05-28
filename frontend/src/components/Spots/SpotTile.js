import { Link } from "react-router-dom";
import "./Spots.css";

const SpotTile = ({spot}) => {
    const avgRating = spot.avgRating ? spot.avgRating.toFixed(2) : "New";

    return (
        <>
            <div className="spotTile">
                <Link to={`/spots/${spot.id}`}>
                    <img key={spot.id} src={`${spot?.previewImage}`} alt={spot.description} title={spot.name} />
                </Link>
                <div>{spot.city}, {spot.state}</div>
                <div>${spot.price} night</div>
                <div>
                    <i class="fa-sharp fa-solid fa-star"/>
                    {avgRating}
                </div>
            </div>
        </>
    )
};

export default SpotTile;
