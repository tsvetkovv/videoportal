import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import _ from 'lodash';
import { withState } from 'recompose';
import Link from '../../components/Link';
import s from './Video.css';

const mapStateToProps = state => ({
  currentUserId: _.get(state, 'user.id'),
  currentUserRole: _.get(state, 'user.role'),
  videoProps: {
    rating: _.get(state, 'video.rating'),
    isFavorite: _.get(state, 'video.isFavorite'),
    isLiked: _.get(state, 'video.isLiked'),
    isDisliked: _.get(state, 'video.isDisliked'),
    isClaimed: _.get(state, 'video.isClaimed'),
  },
});

@connect(mapStateToProps)
@withState('modalIsOpen', 'setModalIsOpen', false)
class Video extends Component {
  static propTypes = {
    videoData: PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }).isRequired,
    videoProps: PropTypes.shape({
      rating: PropTypes.number.isRequired,
      isFavorite: PropTypes.bool.isRequired,
      isLiked: PropTypes.bool.isRequired,
      isDisliked: PropTypes.bool.isRequired,
      isClaimed: PropTypes.bool.isRequired,
    }).isRequired,
    setModalIsOpen: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onFav: PropTypes.func.isRequired,
    onUnfav: PropTypes.func.isRequired,
    onLike: PropTypes.func.isRequired,
    onDislike: PropTypes.func.isRequired,
    onClaim: PropTypes.func.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
    currentUserId: PropTypes.string.isRequired,
    currentUserRole: PropTypes.string.isRequired,
  };

  render() {
    const {
      videoData: { title, youtubeId, author: { id, username } },
      videoProps: { rating, isFavorite, isLiked, isDisliked, isClaimed },
      currentUserId,
      currentUserRole,
      setModalIsOpen,
      modalIsOpen,
      onRemove,
      onFav,
      onUnfav,
      onLike,
      onDislike,
      onClaim,
    } = this.props;
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
      overlay: {
        backgroundColor: 'rgba(119, 119, 119, 0.75)',
      },
    };
    const userLink = `/user/${id}`;

    return (
      <div className={s.root}>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={customStyles}
          contentLabel="Modal"
        >
          <div>Спасибо за обращение, Ваша жалоба принята к рассмотрению.</div>
        </Modal>
        <div className={s.container}>
          <div>
            <iframe
              title={youtubeId}
              className={s.videoContent}
              src={`https://www.youtube.com/embed/${youtubeId}`}
            />
            <h2>{title}</h2>
            <h4>Rating: {rating}</h4>
            <Link to={userLink}>{username}</Link>
          </div>
          {currentUserId && (
            <div className={s.markContainer}>
              <div className={s.btnGroup}>
                {!isFavorite ? (
                  <div
                    role="presentation"
                    onClick={() => onFav(youtubeId)}
                    className={cx(s.btn, s.btnFav)}
                  >
                    FAV
                  </div>
                ) : (
                  <div
                    role="presentation"
                    onClick={() => onUnfav(youtubeId)}
                    className={cx(s.btn, s.btnUnFav)}
                  >
                    UNFAV
                  </div>
                )}
              </div>
              <div className={s.btnGroup}>
                <div
                  role="presentation"
                  onClick={() => onLike(youtubeId)}
                  className={cx(s.btn, s.btnLike, { [s.shadow]: isLiked })}
                >
                  Like
                </div>
                <div
                  role="presentation"
                  onClick={() => onDislike(youtubeId)}
                  className={cx(s.btn, s.btnDisLike, {
                    [s.shadow]: isDisliked,
                  })}
                >
                  Dislike
                </div>
              </div>
              {currentUserRole === 'ADMIN' && (
                <a className={s.report}>block the video</a>
              )}
              {!isClaimed && (
                <a
                  role="presentation"
                  className={s.report}
                  onClick={() => {
                    onClaim(youtubeId);
                    setModalIsOpen(true);
                  }}
                >
                  report the video
                </a>
              )}
              {(currentUserId === id || currentUserRole === 'ADMIN') && (
                <a
                  role="presentation"
                  className={s.report}
                  onClick={() => onRemove(youtubeId)}
                >
                  remove the video
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Video);
