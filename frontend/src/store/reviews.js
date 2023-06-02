import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "spots/LOAD_REVIEWS";

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

export const loadAllReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "GET"
  });
  const data = await response.json();
  dispatch(loadReviews(data.Reviews));
  return response;
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
    default:
      return newState;
  }
};

export default reviewsReducer;
