import React from 'react';
import Layout from '../../components/Layout';
import Admin from './Admin';

const title = 'Admin Page';
const isAdmin = true;

function action() {
  if (!isAdmin) {
    return { redirect: '/home' };
  }

  const adminPageData = {
    reportedVideo: [
      {
        title: 'video1',
        rating: 4.5,
        youtubeId: 'D9QxQyx43ig',
        author: {
          id: '59fd72dee251fc133c8ef8e0',
          username: 'alena',
        },
      },
      {
        title: 'video1',
        rating: 4.5,
        youtubeId: 'D9QxQyx43ig',
        author: {
          id: '59fd72dee251fc133c8ef8e0',
          username: 'alena',
        },
      },
    ],
  };

  return {
    chunks: ['admin'],
    title,
    component: (
      <Layout>
        <Admin title={title} adminPageData={adminPageData} />
      </Layout>
    ),
  };
}

export default action;
