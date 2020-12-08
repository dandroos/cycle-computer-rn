import {
  SET_DISTANCE,
  SET_AVERAGE_SPEED,
  SET_CURRENT_SPEED,
  SET_LAST_POSITION,
  SET_IN_MOTION,
} from "./types";

const initialState = {
  distance: 0,
  averageSpeed: 0,
  currentSpeed: 0.0,
  lastPosition: null,
  inMotion: false,
};

export default (state = initialState, { type, payload }) => {
  const newState = Object.assign({}, state);

  switch (type) {
    case SET_IN_MOTION:
      newState.inMotion = payload;
      break;
    case SET_LAST_POSITION:
      newState.lastPosition = payload;
      break;
    case SET_CURRENT_SPEED:
      newState.currentSpeed = payload;
      break;
    case SET_AVERAGE_SPEED:
      newState.averageSpeed = payload;
      break;
    case SET_DISTANCE:
      newState.distance = payload;
      break;
    default:
      break;
  }
  return newState;
};
