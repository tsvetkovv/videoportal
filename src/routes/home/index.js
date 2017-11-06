import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  const respLast = await fetch('/graphql', {
    body: JSON.stringify({
      query: `{
        latestVideos: videos(orderBy: date) {
          youtubeId
          title
          rating
        }
        popularVideos: videos(orderBy: rating) {
          youtubeId
          title
          rating
        }
      }`,
    }),
  });
  const { data } = await respLast.json();

  return {
    chunks: ['home'],
    title: 'Video portal',
    component: (
      <Layout>
        <Home homeData={data} />
      </Layout>
    ),
  };
}

export default action;
