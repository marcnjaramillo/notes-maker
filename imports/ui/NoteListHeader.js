import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

export const NoteListHeader = (props) => {

  handleClick = (e) => {
    e.preventDefault();
    props.meteorCall('notes.insert')
  }

  return (
    <button onClick={handleClick}>Create Note</button>
  );
};

export default withTracker(() => {
  return {
    meteorCall: Meteor.call
  };
})(NoteListHeader);