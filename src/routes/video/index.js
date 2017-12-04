import React from 'react';
import Video from './Video';
import Layout from '../../components/Layout';
import {
  videoUploaded,
  videoChangeRating,
  videoClaimed,
} from '../../store/video/action';
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
            videoFav(youtubeId: "${youtubeId}") {
              isFavorite
            }
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
            videoUnfav(youtubeId: "${youtubeId}") {
              isFavorite
            }
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

function likeVideoCreator(fetch, dispatch) {
  return async youtubeId => {
    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: `
          mutation {
            videoLike(youtubeId: "${youtubeId}") {
              rating,
              isLiked,
              isDisliked
            }
          }
        `,
      }),
      credentials: 'include',
    });

    const { errors, data } = await resp.json();
    const { videoLike } = data;

    dispatch(
      videoChangeRating({
        rating: videoLike.rating,
        isLiked: videoLike.isLiked,
        isDisliked: videoLike.isDisliked,
      }),
    );

    if (errors && errors.length) {
      alert(`Error: ${errors[0].state[errors[0].message]}`);
    }
  };
}

function dislikeVideoCreator(fetch, dispatch) {
  return async youtubeId => {
    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: `
          mutation {
            videoDislike(youtubeId: "${youtubeId}") {
              rating,
              isLiked,
              isDisliked
            }
          }
        `,
      }),
      credentials: 'include',
    });

    const { errors, data } = await resp.json();
    const { videoDislike } = data;

    dispatch(
      videoChangeRating({
        rating: videoDislike.rating,
        isLiked: videoDislike.isLiked,
        isDisliked: videoDislike.isDisliked,
      }),
    );

    if (errors && errors.length) {
      alert(`Error: ${errors[0].state[errors[0].message]}`);
    }
  };
}

function claimVideoCreator(fetch, dispatch) {
  return async youtubeId => {
    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: `
          mutation {
            videoClaim(youtubeId: "${youtubeId}") {
              isClaimed
            }
          }
        `,
      }),
      credentials: 'include',
    });

    const { errors, data } = await resp.json();
    const { videoClaim } = data;

    dispatch(
      videoClaimed({
        isClaimed: videoClaim.isClaimed,
      }),
    );

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
          isFavorite
          isLiked
          isDisliked
          isClaimed
        }
      }`,
    }),
  });
  const { data: { video } } = await resp.json();

  store.dispatch(
    videoUploaded({
      rating: video.rating,
      isFavorite: video.isFavorite,
      isLiked: video.isLiked,
      isDisliked: video.isDisliked,
      isClaimed: video.isClaimed,
    }),
  );

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
  const onLike = likeVideoCreator(fetch, store.dispatch);
  const onDislike = dislikeVideoCreator(fetch, store.dispatch);
  const onClaim = claimVideoCreator(fetch, store.dispatch);

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
          onLike={onLike}
          onDislike={onDislike}
          onClaim={onClaim}
        />
      </Layout>
    ),
  };
}

export default action;
