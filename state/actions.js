import {
  SET_DISTANCE,
  SET_AVERAGE_SPEED,
  SET_CURRENT_SPEED,
  SET_LAST_POSITION,
  SET_IN_MOTION,
} from "./types";

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
