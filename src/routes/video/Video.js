import React, { Component, PropTypes } from 'react';
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
});

@connect(mapStateToProps)
@withState('modalIsOpen', 'setModalIsOpen', false)
class Video extends Component {
  static propTypes = {
    videoData: PropTypes.shape({
      title: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
    }).isRequired,
    setModalIsOpen: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
    currentUserId: PropTypes.string.isRequired,
    currentUserRole: PropTypes.string.isRequired,
  };

  render() {
    const {
      videoData: { title, youtubeId, rating, author: { id, username } },
      currentUserId,
      currentUserRole,
      setModalIsOpen,
      modalIsOpen,
      onRemove,
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
          <div className={s.markContainer}>
            <div className={s.btnGroup}>
              <div className={cx(s.btn, s.btnFav)}>FAV</div>
              <div className={cx(s.btn, s.btnUnFav)}>UNFAV</div>
            </div>
            <div className={s.btnGroup}>
              <div className={cx(s.btn, s.btnLike)}>Like</div>
              <div className={cx(s.btn, s.btnDisLike)}>Dislike</div>
            </div>
            {currentUserRole === 'ADMIN' && (
              <a className={s.report}>block the video</a>
            )}
            <a
              role="presentation"
              className={s.report}
              onClick={() => setModalIsOpen(true)}
            >
              report the video
            </a>
            {currentUserId === id && (
              <a
                role="presentation"
                className={s.report}
                onClick={() => onRemove(youtubeId)}
              >
                remove the video
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Video);
