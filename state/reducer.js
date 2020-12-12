import {
  SET_DISTANCE,
  SET_AVERAGE_SPEED,
  SET_CURRENT_SPEED,
  SET_LAST_POSITION,
  SET_IN_MOTION,
  SET_UNIT,
  SET_TIME_IN_MOTION,
  SET_CLOCK,
  SET_SLOTS,
} from "./types";

const initialState = {
  distance: 0.0,
  averageSpeed: 0.0,
  currentSpeed: 0.0,
  lastPosition: null,
  inMotion: false,
  unit: "k",
  slots: {
    slot1: "DISTANCE",
    slot2: "AVERAGE_SPEED",
    slot3: "TIME_IN_MOTION",
    slot4: "CLOCK",
  },
  timeInMotion: 0,
  clock: new Date(),
};

export default (state = initialState, { type, payload }) => {
  const newState = Object.assign({}, state);

  switch (type) {
    case SET_SLOTS:
      newState.slots = payload;
      break;
    case SET_CLOCK:
      newState.clock = payload;
      break;
    case SET_TIME_IN_MOTION:
      newState.timeInMotion = payload;
      break;
    case SET_UNIT:
      newState.unit = payload;
      break;
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
