import { Meteor } from 'meteor/meteor';
import React from 'react';
import assert from 'assert';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NoteListItem from './../../imports/ui/NoteListItem';

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('NoteListItem', function () {
    it('should render title and timestamp', function () {
      const title = 'Test title';
      const updatedAt = 1554864669173;
      const wrapper = mount( <NoteListItem note={{title, updatedAt}}/> );

      assert.strictEqual(wrapper.find('h5').text(), title);
      assert.strictEqual(wrapper.find('p').text(), '4/09/19');
    });

    it('should render default title if no title', function () {
      const title = '';
      const updatedAt = 1554864669173;
      const wrapper = mount( <NoteListItem note={{title, updatedAt}}/> );

      assert.strictEqual(wrapper.find('h5').text(), 'Untitled note');
      assert.strictEqual(wrapper.find('p').text(), '4/09/19');
    })
  });
}
