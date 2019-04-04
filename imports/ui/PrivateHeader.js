import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

const onLogout = () => {
  Accounts.logout();
};

const PrivateHeader = (props) => {

  return (
    <div className="title-bar">
      <div className="title-bar__content">
        <h1 className="title-bar__title">{props.title}</h1>
        <button onClick={onLogout} className="button button--link">Logout</button>
      </div>
    </div>
  )
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default PrivateHeader;