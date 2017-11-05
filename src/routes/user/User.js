import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import VideoSmall from '../../components/VideoSmall/VideoSmall';
import Link from '../../components/Link';
import s from './User.css';

const mapStateToProps = state => ({
  userId: _.get(state, 'user.id'),
});

@connect(mapStateToProps)
class User extends React.Component {
  static propTypes = {
    onLogOut: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    userPageId: PropTypes.string.isRequired,
    profileData: PropTypes.shape({
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
    const {
      profileData: { username, claimedVideos, favoriteVideos },
      onLogOut,
      userId,
      userPageId,
    } = this.props;
    const isYourProfile = userId === userPageId;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.titleContainer}>
            <h1>
              {userId === userPageId ? 'Your profile' : `${username} profile`}
            </h1>
            {userId === userPageId && (
              <h3
                role="presentation"
                className={s.logout}
                onClick={() => onLogOut()}
              >
                Log out
              </h3>
            )}
          </div>
          <article className={s.newsItem}>
            <h1 className={s.newsTitle}>User`s videos</h1>
            <div className={s.videosContainer}>
              {favoriteVideos.map(video => (
                <VideoSmall video={video} deleteIcon={isYourProfile} />
              ))}
              {isYourProfile && (
                <Link to="/new-video" className={s.addBtn}>
                  (+) Add new video
                </Link>
              )}
            </div>
          </article>
          <article className={s.newsItem}>
            <h1 className={s.newsTitle}>Favorite videos</h1>
            <div className={s.videosContainer}>
              {claimedVideos.map(video => <VideoSmall video={video} />)}
            </div>
          </article>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(User);
