import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";
const SPOT_BY_ID = "spots/SPOT_BY_ID";
const CREATE_A_SPOT = "spots/CREATE_A_SPOT";

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

export const spotById = (spot) => ({
  type: SPOT_BY_ID,
  spot
});

export const createASpot = (spot) => ({
  type: CREATE_A_SPOT,
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

export const createNewSpot = (payload) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const newSpot = await response.json();
    dispatch(createASpot(newSpot));
    return newSpot;
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
    case CREATE_A_SPOT:
      newState[action.spot.id] = action.spot;
      return newState;
    default:
      return newState;
  }
};

export default spotsReducer;
