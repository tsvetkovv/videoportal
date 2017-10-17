import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import s from './Register.css';

class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    registerUser: PropTypes.func.isRequired,
  };

  render() {
    const { title, registerUser } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <RegisterForm onSubmit={registerUser} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Register);
