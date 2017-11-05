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
    lastVideos: [
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
    populateVideos: [
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
