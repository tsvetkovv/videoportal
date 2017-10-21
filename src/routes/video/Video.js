import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Modal from 'react-modal';
import { withState } from 'recompose';
import Link from '../../components/Link';
import s from './Video.css';

@withState('modalIsOpen', 'setModalIsOpen', false)
class Video extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    setModalIsOpen: PropTypes.func.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
  };

  render() {
    const {
      title,
      rating,
      description,
      author,
      modalIsOpen,
      setModalIsOpen,
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
    };

    return (
      <div className={s.root}>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={customStyles}
          contentLabel="Modal"
        >
          <h1>хахаха</h1>
          <h1>нет, не пожалуешся))))))</h1>
          <h5>просто пробник модалки</h5>
        </Modal>
        <div className={s.container}>
          <div>
            <div className={s.videoContent} />
            <h1>{title}</h1>
            <h4>{rating}</h4>
            <Link to="/user">{author}</Link>
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
              report the video
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Video);
