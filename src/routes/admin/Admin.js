import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import VideoSmall from '../../components/VideoSmall/VideoSmall';
import s from './Admin.css';

class Admin extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    adminPageData: PropTypes.shape({
      reportedVideo: PropTypes.arrayOf(
        PropTypes.shape({
          content: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string.isRequired,
              url: PropTypes.string.isRequired,
              author: PropTypes.string.isRequired,
              rating: PropTypes.number.isRequired,
            }),
          ),
          title: PropTypes.string.isRequired,
        }),
      ),
    }).isRequired,
  };

  render() {
    const { adminPageData: { reportedVideo } } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <h2>Moderation List</h2>
          {reportedVideo.map(video => (
            <div className={s.videoContainer}>
              <VideoSmall video={video} largeVideo deleteIcon />
              <div>
                <a className={s.adminBtn}>mark as good</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Admin);
