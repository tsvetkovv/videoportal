import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import NewVideoForm from '../../components/NewVideoForm/NewVideoForm';
import s from './NewVideo.css';

class NewVideo extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    addVideo: PropTypes.func.isRequired,
  };

  render() {
    const { title, addVideo } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <NewVideoForm onSubmit={addVideo} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(NewVideo);
