import LoginFormModal from "./LoginFormModal";
import SignupFormModal from "./SignupFormModal";

const OpenModalButton = ({buttonText, modalComponent}) => {
    const clickHandler = () => {
        const modal = modalComponent.type.name
        console.log(modal)
        return
    }

    return (
        <>
            <button onClick={clickHandler}>{buttonText}</button>
        </>
    )
}

export default OpenModalButton;
