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
  };

  render() {
    const { video, largeVideo } = this.props;
    const userLink = video.author ? `/user/${video.author.id}` : null;
    const videoLink = `/video/${video.youtubeId}`;
    const videoClass = largeVideo ? cx(s.large, s.videoSrc) : s.videoSrc;
    const videoContainerClass = largeVideo
      ? cx(s.largeContainer, s.video)
      : cx(s.smallContainer, s.video);
    const thumbnailImage = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;

    return (
      <div className={videoContainerClass}>
        <Link to={videoLink}>
          <img alt="video" className={videoClass} src={thumbnailImage} />
          {video.title}
        </Link>
        {video.author && <Link to={userLink}>{video.author.username}</Link>}
      </div>
    );
  }
}

export default withStyles(s)(VideoSmall);
