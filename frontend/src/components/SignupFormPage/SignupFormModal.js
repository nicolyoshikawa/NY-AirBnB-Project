// import Modal from 'react-modal';
import React, { useState } from 'react';
import SignupFormPage from "./index.js";
import { Modal } from '../../context/Modal';
import "./SignupForm.css";

const SignupFormModal = () => {
    const [showModal, setShowModal] = useState(false);
    return (
      <>
        <button onClick={() => setShowModal(true)}>Sign Up</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <SignupFormPage />
          </Modal>
        )}
      </>
    );
}

export default SignupFormModal;
