import { Meteor } from 'meteor/meteor';
import React from 'react';
import assert from 'assert';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import { Editor } from './../../imports/ui/Editor';
import { notes } from './../../fixtures/fixtures';

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('Editor', function () {
    let history;
    let call;
    let Session;

    beforeEach(function () {
      call = sinon.spy();
      history = {
        push: sinon.spy()
      };
      Session = {
        set: sinon.spy()
      };
    });

    it('should render select note message', function () {
      const wrapper = mount(<Editor history={history} call={call} Session={Session} />);
      assert.strictEqual(wrapper.find('p').text(), 'Pick or create a note to get started.');
    });

    it('should render not found message', function () {
      const wrapper = mount(<Editor history={history} call={call} Session={Session} selectedNoteId={notes[0]._id} />);
      assert.strictEqual(wrapper.find('p').text(), 'Note not found.');
    });

    it('should remove note', function () {
      const wrapper = mount(<Editor history={history} call={call} Session={Session} selectedNoteId={notes[0]._id} note={notes[0]} />);
      wrapper.find('button').simulate('click');

      assert(history.push.calledWith('/dashboard'));
      assert(call.calledWith('notes.remove', notes[0]._id));
    });

    it('should update the note body on change', function () {
      const newBody = 'New body text';

      const wrapper = mount(<Editor history={history} call={call} Session={Session} selectedNoteId={notes[0]._id} note={notes[0]} />);

      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody
        }
      });

      assert.strictEqual(wrapper.state('body'), newBody);
      assert(call.calledWith('notes.update', notes[0]._id, { body: newBody }));
    });

    it('should update the note title on change', function () {
      const newTitle = 'New title text';

      const wrapper = mount(<Editor history={history} call={call} Session={Session} selectedNoteId={notes[0]._id} note={notes[0]} />);

      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle
        }
      });

      assert.strictEqual(wrapper.state('title'), newTitle);
      assert(call.calledWith('notes.update', notes[0]._id, { title: newTitle }));
    });

    it('should set state for a new note', function () {
      const wrapper = mount(<Editor history={history} call={call} Session={Session} />);
      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      });

      assert.strictEqual(wrapper.state('title'), notes[0].title);
      assert.strictEqual(wrapper.state('body'), notes[0].body);
    });

    it('should not set state if note prop not provided', function () {
      const wrapper = mount(<Editor history={history} call={call} Session={Session} />);
      wrapper.setProps({
        selectedNoteId: notes[0]._id
      });

      assert.strictEqual(wrapper.state('title'), '');
      assert.strictEqual(wrapper.state('body'), '');
    });
  });
}