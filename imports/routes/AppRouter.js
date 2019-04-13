import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Session } from 'meteor/session';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';

export const history = createBrowserHistory();

export const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute exact path="/" component={Login} />
      <PublicRoute path="/signup" component={Signup} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/dashboard/:id" component={Dashboard} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);