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
  // const resp = await fetch('/graphql', {
  //   body: JSON.stringify({
  //     query: `{userId:${userId}}`,
  //   }),
  // });
  // const { profileData } = await resp.json();
  // if (!data || !data.news) throw new Error('Failed to load the news feed.');

  const profileData = {
    userName: 'Victor',
    categories: [
      {
        title: 'User`s videos',
        content: [
          {
            id: 3333,
            title: 'video1',
            rating: 4.5,
            url: 'aaa',
          },
          {
            id: 3333,
            title: 'video2',
            rating: 4.6,
            url: 'bbb',
          },
          {
            id: 3333,
            title: 'video3',
            rating: 4.5,
            url: 'aaa',
          },
        ],
      },
      {
        title: 'Favorites',
        content: [
          {
            id: 3333,
            title: 'video1',
            author: 'Alena',
            authorId: 111,
            rating: 4.5,
            url: 'aaa',
          },
          {
            id: 3333,
            title: 'video2',
            author: 'Viktor',
            authorId: 111,
            rating: 4.6,
            url: 'bbb',
          },
        ],
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
          profileData={profileData}
          onLogOut={onLogOut}
        />
      </Layout>
    ),
  };
}

export default action;
