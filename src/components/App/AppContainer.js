import { createElement, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'lodash/fp/compose';
import keyBy from 'lodash/fp/keyBy';
import randomcolor from 'randomcolor';

import { addUser } from '../../actions/users';
import { addMessage } from '../../actions/messages';
import App from './App';

const doesNameExist = (users, userName) =>
  users
    .map(({ name }) => name)
    .includes(userName);

class AppContainer extends Component {
  constructor() {
    super();

    this.addNewClient = this.addNewClient.bind(this);
  }

  getProps() {
    return Object.assign({}, this.props, {
      addNewClient: this.addNewClient,
    });
  }

  addNewClient() {
    this.createNewUser('Join the chat ? Just give us your name:');
  }

  createNewUser(promptMessage) {
    /* eslint-disable no-alert */
    const name = prompt(promptMessage);
    const hasCanceled = name === null;
    if (hasCanceled) return;
    if (!name) {
      this.createNewUser('Please enter a valid name:');
      return;
    }
    if (doesNameExist(this.props.users, name)) {
      this.createNewUser(`User "${name}" already exists, find an another name:`);
      return;
    }
    this.props.addUser({
      name,
      color: randomcolor({ luminosity: 'dark' }),
      joinAt: new Date().getTime(),
    });
    this.props.addMessage({
      ID: this.props.messages.length + 1,
      userName: name,
      createdAt: new Date().getTime(),
      join: true,
    });
  }

  render() {
    return createElement(App, this.getProps());
  }
}

AppContainer.displayName = 'AppContainer';

AppContainer.propTypes = {
  users: PropTypes.array.isRequired,
  addUser: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
};

const mapStateToProps = ({ users, messages }) => {
  const usersByName = keyBy('name', users);
  return {
    users,
    messages: messages.map(msg => Object.assign({}, msg, {
      user: usersByName[msg.userName],
    })),
  };
};

const mapDispatchToProps = dispatch => ({
  addUser: compose(dispatch, addUser),
  addMessage: compose(dispatch, addMessage),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
