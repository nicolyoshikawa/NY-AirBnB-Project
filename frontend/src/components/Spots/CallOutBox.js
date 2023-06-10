import ReviewAvg from "../Reviews/ReviewAvg.js";

const CallOutBox = ({spot}) => {
    const clickHandler = (e) => {
        e.preventDefault();
        alert("Feature coming soon...")
    }
    return(
        <form className="form">
            <div>${spot.price} night</div>
            <div><ReviewAvg spot={spot}/></div>
            <button onClick={clickHandler}>Reserve</button>
        </form>
    )
};

export default CallOutBox;
