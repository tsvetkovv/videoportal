import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import UserLinks from './UsersLinks';
import GuestsLinks from './GuestsLinks';
import s from './Navigation.css';

const mapStateToProps = state => ({
  user: state.user,
});

@connect(mapStateToProps)
class Navigation extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  };
  static defaultProps = {
    user: null,
  };

  render() {
    const { user } = this.props;

    return (
      <div className={s.root} role="navigation">
        {user && <UserLinks key="user_links" {...user} />}
        {!user && <GuestsLinks key="guests_links" />}
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
