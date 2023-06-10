import ReviewAvg from "../Reviews/ReviewAvg.js";
import "./Spots.css"

const CallOutBox = ({spot}) => {
    const clickHandler = (e) => {
        e.preventDefault();
        alert("Feature coming soon...")
    }
    return(
        <form className="form">
            <div className="callOut">
                <div>${spot.price} night</div>
                <div><ReviewAvg spot={spot}/></div>
            </div>
            <button onClick={clickHandler}>Reserve</button>
        </form>
    )
};

export default CallOutBox;
