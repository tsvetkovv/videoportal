import React from 'react';
import Layout from '../../components/Layout';
import User from './User';
import { logoutUserRequest, logoutUserSuccess } from '../../store/user/action';

const title = 'Your profile';

function logoutUserActionCreator(fetch, dispatch) {
  return async () => {
    dispatch(logoutUserRequest());

    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: `
          mutation {
            userLogout
          }
      `,
      }),
      credentials: 'include',
    });

    const { errors } = await resp.json();
    if (errors && errors.length) {
      console.error(errors);
      // TODO handler
      return;
    }

    dispatch(logoutUserSuccess());
  };
}

async function action({ fetch, store: { dispatch }, params: { userId } }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: `{
        user(id: "${userId}") {
          username,
          favoriteVideos { youtubeId, title, rating, author { username, id} }
        }
      }
    `,
    }),
  });
  const { data } = await resp.json();
  console.error(data);

  const newData = {
    username: 'alena',
    claimedVideos: [
      {
        id: 3333,
        title: 'video1',
        rating: 4.5,
        link: 'As-Hz6YjbVI',
        author: {
          id: '59fd72dee251fc133c8ef8e0',
          username: 'alena',
        },
      },
      {
        id: 5555,
        title: 'video1',
        rating: 4.5,
        link: 'K5O-lJW6xvg',
        author: {
          id: '59fd72dee251fc133c8ef8e0',
          username: 'alena',
        },
      },
    ],
    favoriteVideos: [
      {
        id: 3333,
        title: 'video1',
        rating: 4.5,
        link: 'As-Hz6YjbVI',
        author: {
          id: '59fd72dee251fc133c8ef8e0',
          username: 'alena',
        },
      },
      {
        id: 5555,
        title: 'video1',
        rating: 4.5,
        link: 'K5O-lJW6xvg',
        author: {
          id: '59fd72dee251fc133c8ef8e0',
          username: 'alena',
        },
      },
    ],
  };

  const onLogOut = logoutUserActionCreator(fetch, dispatch);

  return {
    chunks: ['user'],
    title,
    component: (
      <Layout>
        <User
          userPageId={userId}
          title={title}
          profileData={newData}
          onLogOut={onLogOut}
        />
      </Layout>
    ),
  };
}

export default action;
