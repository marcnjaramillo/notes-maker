import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import assert from 'assert';
import { configure, mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import { NoteListHeader } from './../../imports/ui/NoteListHeader';

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('NoteListHeader', function () {
    it('should call meteorCall on click', function () {
      const spy = sinon.spy();
      const wrapper = mount( <NoteListHeader meteorCall={spy}/> );

      wrapper.find('button').simulate('click');
      assert(spy.called);
      
    });
  });
}