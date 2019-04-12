import React, { useEffect } from 'react';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';

const Dashboard = (props) => {

  useEffect(() => {
    if (!Meteor.userId()) {
      props.history.replace('/');
    }
  });

  return (
    <div>
      <PrivateHeader title="Notes Maker" />
      <div className="wrapper">
        <NoteList/>
      </div>
    </div>
  )
};

export default Dashboard;