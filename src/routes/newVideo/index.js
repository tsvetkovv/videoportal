import React from 'react';
import Layout from '../../components/Layout';
import NewVideo from './NewVideo';

const title = 'Add new video';

function action() {
  return {
    chunks: ['user'],
    title,
    component: (
      <Layout>
        <NewVideo title={title} />
      </Layout>
    ),
  };
}

export default action;
