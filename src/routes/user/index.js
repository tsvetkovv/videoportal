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
          ownVideos { youtubeId, title, date, rating }
        }
      }
    `,
    }),
  });
  const { data: { user } } = await resp.json();

  const onLogOut = logoutUserActionCreator(fetch, dispatch);

  return {
    chunks: ['user'],
    title,
    component: (
      <Layout>
        <User
          userPageId={userId}
          title={title}
          profileData={user}
          onLogOut={onLogOut}
        />
      </Layout>
    ),
  };
}

export default action;
