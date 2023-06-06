import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as reviewActions from "../../store/reviews.js";
import "./Review.css";

function ReviewForm({user, spot}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);
  const [disableSignUpButton, setDisableSignUpButton] = useState(true);

    useEffect(() => {
        const errors = [];
        if (review && review.length < 10) errors.push("Please enter at least 10 characters");
        if (!review) setDisableSignUpButton(true);
        if (stars === 0) setDisableSignUpButton(true);
        if(Object.values(errors).length > 0) {
          setDisableSignUpButton(true)
        } else {
          setDisableSignUpButton(false)
        }
        setErrors(errors);
    }, [review, stars]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const starNum = +stars;
    const userId = user.id;
    const spotId = spot.id;

    const reviewInput = { userId, spotId, review, stars: starNum};
      setErrors({});
      const newReview = await dispatch(reviewActions.postAReview(spot.id, reviewInput))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });

      if (newReview) {
        history.push(`/spots/${spot.id}`);
      };

  };

  return (
    <>
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>
        <div>
            {errors.length > 0 && errors.map(el => (
                <div key={el} className="errors">{el}</div>
            ))}
        </div>
        <div>
                <input
                    type="textarea"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                    placeholder="Leave your review here..."
                />
        </div>
        <div className="rate">
            <input type="radio" id="star5" name="rate" value={5} onChange={(e) => setStars(e.target.value)}/>
            <label htmlFor="star5"></label>
            <input type="radio" id="star4" name="rate" value={4} onChange={(e) => setStars(e.target.value)}/>
            <label htmlFor="star4"></label>
            <input type="radio" id="star3" name="rate" value={3} onChange={(e) => setStars(e.target.value)}/>
            <label htmlFor="star3"></label>
            <input type="radio" id="star2" name="rate" value={2} onChange={(e) => setStars(e.target.value)}/>
            <label htmlFor="star2"></label>
            <input type="radio" id="star1" name="rate" value={1} onChange={(e) => setStars(e.target.value)}/>
            <label htmlFor="star1"></label>
        </div>
        <div>
            <button type="submit" disabled={disableSignUpButton}>Submit Your Review</button>
        </div>
      </form>
    </>
  );
}

export default ReviewForm;
