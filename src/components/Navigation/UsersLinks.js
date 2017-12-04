import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import cs from './Common.css';
import s from './UsersLinks.css';
import Link from '../Link/Link';

const UserLinks = ({ id, role, username }) => {
  const profileLink = `/user/${id}`;

  return [
    role === 'ADMIN' && (
      <Link className={cs.link} to="/admin">
        <span className={s.brandTxt}>Admin</span>
      </Link>
    ),
    username && (
      <Link className={cs.link} to={profileLink}>
        <span className={s.brandTxt}>Your Profile</span>
      </Link>
    ),
  ];
};

UserLinks.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default withStyles(s, cs)(UserLinks);
