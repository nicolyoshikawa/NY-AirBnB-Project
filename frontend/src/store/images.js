import { csrfFetch } from "./csrf";

const ADD_SPOT_IMG = "spot/ADD_SPOT_IMG";

export const addSpotImg = (img) => ({
    type: ADD_SPOT_IMG,
    img
  });

export const newSpotImage = (newSpot, img) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(img)
    });

    if (response.ok) {
      const newSpotImg = await response.json();
      dispatch(addSpotImg(newSpotImg));
      return newSpotImg;
    }
};

const initialState = {};
const imagesReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
      case ADD_SPOT_IMG:
        newState[action.img.id] = action.img;
        return newState;
      default:
        return newState;
    }
  };

  export default imagesReducer;
