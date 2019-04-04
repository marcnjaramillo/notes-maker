import React from 'react';

import PrivateHeader from './PrivateHeader';
import Filters from './Filters';
import LinksList from './LinksList';
import AddLink from './AddLink';



const Link = () => {

  return (
    <div>
      <PrivateHeader title="Short Lnk" />
      <div className="wrapper">
        <Filters />
        <AddLink />
        <LinksList />
      </div>
    </div>
  )
};

export default Link;