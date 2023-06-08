import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as reviewActions from "../../store/reviews.js";
import "./Review.css";

function DeleteReviewModal({spot, review}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const deleteClickHandler = async () => {
    const reviewDeleted = await dispatch(reviewActions.deleteReview(review.id))
    .catch(async (res) => {
        const data = await res.json();
          if (data && data.message) {
              setErrors(data.message);
          };
    });

    if (reviewDeleted) {
        history.push(`/spots/${spot.id}`);
    };
  }

  const keepClickHandler = () => {
    setShowModal(false);
  }
  const onClickHandler = () => {
    setShowModal(true);
  };

    return (
      <>
        <button onClick={onClickHandler} className='modalButton'>Delete</button>
        {showModal && (
          <>
            <Modal onClose={() => setShowModal(false)}>
              <>
                <h1>Confirm Delete</h1>
                {errors.length > 0 && <p className="errors">{errors}</p>}
                <div className='question'>Are you sure you want to delete this review?</div>
                <button onClick={deleteClickHandler} className="deleteButton">Yes (Delete Review)</button>
                <button onClick={keepClickHandler} className="keepButton">No (Keep Review)</button>
              </>
            </Modal>
          </>
        )}
      </>
    );
}
export default DeleteReviewModal;
