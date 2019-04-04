import { Meteor } from 'meteor/meteor';
import assert from 'assert';

import { Notes } from './../../imports/api/notes';

if (Meteor.isServer) {
  describe('notes', function () {
    const noteOne = {
      _id: 'testNoteId1',
      title: 'Test title',
      body: 'Test note text',
      updatedAt: 0,
      userId: 'testUserId1'
    };

    const noteTwo = {
      _id: 'testNoteId2',
      title: 'Test',
      body: 'Dummy text',
      updatedAt: 0,
      userId: 'testUserId2'
    };

    beforeEach(function () {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it('should insert new note', function () {
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });
    
      assert(Notes.findOne({ _id, userId }));
    });

    it('should not insert note if not authenticated', function () {
      assert.throws(() => {
        Meteor.server.method_handlers['notes.insert'].apply({ userId });
        throw new Error('Not authenticated');
      });
    });

    it('should remove note', function () {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);

      assert(!Notes.findOne({ _id: noteOne._id }));
    });

    it('should not remove note if unauthenticated', function () {
      assert.throws(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      });
    });

    it('should not remove note if invalid _id', function () {
      assert.throws(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId });
      });
    });

    it('should update note', function () {
      const title = 'Updated title';

      Meteor.server.method_handlers['notes.update'].apply({ 
        userId: noteOne.userId 
      }, [
        noteOne._id,
        { title }
      ]);
      
      const note = Notes.findOne(noteOne._id);
      assert(note.updatedAt > 0);
      assert({
        title,
        body: noteOne.body
      });
    });

    it('should not update with invalid properties', function () {
      const name = 'Username';
      const title = 'Updated title';
      const note = Meteor.server.method_handlers['notes.update'].apply({ 
        userId: noteOne.userId 
      }, [
        noteOne._id,
        { title },
        { name }
      ]);

      assert.throws(() => {
        note;
        throw new Error('Invalid property');
      });
    });

    it('should not update note if user is not creator', function () {
      const title = 'Updated title';

      Meteor.server.method_handlers['notes.update'].apply({ 
        userId: 'testid' 
      }, [
        noteOne._id,
        { title }
      ]);
      
      const note = Notes.findOne(noteOne._id);
 
      assert.deepStrictEqual(note, noteOne);
    });

    it('should not update note if unauthenticated', function () {
      assert.throws(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      });
    });

    it('should not update note if invalid _id', function () {
      assert.throws(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId });
      });
    });

    it('should return user notes', function () {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });
      const notes = res.fetch();

      assert.strictEqual(notes.length, 1);
      assert.deepStrictEqual(notes[0], noteOne);
    });

    it('should return nothing if user has no notes', function () {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: 'testUserId3' });
      const notes = res.fetch();

      assert.strictEqual(notes.length, 0);
    })
  });
}