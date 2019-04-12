import { Meteor } from 'meteor/meteor';
import React from 'react';
import assert from 'assert';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { notes } from './../../fixtures/fixtures';
import { NoteList } from './../../imports/ui/NoteList';

configure({ adapter: new Adapter() });

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