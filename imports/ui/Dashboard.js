import React from 'react';

import PrivateHeader from './PrivateHeader';

const Dashboard = () => {

  return (
    <div>
      <PrivateHeader title="Notes Maker" />
      <div className="wrapper">
        Dashboard page
      </div>
    </div>
  )
};

export default Dashboard;