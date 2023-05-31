import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";
// const REMOVE_USER = "session/removeUser";

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

export const loadAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "GET"
  });
  const data = await response.json();
  dispatch(loadSpots(data.Spots));
  return response;
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
    // case REMOVE_USER:
    //   newState = Object.assign({}, state);
    //   newState.user = null;
    //   return newState;
    default:
      return newState;
  }
};

export default spotsReducer;
