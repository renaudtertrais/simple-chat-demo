/* global expect */
import messagesReducer from '../messages';
import { ADD_MESSAGE } from '../../actions/types';

describe('reducers/messages', () => {
  describe('ADD_MESSAGE', () => {
    it('should add the message at the end of messages', () => {
      const messages = ['foo', 'bar'];
      const action = { type: ADD_MESSAGE, message: 'baz' };
      const result = messagesReducer(messages, action);
      expect(result).toEqual(['foo', 'bar', 'baz']);
    });

    it('should mututate messages state', () => {
      const messages = [];
      const action = { type: ADD_MESSAGE, message: 'foo' };
      const result = messagesReducer(messages, action);
      expect(result).not.toBe(messages);
    });
  });

  describe('default', () => {
    it('should return messages by default', () => {
      const messages = [];
      const action = {};
      const result = messagesReducer(messages, action);
      expect(result).toEqual([]);
      expect(result).toBe(messages);
    });
  });
});
