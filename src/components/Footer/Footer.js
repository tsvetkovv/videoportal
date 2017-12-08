import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <span className={s.text}>© 2014 - 2017 IBS Production </span>
          <span className={s.spacer}>·</span>
          <a
            className={s.text}
            href="https://github.com/Tsvetkovv/videoportal"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code on GitHub
          </a>
          <span className={s.spacer}>·</span>
          <span className={s.text}>All Rights Reserved.</span>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
