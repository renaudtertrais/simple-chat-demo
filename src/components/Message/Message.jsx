import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import compose from 'lodash/fp/compose';
import marked from 'marked';
import { emojify } from 'node-emoji';

import './Message.scss';

const formatMessage = compose(
  emojify,
  marked
);

const Message = ({ user, content, userName, createdAt }) => {
  const style = user ? { color: user.color } : {};
  return (
    <div className="Message">
      <header className="Message__header" style={style}>
        {userName}
      </header>
      <div
        className="Message__content markdown-body"
        dangerouslySetInnerHTML={{ __html: formatMessage(content) }}
      />
      <footer className="Message__footer">
        {moment(createdAt).format('D MMM - HH:mm')}
      </footer>
    </div>
  );
};

Message.displayName = 'Message';

Message.propTypes = {
  user: PropTypes.shape({
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  content: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
};

export default Message;
