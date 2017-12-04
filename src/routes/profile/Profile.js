import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Profile.css';

function Profile({ title }) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>Username : ...</p>
        <p>Email : ...</p>
        {/*
          <p>Username : {user.username}</p>
          <p>Email : {user.email}</p>
        */}
      </div>
    </div>
  );
}

Profile.propTypes = { title: PropTypes.string.isRequired };

export default withStyles(s)(Profile);
