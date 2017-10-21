import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import LoginForm from '../../components/LoginForm/LoginForm';

class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  render() {
    const { title, onSubmit } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <LoginForm onSubmit={onSubmit} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Login);
