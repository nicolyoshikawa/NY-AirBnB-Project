import { Link } from "react-router-dom";
import "./Spots.css";

const SpotTile = ({spot}) => {
    const avgRating = spot.avgRating ? Number(spot.avgRating).toFixed(2) : "New";

    return (
        <>
            <div className="spotTile">
                <Link to={`/spots/${spot.id}`}>
                    <img key={spot.id} src={`${spot?.previewImage}`} alt={spot.description} title={spot.name} />
                </Link>
                <div className="spotTileDetail">
                    <div className="location">{spot.city}, {spot.state}</div>
                    <div className="price">${spot.price} night</div>
                    <div className="rating">
                        <i className="fa-sharp fa-solid fa-star"/>
                        {avgRating}
                    </div>
                </div>
            </div>
        </>
    )
};

export default SpotTile;
