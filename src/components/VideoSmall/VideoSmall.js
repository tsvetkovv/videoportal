import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './VideoSmall.css';
import Link from '../Link';

class VideoSmall extends React.Component {
  static propTypes = {
    video: PropTypes.object.isRequired, // eslint-disable-line
  };

  render() {
    const { video } = this.props;

    return (
      <div className={s.video}>
        <Link to="/video">
          <div className={s.videoSrc} />
        </Link>
        <div className={s.removeBtn}>X</div>
        <Link to="/video">{video.title}</Link>
        <Link to="/user">{video.author}</Link>
      </div>
    );
  }
}

export default withStyles(s)(VideoSmall);
