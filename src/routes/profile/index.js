import React from 'react';
import Profile from './Profile';

const title = 'Profile';

function action() {
  // const { user  } = req;

  // if (!user.isAuthenticated)
  //   return 404;

  return {
    title,
    component: <Profile title={title} />,
  };
}

export default action;
