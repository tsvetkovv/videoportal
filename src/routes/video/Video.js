import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Modal from 'react-modal';
import ReactToastr, { ToastContainer } from 'react-toastr';
import { withState } from 'recompose';
import Link from '../../components/Link';
import s from './Video.css';

const ToastMessageFactory = React.createFactory(
  ReactToastr.ToastMessage.animation,
);

@withState('modalIsOpen', 'setModalIsOpen', false)
class Video extends Component {
  static propTypes = {
    videoData: PropTypes.shape({
      title: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      setModalIsOpen: PropTypes.func.isRequired,
      modalIsOpen: PropTypes.bool.isRequired,
    }).isRequired,
  };

  render() {
    const {
      videoData: {
        title,
        rating,
        description,
        author,
        authorId,
        modalIsOpen,
        setModalIsOpen,
      },
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
    const userLink = `/user/${authorId}`;

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
        <ToastContainer
          ref={input => {
            this.container = input;
          }}
          toastMessageFactory={ToastMessageFactory}
          className="toast-top-right"
          preventDuplicates="true"
        />
        <div className={s.container}>
          <div>
            <div className={s.videoContent} />
            <h1>{title}</h1>
            <h4>{rating}</h4>
            <Link to={userLink}>{author}</Link>
            <p>{description}</p>
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
            <a
              role="presentation"
              className={s.report}
              onClick={() => setModalIsOpen(true)}
            >
              block the video (will be for admin only)
            </a>
            <a
              role="presentation"
              className={s.report}
              onClick={() => setModalIsOpen(true)}
            >
              report the video
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Video);
