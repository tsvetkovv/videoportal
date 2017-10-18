import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{news{title,link,content}}',
    }),
  });
  const { data } = await resp.json();
  if (!data || !data.news) throw new Error('Failed to load the news feed.');

  const homeData = {
    categories: [
      {
        title: 'Popular',
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
      {
        title: 'Last',
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

  return {
    chunks: ['home'],
    title: 'React Starter Kit',
    component: (
      <Layout>
        <Home homeData={homeData} />
      </Layout>
    ),
  };
}

export default action;
