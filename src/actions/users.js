import { ADD_USER, REMOVE_USER } from './types';

export const addUser = user => ({
  type: ADD_USER,
  user,
});

export const removeUser = user => ({
  type: REMOVE_USER,
  user,
});
