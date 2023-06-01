import ReviewAvg from "../Reviews/ReviewAvg.js";

const CallOutBox = ({spot}) => {
    const clickHandler = () => {
        alert("Feature coming soon...")
    }
    return(
        <>
            <div>${spot.price} night</div>
            <div><ReviewAvg spot={spot}/></div>
            <button onClick={clickHandler}>Reserve</button>
        </>
    )
};

export default CallOutBox;
