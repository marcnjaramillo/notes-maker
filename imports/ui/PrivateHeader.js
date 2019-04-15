import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';

export const PrivateHeader = (props) => {

  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button onClick={() => props.onLogout()} className="button button--link">Logout</button>
      </div>
    </div>
  )
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
}

export default withTracker(() => {
  return {
    onLogout: () => Accounts.logout()
  };
})(PrivateHeader);