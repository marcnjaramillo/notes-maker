import { Meteor } from 'meteor/meteor';
import React from 'react';
import assert from 'assert';
import { configure, mount } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import { PrivateHeader } from './../../imports/ui/PrivateHeader';

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('PrivateHeader', function () {
    it('should set button text to logout', function () {
      const wrapper =  mount( <PrivateHeader title="test title" onLogout={() => {}} /> );
      const buttonText = wrapper.find('button').text();

      assert.strictEqual(buttonText, 'Logout');
    });

    it('should use title prop as h1 text', function () {
      const title = 'test title';
      const wrapper = mount( <PrivateHeader title={title} onLogout={() => {}} /> );
      const titleText = wrapper.find('h1').text();

      assert.strictEqual(titleText, title);
    });

    it('should call onLogout on click', function () {
      const spy = sinon.spy();
      const wrapper = mount( <PrivateHeader title='title' onLogout={spy} /> );

      wrapper.find('button').simulate('click');

      assert(spy.called);
    });
  });
}