import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} render={(props) => (
    isAuthenticated ? (
      <Redirect to="/dashboard" />
    ) : (
      <Component {...props} />
    )
  )} />
);

export default withTracker(() => {
  return {
    isAuthenticated: !!Meteor.userId()
  }
})(PublicRoute);