import { ADD_USER, REMOVE_USER } from '../actions/types';

function usersReducer(users = [], action = {}) {
  switch (action.type) {
    case ADD_USER:
      return [...users, action.user];
    case REMOVE_USER:
      return users.filter(({ name }) => name !== action.user.name);
    default:
      return users;
  }
}

export default usersReducer;
