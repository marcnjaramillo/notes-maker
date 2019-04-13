import { Meteor } from 'meteor/meteor';
import React from 'react';
import assert from 'assert';
import { configure, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import { Signup } from './../../imports/ui/Signup';

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('Signup', function () {

    it('should show error messages', function () {
      const error = 'This is not working';
      const history = { replace: () => {}};
      const wrapper = shallow(<Signup history={history} createUser={() => { }}/>);

      wrapper.setState({ error });
      assert.strictEqual(wrapper.find('p').text(), error);
      
      wrapper.setState({ error: '' });
      assert.strictEqual(wrapper.find('p').length, 0);
    });

    it('should call createUser with form data', function () {
      const email = 'test@test.com';
      const password = 'password123';
      const spy = sinon.spy();

      const wrapper = shallow(<Signup createUser={spy} />);
      wrapper.setState({ email, password });
      wrapper.find('form').simulate('submit', { preventDefault: () => { } });

      assert.deepStrictEqual(spy.getCalls()[0].args[0], { email, password });
    });

    it('should show error message for short password', function () {
      const email = 'test@test.com';
      const password = 'password';
      const spy = sinon.spy();

      const wrapper = shallow(<Signup createUser={spy} />);
      wrapper.find({ name: 'email' }).simulate('change', {
        target: {
          value: email
        }
      });
      wrapper.find({name: 'password'}).simulate('change', {
        target: {
          value: password
        }
      });
      wrapper.find('form').simulate('submit', { preventDefault: () => { } });

      assert(wrapper.state('error').length > 0);
    });

    it('should set loginWithPassword callback errors', function () {
      const password = 'password123!';
      const reason = 'test reason';
      const spy = sinon.spy();
      const wrapper = shallow(<Signup createUser={spy} />);

      wrapper.setState({ password })
      wrapper.find('form').simulate('submit', { preventDefault: () => { } });
      spy.getCalls()[0].args[1]({ reason });
      assert.deepStrictEqual(wrapper.state('error'), reason);
      
      spy.getCalls()[0].args[1]();
      assert.strictEqual(wrapper.state('error').length, 0);
    });

  });
}