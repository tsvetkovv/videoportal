import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoginForm.css';

class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { username: '', password: '' };
    this.handleUsernameOrEmailChange = this.handleUsernameOrEmailChange.bind(
      this,
    );
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameOrEmailChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.onSubmit(username, password);
  }

  render() {
    const { username, password } = this.state;
    return (
      <form method="post" onSubmit={this.handleSubmit}>
        <div className={s.formGroup}>
          <label className={s.label} htmlFor="username">
            Username:
          </label>
          <input
            className={s.input}
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleUsernameOrEmailChange}
            autoFocus
          />
        </div>
        <div className={s.formGroup}>
          <label className={s.label} htmlFor="password">
            Password:
          </label>
          <input
            className={s.input}
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handlePasswordChange}
          />
        </div>
        <div className={s.formGroup}>
          <button className={s.button} type="submit">
            Log in
          </button>
        </div>
      </form>
    );
  }
}

export default withStyles(s)(LoginForm);
