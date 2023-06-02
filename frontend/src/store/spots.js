import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";
const SPOT_BY_ID = "spots/SPOT_BY_ID";

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

export const spotById = (spot) => ({
  type: SPOT_BY_ID,
  spot
});

export const loadAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "GET"
  });
  const data = await response.json();
  dispatch(loadSpots(data.Spots));
  return response;
};

export const loadSpotById = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "GET"
  });

  if (response.ok) {
    const res = await response.json();
    dispatch(spotById(res));
    return res;
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {
    case LOAD_SPOTS:
        action.spots.forEach((spot) => {
            newState[spot.id] = spot;
        });
        return newState;
    case SPOT_BY_ID:
      newState[action.spot.id] = action.spot;
      return newState;
    default:
      return newState;
  }
};

export default spotsReducer;
