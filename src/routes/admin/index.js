import React from 'react';
import Layout from '../../components/Layout';
import Admin from './Admin';

const title = 'Admin Page';

function clearClaimsVideoCreator(fetch) {
  return async youtubeId => {
    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: `
          mutation {
            videoClearClaims(youtubeId: "${youtubeId}")
          }
        `,
      }),
      credentials: 'include',
    });

    const { errors } = await resp.json();

    if (errors && errors.length) {
      alert(`Error: ${errors[0].state[errors[0].message]}`);
    }
  };
}

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
  const onClearClaims = clearClaimsVideoCreator(fetch);

  if (role !== 'ADMIN') {
    return { redirect: '/' };
  }

  return {
    chunks: ['admin'],
    title,
    component: (
      <Layout>
        <Admin
          title={title}
          blamedVideos={videos}
          onClearClaims={onClearClaims}
        />
      </Layout>
    ),
  };
}

export default action;
