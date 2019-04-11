import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import assert from 'assert';
import { configure, mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import { NoteList } from './../../imports/ui/NoteList';

configure({ adapter: new Adapter() });

const notes = [
  {
    _id: 'noteId1',
    title: 'test title',
    body: 'test body',
    updatedAt: 0,
    userId: 'userId1'
  }, {
    _id: 'noteId2',
    title: '',
    body: 'test body again',
    updatedAt: 0,
    userId: 'userId2'
  }
]

if (Meteor.isClient) {
  describe('NoteList', function () {
    it('should render NoteListItem for each note', function () {
      const wrapper = mount(<NoteList notes={notes}/>);
      
      assert.strictEqual(wrapper.find('NoteListItem').length, 2);
      assert.strictEqual(wrapper.find('NoteListEmptyItem').length, 0);
    });

    it('should render NoteListEmptyItem if no notes', function () {
      const wrapper = mount(<NoteList notes={[]}/>);
      
      assert.strictEqual(wrapper.find('NoteListItem').length, 0);
      assert.strictEqual(wrapper.find('NoteListEmptyItem').length, 1);
    });
  });
}