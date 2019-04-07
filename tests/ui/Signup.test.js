import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import assert from 'assert';
import { configure, mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import { Signup } from './../../imports/ui/Signup';

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('Signup', function () {

    it('should show error messages', function () {
      const error = 'This is not working';
      const history = { replace: () => {}};
      const wrapper = shallow(<Signup history={history} createUser={() => {}}/>);

      wrapper.setState({ error });
      assert.strictEqual(wrapper.find('p').text(), error);
      
      wrapper.setState({ error: '' });
      assert.strictEqual(wrapper.find('p').length, 0);
    });

    it('should call createUser with form data', function () {
      const email = 'test@test.com';
      const password = 'password123';
      const spy = sinon.spy();
      const history = { replace: () => {}};

      const wrapper = mount (
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Signup history={history} createUser={spy} />
        </MemoryRouter>
      );
      wrapper.find(Signup).instance().refs['email'].value = email;
      wrapper.find(Signup).instance().refs['password'].value = password;
      wrapper.find('form').simulate('submit');

      assert.deepStrictEqual(spy.getCalls()[0].args[0], { email, password });
    });

    it('should show error message for short password', function () {
      const email = 'test@test.com';
      const password = 'password123';
      const spy = sinon.spy();
      const history = { replace: () => {}};

      const wrapper = mount (
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Signup history={history} createUser={spy} />
        </MemoryRouter>
      );
      wrapper.find(Signup).instance().refs['email'].value = email;
      wrapper.find(Signup).instance().refs['password'].value = password;
      wrapper.find('form').simulate('submit');

      assert.notStrictEqual(wrapper.find(Signup).instance().state, {});
    });

    it('should set loginWithPassword callback errors', function () {
      const password = 'password123!';
      const reason = 'test reason';
      const spy = sinon.spy();
      const history = { replace: () => {}};
      const wrapper = mount (
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Signup history={history} createUser={spy} />
        </MemoryRouter>
      );

      wrapper.find(Signup).instance().refs['password'].value = password;
      wrapper.find('form').simulate('submit');
      spy.getCalls()[0].args[1]({ reason });
      assert.deepStrictEqual(wrapper.find(Signup).instance().state, {error: reason});
      
      spy.getCalls()[0].args[1]();
      assert.deepStrictEqual(wrapper.find(Signup).instance().state, {error: ''});
    });

  });
}