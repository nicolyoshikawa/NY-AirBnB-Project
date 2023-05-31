import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginFormPage from './index.js';
function LoginFormModal({onButtonClick}) {
    const [showModal, setShowModal] = useState(false);
    const onClickHandler = () => {
      setShowModal(true);
      onButtonClick();
    };

    return (
      <>
        <button onClick={onClickHandler}>Log In</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <LoginFormPage />
          </Modal>
        )}
      </>
    );
}
export default LoginFormModal;
