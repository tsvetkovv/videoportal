import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './VideoSmall.css';
import Link from '../Link';

class VideoSmall extends React.Component {
  static propTypes = {
    video: PropTypes.object.isRequired, // eslint-disable-line
    largeVideo: PropTypes.bool.isRequired,
    deleteIcon: PropTypes.bool.isRequired,
  };

  render() {
    const { video, largeVideo, deleteIcon = false } = this.props;
    const userLink = `/user/${video.author.id}`;
    const videoLink = `/video/${video.youtubeId}`;
    const videoClass = largeVideo ? cx(s.large, s.videoSrc) : s.videoSrc;

    return (
      <div className={s.video}>
        <iframe
          title={video.youtubeId}
          className={videoClass}
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
        />
        {deleteIcon && <div className={s.removeBtn}>X</div>}
        <Link to={videoLink}>{video.title}</Link>
        <Link to={userLink}>{video.author.username}</Link>
      </div>
    );
  }
}

export default withStyles(s)(VideoSmall);
