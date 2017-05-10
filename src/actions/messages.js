import { ADD_MESSAGE } from './types';

export const addMessage = message => ({
  type: ADD_MESSAGE,
  message,
});
