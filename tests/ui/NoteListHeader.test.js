import { Meteor } from 'meteor/meteor';
import React from 'react';
import assert from 'assert';
import { configure, mount } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import { NoteListHeader } from './../../imports/ui/NoteListHeader';
import { notes } from './../../fixtures/fixtures';

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('NoteListHeader', function () {
    let meteorCall;
    let Session;

    beforeEach(function () {
      meteorCall = sinon.spy();
      Session = {
        set: sinon.spy()
      }
    });

    it('should call meteorCall on click', function () {
      const wrapper = mount( <NoteListHeader meteorCall={meteorCall} Session={Session} /> );

      wrapper.find('button').simulate('click');
      meteorCall.getCalls()[0].args[1](undefined, notes[0]._id);
      assert.strictEqual(meteorCall.getCalls()[0].args[0], 'notes.insert');
      assert(Session.set.calledWith('selectedNoteId', notes[0]._id));
    });
    
    it('should not session for failed insert', function () {
      const wrapper = mount( <NoteListHeader meteorCall={meteorCall} Session={Session} /> );

      wrapper.find('button').simulate('click');
      meteorCall.getCalls()[0].args[1]({}, undefined);
      assert.strictEqual(meteorCall.getCalls()[0].args[0], 'notes.insert');
      assert(Session.set.notCalled);
    })
  });
}