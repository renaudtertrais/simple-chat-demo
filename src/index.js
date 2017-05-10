import { createElement } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './style/index.scss';
import App from './components/App';
import reducers from './reducers';
import initialState from './initialState';


const store = createStore(reducers, initialState);

render(
  createElement(Provider, { store }, createElement(App)),
  document.getElementById('app')
);
