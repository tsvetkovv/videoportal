import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Link from '../Link/Link';
import s from './GuestsLinks.css';
import cs from './Common.css';

const GuestsLinks = () => (
  <span>
    <Link className={cs.link} to="/login">
      Log in
    </Link>
    <span className={s.spacer}>or</span>
    <Link className={cx(cs.link, s.highlight)} to="/register">
      Sign up
    </Link>
  </span>
);

export default withStyles(s, cs)(GuestsLinks);
