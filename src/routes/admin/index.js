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
        id: 3333,
        title: 'video1',
        rating: 4.5,
        link: 'As-Hz6YjbVI',
        author: {
          id: '59fd72dee251fc133c8ef8e0',
          username: 'alena',
        },
      },
      {
        id: 5555,
        title: 'video1',
        rating: 4.5,
        link: 'K5O-lJW6xvg',
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
