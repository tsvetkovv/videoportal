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

function favVideoCreator(fetch) {
  return async youtubeId => {
    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: `
          mutation {
            videoFav(youtubeId: "${youtubeId}")
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

function unfavVideoCreator(fetch) {
  return async youtubeId => {
    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: `
          mutation {
            videoUnfav(youtubeId: "${youtubeId}")
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

  if (!video) {
    return {
      redirect: '/not-found',
    };
  }

  const title = video.title;
  const { user } = store.getState();
  const onRemove = user && removeVideoCreator(fetch, user.id);
  const onFav = favVideoCreator(fetch);
  const onUnfav = unfavVideoCreator(fetch);

  return {
    chunks: ['video'],
    title,
    component: (
      <Layout>
        <Video
          videoData={video}
          onRemove={onRemove}
          onFav={onFav}
          onUnfav={onUnfav}
        />
      </Layout>
    ),
  };
}

export default action;
