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
        id: 2222,
        title: 'video1',
        author: 'Alena',
        authorId: 12345,
        rating: 4.5,
        url: 'aaa',
      },
      {
        id: 2222,
        title: 'video1',
        author: 'Alena',
        authorId: 12345,
        rating: 4.5,
        url: 'aaa',
      },
      {
        id: 2222,
        title: 'video1',
        author: 'Alena',
        authorId: 12345,
        rating: 4.5,
        url: 'aaa',
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
