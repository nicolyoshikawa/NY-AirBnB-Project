import { useState } from "react";

const OpenModalButton = ({buttonText, onButtonClick, modalComponent}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={()=>setShowModal(true)}>{buttonText}</button>
            {showModal && modalComponent}
        </>
    )
}

export default OpenModalButton;
