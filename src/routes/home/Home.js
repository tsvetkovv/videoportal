import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import VideoSmall from '../../components/VideoSmall/VideoSmall';
import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    homeData: PropTypes.shape({
      categories: PropTypes.arrayOf(
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
    const { homeData: { lastVideos, populateVideos } } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <article className={s.newsItem}>
            <h1 className={s.newsTitle}>Last videos</h1>
            <div className={s.videosContainer}>
              {lastVideos.map(video => <VideoSmall video={video} />)}
            </div>
          </article>
          <article className={s.newsItem}>
            <h1 className={s.newsTitle}>Populate videos</h1>
            <div className={s.videosContainer}>
              {populateVideos.map(video => <VideoSmall video={video} />)}
            </div>
          </article>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
