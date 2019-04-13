import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { AppRouter, history } from '../imports/routes/AppRouter';
import '../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  if (selectedNoteId) {
    history.replace(`/dashboard/${selectedNoteId}`)
  }
});

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  ReactDOM.render(
    <AppRouter />,
    document.getElementById("app")
  )
});

