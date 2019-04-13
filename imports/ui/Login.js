import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

export class Login extends Component {
  state = {
    error: '',
    email: '',
    password: ''
  };

  onSubmit = (e) => {
    let { email, password } = this.state;
    e.preventDefault();

    this.props.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.setState({ error: 'Email and password do not match any user account.' });
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
          <h1>Notes Maker</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">
            <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.onPasswordChange} />
            <button className="button">Login</button>
          </form>
          <Link to="/signup">Need an account?</Link>
        </div>
      </div>
    );
  }
};

Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired
}

export default withTracker(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  };
})(Login);
