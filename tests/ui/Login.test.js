import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import assert from 'assert';
import { configure, mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import { Login } from './../../imports/ui/Login';

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('Login', function () {

    it('should show error messages', function () {
      const error = 'This is not working';
      const history = { replace: () => {}};
      const wrapper = shallow(<Login history={history} loginWithPassword={() => {}}/>);

      wrapper.setState({ error });
      assert.strictEqual(wrapper.find('p').text(), error);
      
      wrapper.setState({ error: '' });
      assert.strictEqual(wrapper.find('p').length, 0);
    });

    it('should call loginWithPassword with form data', function () {
      const email = 'test@test.com';
      const password = 'password123';
      const spy = sinon.spy();
      const history = { replace: () => {}};

      const wrapper = mount (
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Login history={history} loginWithPassword={spy} />
        </MemoryRouter>
      );
      wrapper.find(Login).instance().refs['email'].value = email;
      wrapper.find(Login).instance().refs['password'].value = password;
      wrapper.find('form').simulate('submit');

      assert.deepStrictEqual(spy.getCalls()[0].args[0], { email });
      assert.deepStrictEqual(spy.getCalls()[0].args[1], password);
    });

    it('should set loginWithPassword callback errors', function () {
      const spy = sinon.spy();
      const history = { replace: () => {}};
      const wrapper = mount (
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Login history={history} loginWithPassword={spy} />
        </MemoryRouter>
      );
      wrapper.find('form').simulate('submit');
      spy.getCalls()[0].args[2]({error: 'error'});
      assert.notStrictEqual(wrapper.find(Login).instance().state, {});
      
      spy.getCalls()[0].args[2]();
      assert.deepStrictEqual(wrapper.find(Login).instance().state, {error: ''});
    });

  });
}