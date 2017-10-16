import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { registerUser } from '../../store/user/action';
import s from './Register.css';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      registerUser,
    },
    dispatch,
  );

@connect(null, mapDispatchToProps)
class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    registerUser: PropTypes.func,
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
