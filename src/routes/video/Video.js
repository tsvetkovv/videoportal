import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Link from '../../components/Link';
import s from './Video.css';

function Video({ title, rating, description, author }) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div>
          <div className={s.videoContent} />
          <h1>{title}</h1>
          <h4>{rating}</h4>
          <Link to="/user">{author}</Link>
          <p>{description}</p>
        </div>
        <div className={s.markContainer}>
          <div className={s.btnGroup}>
            <div className={cx(s.btn, s.btnFav)}>FAV</div>
            <div className={cx(s.btn, s.btnUnFav)}>UNFAV</div>
          </div>
          <div className={s.btnGroup}>
            <div className={cx(s.btn, s.btnLike)}>Like</div>
            <div className={cx(s.btn, s.btnDisLike)}>Dislike</div>
          </div>
          <a className={s.report}>report the video</a>
        </div>
      </div>
    </div>
  );
}

Video.propTypes = {
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default withStyles(s)(Video);
