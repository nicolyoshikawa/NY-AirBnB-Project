import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";
const SPOT_BY_ID = "spots/SPOT_BY_ID";
const CREATE_A_SPOT = "spots/CREATE_A_SPOT";
const UPDATE_A_SPOT = "spots/UPDATE_A_SPOT";
const DELETE_A_SPOT = "spots/DELETE_A_SPOT";
const SPOTS_BY_OWNER = "spots/SPOT_BY_OWNER";

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

export const spotsByOwner = (spots) => ({
  type: SPOTS_BY_OWNER,
  spots
});

export const editASpot = (spot) => ({
  type: UPDATE_A_SPOT,
  spot,
});

export const deleteASpot = (spotId) => ({
  type: DELETE_A_SPOT,
  spotId
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

export const createNewSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot)
  });

  if (response.ok) {
    const newSpot = await response.json();
    dispatch(createASpot(newSpot));
    return newSpot;
  }
};

export const loadSpotsByOwner = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/currentUser", {
    method: "GET"
  });
  const data = await response.json();
  dispatch(spotsByOwner(data.Spots));
  return response;
};

export const updateASpot = (spot) => async dispatch => {
  const response = await fetch(`/api/spots/${spot.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot)
  });

  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(editASpot(updatedSpot));
    return updatedSpot;
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const res = await response.json();
    dispatch(deleteASpot(spotId));
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
    case CREATE_A_SPOT:
      newState[action.spot.id] = action.spot;
      return newState;
    case SPOTS_BY_OWNER:
      let ownerSpots = {};
      action.spots.forEach((spot) => {
        ownerSpots[spot.id] = spot;
      });
      return ownerSpots;
    case UPDATE_A_SPOT:
      newState[action.spot.id] = action.spot;
      return newState;
    case DELETE_A_SPOT:
      delete newState[action.spotId];
      return newState;
    default:
      return newState;
  }
};

export default spotsReducer;
