import React from 'react';


import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

const Dashboard = () => {


  // componentDidMount() {
  //   if (!Meteor.userId()) {
  //     this.props.history.replace('/');
  //   }
  // };

  return (
    <div>
      <PrivateHeader title="Notes Maker" />
      <div className="wrapper">
        <NoteList/>
        <Editor/>
      </div>
    </div>
  )
};

export default Dashboard;