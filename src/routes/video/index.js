import React from 'react';
import Video from './Video';
import Layout from '../../components/Layout';

async function action({ fetch, params: { youtubeId } }) {
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

  return {
    chunks: ['video'],
    title,
    component: (
      <Layout>
        <Video videoData={video} />
      </Layout>
    ),
  };
}

export default action;
