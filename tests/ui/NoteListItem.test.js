import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import assert from 'assert';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import { notes } from './../../fixtures/fixtures';
import { NoteListItem } from './../../imports/ui/NoteListItem';

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('NoteListItem', function () {

    let Session;

    beforeEach(() => {
      Session = {
        set: sinon.spy()
      };
    });

    it('should render title and timestamp', function () {
      const wrapper = mount( <NoteListItem note={notes[0]} Session={Session}/> );

      assert.strictEqual(wrapper.find('h5').text(), notes[0].title);
      assert.strictEqual(wrapper.find('p').text(), '4/09/19');
    });

    it('should render default title if no title', function () {
      const wrapper = mount( <NoteListItem note={notes[1]} Session={Session}/> );

      assert.strictEqual(wrapper.find('h5').text(), 'Untitled note');
      assert.strictEqual(wrapper.find('p').text(), '4/09/19');
    });

    it('should call set on click', function () {
      const wrapper = mount( <NoteListItem note={notes[0]} Session={Session}/> );

      wrapper.find('div').simulate('click');
      assert(Session.set.calledWith('selectedNoteId', notes[0]._id))
    });
  });
}
