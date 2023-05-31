// import Modal from 'react-modal';
import React, { useState } from 'react';
import SignupFormPage from "./index.js";
import { Modal } from '../../context/Modal';
import "./SignupForm.css";

const SignupFormModal = ({onButtonClick}) => {
    const [showModal, setShowModal] = useState(false);
    const onClickHandler = () => {
      setShowModal(true);
      onButtonClick();
    };

    return (
      <>
        <button onClick={onClickHandler}>Sign Up</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <SignupFormPage />
          </Modal>
        )}
      </>
    );
}

export default SignupFormModal;
