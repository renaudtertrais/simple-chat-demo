import React from 'react';
import PropTypes from 'prop-types';

import Client from '../Client';
import './App.scss';

const renderClients = (users, messages) => users.map(user => (
  <div key={user.name} className="App__client">
    <Client user={user} users={users} messages={messages} />
  </div>
));

const App = ({ users, messages, addNewClient }) => (
  <div className="App">
    <div className="App__clients">
      { renderClients(users, messages) }
      <button className="App__add-client" onClick={addNewClient}>+</button>
    </div>
  </div>
);

App.displayName = 'App';

App.propTypes = {
  users: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired,
  addNewClient: PropTypes.func.isRequired,
};

export default App;
