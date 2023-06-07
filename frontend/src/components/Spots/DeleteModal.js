import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteASpot from "./DeleteASpot.js";

function DeleteFormModal({spot}) {
    const [showModal, setShowModal] = useState(false);
    const onClickHandler = () => {
      setShowModal(true);
    };

    return (
      <>
        <button onClick={onClickHandler}>Delete</button>
        {showModal && (
          <>
          <Modal onClose={() => setShowModal(false)}>
            <DeleteASpot spot={spot}/>
          </Modal>
          </>
        )}
      </>
    );
}
export default DeleteFormModal;
