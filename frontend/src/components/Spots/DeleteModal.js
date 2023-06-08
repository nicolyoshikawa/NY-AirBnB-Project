import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots";

function DeleteFormModal({spot}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const deleteClickHandler = async () => {
    const spotDeleted = await dispatch(spotActions.deleteSpot(spot.id))
    .catch(async (res) => {
        const data = await res.json();
          if (data && data.message) {
              setErrors(data.message);
          };
    });

    if (spotDeleted) {
        history.push("/spots/current");
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
                <div className='question'>Are you sure you want to remove this spot from the listings?</div>
                <button onClick={deleteClickHandler} className='deleteButton'>Yes (Delete Spot)</button>
                <button onClick={keepClickHandler} className="keepButton">No (Keep Spot)</button>
              </>
            </Modal>
          </>
        )}
      </>
    );
}
export default DeleteFormModal;
