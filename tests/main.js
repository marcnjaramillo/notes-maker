import assert from 'assert';
//Server tests
import './api/users.test.js';
import './api/notes.test.js';
//Client tests
import './ui/PrivateHeader.test.js';
import './ui/Login.test.js';
import './ui/Signup.test.js';
// describe('notes-maker', function () {
//   it('package.json has correct name', async function () {
//     const { name } = await import('../package.json');
//     assert.strictEqual(name, 'notes-maker');
//   });

//   if (Meteor.isClient) {
//     it('client is not server', function () {
//       assert.strictEqual(Meteor.isServer, false);
//     });
//   }

//   if (Meteor.isServer) {
//     it('server is not client', function () {
//       assert.strictEqual(Meteor.isClient, false);
//     });
//   }
// });