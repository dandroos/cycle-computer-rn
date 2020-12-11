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

export const setSlots = (payload) => ({
  type: SET_SLOTS,
  payload,
});

export const setClock = (payload) => ({
  type: SET_CLOCK,
  payload,
});

export const setTimeInMotion = (payload) => ({
  type: SET_TIME_IN_MOTION,
  payload,
});

export const setUnit = (payload) => ({
  type: SET_UNIT,
  payload,
});

export const setInMotion = (payload) => ({
  type: SET_IN_MOTION,
  payload,
});

export const setDistance = (payload) => ({
  type: SET_DISTANCE,
  payload,
});

export const setAverageSpeed = (payload) => ({
  type: SET_AVERAGE_SPEED,
  payload,
});

export const setCurrentSpeed = (payload) => ({
  type: SET_CURRENT_SPEED,
  payload,
});

export const setLastPosition = (payload) => ({
  type: SET_LAST_POSITION,
  payload,
});
