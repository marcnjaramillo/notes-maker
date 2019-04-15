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
      <div className="page-content">
        <div className="page-content__sidebar">
          <NoteList/>
        </div>
        <div className="page-content__main">
          <Editor/>
        </div>
      </div>
    </div>
  )
};

export default Dashboard;