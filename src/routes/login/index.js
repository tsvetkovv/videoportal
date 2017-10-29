import React from 'react';
import Layout from '../../components/Layout';
import Login from './Login';
import { loginUserRequest, loginUserSuccess } from '../../store/user/action';

const title = 'Log In';

function loginUserActionCreator(fetch, dispatch) {
  return async (username, password) => {
    dispatch(loginUserRequest());

    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: `
       mutation {
          userLogin(username: "${username}", password: "${password}") {
            user {
              id,
              username
            }
            errors {
              message
              key
            }
          }
        }
      `,
      }),
      credentials: 'include',
    });

    const { data } = await resp.json();
    const { userLogin: { user, errors } } = data;
    if (errors.length) {
      console.error(errors);
      return;
    }

    dispatch(
      loginUserSuccess({
        id: user.id,
        username: user.username,
      }),
    );
  };
}

function action({ fetch, store: { dispatch } }) {
  const onSubmit = loginUserActionCreator(fetch, dispatch);

  return {
    chunks: ['login'],
    title,
    component: (
      <Layout>
        <Login title={title} onSubmit={onSubmit} />
      </Layout>
    ),
  };
}

export default action;
