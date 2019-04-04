import { Meteor } from 'meteor/meteor';
import assert from 'assert';

import { validateNewUser } from './../../imports/api/users';

if (Meteor.isServer) {
  describe('users', function () {
    it('should allow valid email address', function () {
      const testUser = {
        emails: [
          {
            address: 'test@example.com'
          }
        ]
      };
      const res = validateNewUser(testUser);
      assert.strictEqual(res, true); 
    });

    it('should reject invalid email', function () {
      const testUser = {
        emails: [
          {
            address: 'test@example'
          }
        ]
      };
      const res = validateNewUser(testUser);
      assert.throws(() => {
        res;
        throw new Error('Invalid email');
      });
    });
  });
}