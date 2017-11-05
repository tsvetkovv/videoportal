import React, { PropTypes } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

const mapStateToProps = state => ({
  username: _.get(state, 'user.username'),
  role: _.get(state, 'user.role'),
  id: _.get(state, 'user.id'),
});

@connect(mapStateToProps)
class Navigation extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  };

  render() {
    const { role, username, id } = this.props;
    const profileLink = `/user/${id}`;

    return (
      <div className={s.root} role="navigation">
        {role === 'ADMIN' && (
          <Link className={s.brand} to="/admin">
            <span className={s.brandTxt}>Admin</span>
          </Link>
        )}
        {username && (
          <Link className={s.brand} to={profileLink}>
            <span className={s.brandTxt}>Your Profile</span>
          </Link>
        )}
        {!username && (
          <span>
            <Link className={s.link} to="/login">
              Log in
            </Link>
            <span className={s.spacer}>or</span>
            <Link className={cx(s.link, s.highlight)} to="/register">
              Sign up
            </Link>
          </span>
        )}
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
