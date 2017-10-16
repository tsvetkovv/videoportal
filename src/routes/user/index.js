import React from 'react';
import Layout from '../../components/Layout';
import User from './User';

const title = 'Contact Us';

function action() {
  return {
    chunks: ['user'],
    title,
    component: (
      <Layout>
        <User title={title} />
      </Layout>
    ),
  };
}

export default action;
