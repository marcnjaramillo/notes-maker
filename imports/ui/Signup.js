import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';


export class Signup extends Component {
  state = {
    error: '',
    email: '',
    password: ''
  };

  onSubmit = (e) => {
    let { email, password } = this.state;
    e.preventDefault();

    if (password.length < 9) {
      return this.setState({ error: 'Password must be more than 8 characters in length.' })
    }

    this.props.createUser({ email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '' });
      }
    });
  };

  onEmailChange = (e) => {
    this.setState({ email: e.target.value.trim() })
  };

  onPasswordChange = (e) => {
    this.setState({ password: e.target.value.trim() })
  };

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join Short Lnk</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">
          <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.onPasswordChange} />
            <button className="button">Create Account</button>
          </form>
          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    )
  }
};

Signup.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default withTracker(() => {
  return {
    createUser: Accounts.createUser
  };
})(Signup);