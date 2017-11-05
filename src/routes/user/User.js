import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import VideoSmall from '../../components/VideoSmall/VideoSmall';
import Link from '../../components/Link';
import s from './User.css';

const mapStateToProps = state => ({
  isLogin: _.get(state, 'user.isLogin'),
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
      profileData: { userName, categories },
      onLogOut,
      userId,
      userPageId,
    } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.titleContainer}>
            <h1>
              {userId === userPageId ? 'Your profile' : `${userName} profile`}
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
          {categories.map(category => (
            <article key={category.title} className={s.newsItem}>
              <h1 className={s.newsTitle}>{category.title}</h1>
              <div className={s.videosContainer}>
                {category.content.map(video => <VideoSmall video={video} />)}
                {category.title === 'User`s videos' &&
                  userId === userPageId && (
                    <Link to="/new-video" className={s.addBtn}>
                      (+) Add new video
                    </Link>
                  )}
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(User);
