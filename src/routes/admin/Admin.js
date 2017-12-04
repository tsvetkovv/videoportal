import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import VideoSmall from '../../components/VideoSmall/VideoSmall';
import s from './Admin.css';

class Admin extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    blamedVideos: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        youtubeId: PropTypes.string.isRequired,
        author: PropTypes.shape({
          id: PropTypes.string,
          username: PropTypes.string,
        }),
        rating: PropTypes.number.isRequired,
      }),
    ).isRequired,
    onClearClaims: PropTypes.func.isRequired,
  };

  render() {
    const { blamedVideos, onClearClaims } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <h2>Moderation List</h2>
          {!blamedVideos && <h2>There is no blamed videos</h2>}
          {blamedVideos &&
            blamedVideos.map(video => (
              <div className={s.videoContainer}>
                <VideoSmall video={video} largeVideo />
                <div>
                  <a
                    role="presentation"
                    onClick={() => onClearClaims(video.youtubeId)}
                    className={s.adminBtn}
                  >
                    mark as good
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Admin);
