import { csrfFetch } from "./csrf";
import { loadSpotById } from "./spots";

const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
const POST_A_REVIEW = "reviews/POST_A_REVIEW";

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

export const postReview = (review) => ({
  type: POST_A_REVIEW,
  review
});


export const loadAllReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "GET"
  });
  const data = await response.json();
  dispatch(loadReviews(data.Reviews));
  return response;
};

export const postAReview = (spotId, review) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });

  if (response.ok) {
    const newReview = await response.json();
    dispatch(postReview(newReview));
    dispatch(loadSpotById(spotId));
    dispatch(loadAllReviews(spotId));
    return newReview;
  }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {
    case LOAD_REVIEWS:
        action.reviews.forEach((review) => {
            newState[review.id] = review;
        });
        return newState;
    case POST_A_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    default:
      return newState;
  }
};

export default reviewsReducer;
