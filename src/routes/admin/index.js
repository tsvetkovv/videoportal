import React from 'react';
import Layout from '../../components/Layout';
import Admin from './Admin';

const title = 'Admin Page';

async function action({ fetch, store }) {
  const { user: { role } } = store.getState();
  const respLast = await fetch('/graphql', {
    body: JSON.stringify({
      query: `{
        videos(blamed: true) {
          youtubeId
          title
          rating
        }
      }`,
    }),
  });
  const { data: { videos } } = await respLast.json();

  if (role !== 'ADMIN') {
    return { redirect: '/' };
  }

  return {
    chunks: ['admin'],
    title,
    component: (
      <Layout>
        <Admin title={title} blamedVideos={videos} />
      </Layout>
    ),
  };
}

export default action;
