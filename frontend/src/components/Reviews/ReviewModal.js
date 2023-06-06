import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from './ReviewForm';

function ReviewFormModal({user, spot}) {
    const [showModal, setShowModal] = useState(false);
    const onClickHandler = () => {
      setShowModal(true);
    };

    return (
      <>
        <button onClick={onClickHandler}>Post Review</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <ReviewForm user={user} spot={spot}/>
          </Modal>
        )}
      </>
    );
}
export default ReviewFormModal;
