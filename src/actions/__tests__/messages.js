/* global expect */
import { ADD_MESSAGE } from '../types';
import { addMessage } from '../messages';

describe('actions/messages', () => {
  describe('addMessage()', () => {
    it('should return an action with the ADD_MESSAGE type and the message', () => {
      const action = addMessage('foo');
      expect(action).toEqual({
        type: ADD_MESSAGE,
        message: 'foo',
      });
    });
  });
});
