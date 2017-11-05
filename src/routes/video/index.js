import React from 'react';
import Video from './Video';
import Layout from '../../components/Layout';
import history from './../../history';

function removeVideoCreator(fetch, id) {
  return async youtubeId => {
    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: `
          mutation {
            videoRemove(youtubeId: "${youtubeId}")
          }
        `,
      }),
      credentials: 'include',
    });

    const { errors } = await resp.json();

    if (errors && errors.length) {
      alert(`Error: ${errors[0].state[errors[0].message]}`);
      return;
    }

    history.push(`/user/${id}`);
  };
}

async function action({ fetch, params: { youtubeId }, store }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: `{
        video(youtubeId: "${youtubeId}") {
          youtubeId
          title
          date
          author {username, id}
          rating
          likedBy {id}
          dislikedBy {id}
          isBlocked
          isWarning
        }
      }`,
    }),
  });
  const { data: { video } } = await resp.json();
  const title = 'Video title';
  const { user: { id } } = store.getState();
  const onRemove = removeVideoCreator(fetch, id);

  return {
    chunks: ['video'],
    title,
    component: (
      <Layout>
        <Video videoData={video} onRemove={onRemove} />
      </Layout>
    ),
  };
}

export default action;
