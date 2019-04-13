import { Meteor } from 'meteor/meteor';
import React from 'react';
import assert from 'assert';
import { configure, shallow } from 'enzyme';
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

      const wrapper = shallow(<Login loginWithPassword={spy} />);
      wrapper.setState({ email, password });
      wrapper.find('form').simulate('submit', { preventDefault: () => { } });

      assert.deepStrictEqual(spy.getCalls()[0].args[0], { email });
      assert.deepStrictEqual(spy.getCalls()[0].args[1], password);
    });

    it('should set loginWithPassword callback errors', function () {
      const spy = sinon.spy();
      const wrapper = shallow(<Login loginWithPassword={spy} />);

      wrapper.find('form').simulate('submit', { preventDefault: () => { } });
      spy.getCalls()[0].args[2]({error: 'error'});
      assert.notStrictEqual(wrapper.state('error').length, 0);
      
      spy.getCalls()[0].args[2]();
      assert.strictEqual(wrapper.state('error').length, 0);
    });

  });
}