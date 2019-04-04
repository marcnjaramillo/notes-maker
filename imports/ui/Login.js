import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

class Login extends Component {
  state = {
    error: ''
  };

  componentWillMount() {
    if (!Meteor.userId()) {
      this.props.history.replace('/');
    } else {
      this.props.history.replace('/links');
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      if (err) {
        this.setState({error: 'Email and password do not match any user account.'});
      } else {
        this.setState({error: ''});
      }
    });
  };

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Lnk</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="password" />
            <button className="button">Login</button>
          </form>
          <Link to="/signup">Need an account?</Link>
        </div>
      </div>
    );
  }
};

export default Login;
