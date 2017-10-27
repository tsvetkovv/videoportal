import React from 'react';
import Layout from '../../components/Layout';
import User from './User';

const title = 'Your profile';

async function action({ params: { userId } }) {
  // const resp = await fetch('/graphql', {
  //   body: JSON.stringify({
  //     query: `{userId:${userId}}`,
  //   }),
  // });
  // const { profileData } = await resp.json();
  // if (!data || !data.news) throw new Error('Failed to load the news feed.');

  const profileData = {
    categories: [
      {
        title: 'My videos',
        content: [
          {
            id: 3333,
            title: 'video1',
            rating: 4.5,
            url: 'aaa',
          },
          {
            id: 3333,
            title: 'video2',
            rating: 4.6,
            url: 'bbb',
          },
          {
            id: 3333,
            title: 'video3',
            rating: 4.5,
            url: 'aaa',
          },
        ],
      },
      {
        title: 'Favorites',
        content: [
          {
            id: 3333,
            title: 'video1',
            author: 'Alena',
            authorId: 111,
            rating: 4.5,
            url: 'aaa',
          },
          {
            id: 3333,
            title: 'video2',
            author: 'Viktor',
            authorId: 111,
            rating: 4.6,
            url: 'bbb',
          },
        ],
      },
    ],
  };

  return {
    chunks: ['user'],
    title,
    component: (
      <Layout>
        <User userId={userId} title={title} profileData={profileData} />
      </Layout>
    ),
  };
}

export default action;
