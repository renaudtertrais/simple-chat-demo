/* global expect jest */
import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';
import Client from '../../Client';

const props = {
  users: [{ name: 'Bart' }, { name: 'Lisa' }],
  messages: ['foo', 'bar', 'baz'],
  addNewClient: jest.fn(),
};

describe('components/App/App', () => {
  it('should render as many <Client /> as users in props', () => {
    const users = [{ name: 'Bart' }, { name: 'Lisa' }];
    const wrapper = shallow(<App {...props} users={users} />);
    const clients = wrapper.find(Client);
    expect(clients.length).toBe(2);
  });

  it('should render a button.App__add-client that will call props.addNewClient onClick', () => {
    const addNewClient = jest.fn();
    const wrapper = shallow(<App {...props} addNewClient={addNewClient} />);
    const button = wrapper.find('button.App__add-client');
    expect(button.prop('onClick')).toBe(addNewClient);
  });
});
