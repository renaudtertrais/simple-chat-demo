/* global expect */
import usersReducer from '../users';
import { ADD_USER, REMOVE_USER } from '../../actions/types';

describe('reducers/users', () => {
  describe('ADD_USER', () => {
    it('should add the user at the end of users', () => {
      const users = ['foo', 'bar'];
      const action = { type: ADD_USER, user: 'baz' };
      const result = usersReducer(users, action);
      expect(result).toEqual(['foo', 'bar', 'baz']);
    });

    it('should mututate users state', () => {
      const users = [];
      const action = { type: ADD_USER, user: 'foo' };
      const result = usersReducer(users, action);
      expect(result).not.toBe(users);
    });
  });

  describe('REMOVE_USER', () => {
    it('should add the user at the end of users', () => {
      const users = [{ name: 'Bart' }, { name: 'Lisa' }];
      const action = { type: REMOVE_USER, user: { name: 'Lisa' } };
      const result = usersReducer(users, action);
      expect(result).toEqual([{ name: 'Bart' }]);
    });

    it('should mututate users state', () => {
      const users = [{ name: 'Bart' }, { name: 'Lisa' }];
      const action = { type: REMOVE_USER, user: { name: 'Lisa' } };
      const result = usersReducer(users, action);
      expect(result).not.toBe(users);
    });
  });

  describe('default', () => {
    it('should return users by default', () => {
      const users = [];
      const action = {};
      const result = usersReducer(users, action);
      expect(result).toEqual([]);
      expect(result).toBe(users);
    });
  });
});
