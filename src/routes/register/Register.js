import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

class Register extends React.Component {
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
          <RegisterForm onSubmit={onSubmit} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Register);
