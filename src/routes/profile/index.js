import React from 'react';
import Profile from './Profile';
import Layout from '../../components/Layout';

const title = 'Video name';

function action() {
  // const { user  } = req;

  // if (!user.isAuthenticated)
  //   return 404;

  return {
    title,
    component: (
      <Layout>
        <Profile title={title} />
      </Layout>
    ),
  };
}

export default action;
