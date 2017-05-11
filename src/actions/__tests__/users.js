/* global expect */
import { ADD_USER, REMOVE_USER } from '../types';
import { addUser, removeUser } from '../users';

describe('actions/users', () => {
  describe('addUser()', () => {
    it('should return an action with the ADD_USER type and the user', () => {
      const action = addUser('foo');
      expect(action).toEqual({
        type: ADD_USER,
        user: 'foo',
      });
    });
  });

  describe('removeUser()', () => {
    it('should return an action with the REMOVE_USER type and the user', () => {
      const action = removeUser('foo');
      expect(action).toEqual({
        type: REMOVE_USER,
        user: 'foo',
      });
    });
  });
});
