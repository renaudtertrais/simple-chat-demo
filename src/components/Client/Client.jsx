import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import compose from 'lodash/fp/compose';
import filter from 'lodash/fp/filter';
import map from 'lodash/fp/map';
import nodeEmoji from 'node-emoji/lib/emoji';

import Icon from '../Icon';
import Message from '../Message';
import './Client.scss';


const renderUser = (name, color) => (
  <span key={name}>
    , <span className="Client__user-name" style={{ color }}>
      {name}
    </span>
  </span>
);

const renderOtherUsers = currentUserName => compose(
  map(({ name, color }) => renderUser(name, color)),
  filter(({ name }) => name !== currentUserName)
);

const COMA_LEFT_PATH = 'M0,0 C0,3 8,8 10,8 C8,5 8,3 8,0';
const COMA_RIGHT_PATH = 'M3,0 C3,3 3,5 0,8 C3,8 10,3 10,0';

const renderMessages = currentUserName => map(message => {
  const isCurrentUser = currentUserName === message.userName;
  const className = classnames(
    'Client__message',
    { 'Client__message--current-user': isCurrentUser }
  );
  if (message.join || message.leave) {
    const action = message.join ? 'joined' : 'left';
    return (
      <div key={message.ID} className="Client__message-notification">
        {message.userName} {action} the chat.
      </div>
    );
  }

  if (message.join) {
    return (
      <div key={message.ID} className="Client__message-notification">
        {message.userName} joined the chat
      </div>
    );
  }
  return (
    <div key={message.ID} className={className}>
      <Message {...message} />
      <svg width="10" height="10" viewBox="0 0 10 10" className="Client__message-coma">
        <path
          className="Client__message-coma-path"
          d={isCurrentUser ? COMA_LEFT_PATH : COMA_RIGHT_PATH}
        />
      </svg>
    </div>
  );
});

const renderEmojiList = (search = '', addEmoji) =>
  nodeEmoji
    .search(search)
    .map(({ key, emoji }) => (

      <button key={key} className="Client__emoji-item" title={`:${key}:`} onClick={() => addEmoji(emoji)}>
        <span className="Client__emoji-item-symbol">{emoji}</span>
      </button>
    ));

const Client = ({
  user,
  users,
  messages,
  isEmojiPanelOpen,
  openEmojiPanel,
  closeEmojiPanel,
  onChangeEmojiSearch,
  emojiSearch,
  onChangeMessage,
  message,
  addEmoji,
  sendMessage,
  handleKeyDown,
  handleScroll,
  setDomNode,
  leaveChat,
}) => {
  const { name, color } = user;
  return (
    <div className="Client" ref={setDomNode}>
      <header className="Client__header">
        <span className="Client__user-count">
          {users.length}
        </span>
        <span className="Client__current-user-name" style={{ background: color }}>
          {user.name}
        </span>
        <div className="Client__header-users">
          {renderOtherUsers(name)(users)}
        </div>
        <button className="Client__logout" onClick={leaveChat}>
          <Icon name="logout" />
        </button>
      </header>
      <div className="Client__messages" onScroll={handleScroll}>
        {renderMessages(name)(messages)}
      </div>
      <footer className="Client__footer">
        <div className="Client__message-input-container">
          <textarea
            className="Client__message-input"
            placeholder="Your message..."
            onChange={onChangeMessage}
            value={message}
            onKeyDown={handleKeyDown}
          />
          <div className="Client__buttons">
            <button className="Client__send-button" onClick={sendMessage}>
              <Icon name="arrow-up-bold" />
            </button>
            <button className="Client__emoji-button" onClick={openEmojiPanel}>
              <Icon name="emoticon" />
            </button>
          </div>
        </div>

        <div
          className={classnames(
            'Client__footer-panel',
            { 'Client__footer-panel--is-open': isEmojiPanelOpen }
          )}
        >
          <header className="Client__footer-panel-header">
            <input
              type="search"
              className="Client__emoji-search"
              onChange={onChangeEmojiSearch}
              value={emojiSearch}
              placeholder="Search emoji..."
            />
            <div>
              <button className="Client__emoji-close" onClick={closeEmojiPanel}>
                <Icon name="close" />
              </button>
            </div>
          </header>
          <div className="Client__emoji-list">
            {renderEmojiList(emojiSearch, addEmoji)}
          </div>
        </div>
      </footer>
    </div>
  );
};

Client.displayName = 'Client';

Client.propTypes = {
  user: PropTypes.shape({
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  users: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired,
  isEmojiPanelOpen: PropTypes.bool.isRequired,
  openEmojiPanel: PropTypes.func.isRequired,
  closeEmojiPanel: PropTypes.func.isRequired,
  onChangeEmojiSearch: PropTypes.func.isRequired,
  emojiSearch: PropTypes.string.isRequired,
  onChangeMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  addEmoji: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  handleScroll: PropTypes.func.isRequired,
  setDomNode: PropTypes.func.isRequired,
  leaveChat: PropTypes.func.isRequired,
};

export default Client;
