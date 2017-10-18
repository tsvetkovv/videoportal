import React from 'react';
import Layout from '../../components/Layout';
import User from './User';

const title = 'Your profile';
const profileData = {
  categories: [
    {
      title: 'My videos',
      content: [
        {
          title: 'video1',
          author: 'Alena',
          rating: 4.5,
          url: 'aaa',
        },
        {
          title: 'video2',
          author: 'Alena',
          rating: 4.6,
          url: 'bbb',
        },
        {
          title: 'video3',
          author: 'Alena',
          rating: 4.5,
          url: 'aaa',
        },
      ],
    },
    {
      title: 'Favorites',
      content: [
        {
          title: 'video1',
          author: 'Alena',
          rating: 4.5,
          url: 'aaa',
        },
        {
          title: 'video2',
          author: 'Viktor',
          rating: 4.6,
          url: 'bbb',
        },
      ],
    },
  ],
};

function action() {
  return {
    chunks: ['user'],
    title,
    component: (
      <Layout>
        <User title={title} profileData={profileData} />
      </Layout>
    ),
  };
}

export default action;
