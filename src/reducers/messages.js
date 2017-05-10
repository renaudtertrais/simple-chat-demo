import { ADD_MESSAGE } from '../actions/types';

function messagesReducer(messages = [], action = {}) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...messages, action.message];
    default:
      return messages;
  }
}

export default messagesReducer;
