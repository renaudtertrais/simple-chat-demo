import { createElement, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'lodash/fp/compose';
import debounce from 'lodash/fp/debounce';

import { addMessage } from '../../actions/messages';
import { removeUser } from '../../actions/users';
import { willSetState } from './clientHelpers';
import Client from './Client';

const ENTER_CODE = 13;

const getScrollHeightDelta = domNode => domNode.scrollHeight - domNode.clientHeight;

const scrollToBottom = domNode => {
  if (domNode) {
    const messagesList = domNode.querySelector('.Client__messages');
    messagesList.scrollTop = 100000000000;
  }
};

class ClientContainer extends Component {
  constructor() {
    super();

    this.state = {
      isEmojiPanelOpen: false,
      emojiSearch: '',
      message: '',
      hasScroll: false,
    };

    this.openEmojiPanel = this.setStateWithFn(willSetState('isEmojiPanelOpen')(true));
    this.closeEmojiPanel = this.setStateWithFn(willSetState('isEmojiPanelOpen')(false));
    this.onChangeEmojiSearch = this.setStateFromWithFnEvent(willSetState('emojiSearch'));
    this.onChangeMessage = this.setStateFromWithFnEvent(willSetState('message'));
    this.addEmoji = this.addEmoji.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleScroll = debounce(200, this.handleScroll).bind(this);
    this.setDomNode = this.setDomNode.bind(this);
    this.leaveChat = this.leaveChat.bind(this);
  }

  componentDidMount() {
    scrollToBottom(this.node);
  }

  componentDidUpdate(prevProps) {
    const hasNewMessages = prevProps.messages.length < this.props.messages.length;
    const lastMessage = this.props.messages.slice(-1)[0] || {};
    const isUserLastMessageAuthor = lastMessage.userName === this.props.user.name;
    const { hasScroll } = this.state;
    if (hasNewMessages && (!hasScroll || isUserLastMessageAuthor)) {
      scrollToBottom(this.node);
    }
  }

  getProps() {
    return Object.assign({}, this.props, {
      openEmojiPanel: this.openEmojiPanel,
      closeEmojiPanel: this.closeEmojiPanel,
      onChangeEmojiSearch: this.onChangeEmojiSearch,
      onChangeMessage: this.onChangeMessage,
      addEmoji: this.addEmoji,
      sendMessage: this.sendMessage,
      handleKeyDown: this.handleKeyDown,
      handleScroll: this.handleScroll,
      setDomNode: this.setDomNode,
      leaveChat: this.leaveChat,

      isEmojiPanelOpen: this.state.isEmojiPanelOpen,
      emojiSearch: this.state.emojiSearch,
      message: this.state.message,
    });
  }

  setStateWithFn(fn) {
    return () => this.setState(fn);
  }

  setStateFromWithFnEvent(fn) {
    return e => this.setState(fn(e.target.value));
  }

  setDomNode(node) {
    this.node = node;
  }

  addEmoji(emoji) {
    this.setState(({ message }) => ({
      message: message + emoji,
      isEmojiPanelOpen: false,
      emojiSearch: '',
    }));
  }

  leaveChat() {
    this.props.removeUser(this.props.user);
    this.props.addMessage({
      ID: this.props.messages.length + 1,
      userName: this.props.user.name,
      createdAt: new Date().getTime(),
      leave: true,
    });
  }

  handleKeyDown(e) {
    if (e.which === ENTER_CODE && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  }

  handleScroll() {
    if (this.node) {
      const messagesList = this.node.querySelector('.Client__messages');
      const scrollBottom = getScrollHeightDelta(messagesList) - messagesList.scrollTop;
      this.setState(() => ({ hasScroll: scrollBottom > 20 }));
    }
  }

  sendMessage() {
    const message = this.state.message.trim();
    if (message) {
      this.props.addMessage({
        ID: this.props.messages.length + 1,
        content: message,
        userName: this.props.user.name,
        createdAt: new Date().getTime(),
      });
      this.setState(() => ({ message: '' }));
    }
  }

  render() {
    return createElement(Client, this.getProps());
  }
}

ClientContainer.displayName = 'ClientContainer';

ClientContainer.propTypes = {
  messages: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  removeUser: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addMessage: compose(dispatch, addMessage),
  removeUser: compose(dispatch, removeUser),
});

export default connect(null, mapDispatchToProps)(ClientContainer);
