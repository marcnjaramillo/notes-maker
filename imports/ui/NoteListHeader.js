import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

export const NoteListHeader = (props) => {

  handleClick = (e) => {
    e.preventDefault();
    props.meteorCall('notes.insert', (err, res) => {
      if (res) {
        props.Session.set('selectedNoteId', res);
      }
    });
  }

  return (
    <button onClick={handleClick}>Create Note</button>
  );
};

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
}

export default withTracker(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };
})(NoteListHeader);