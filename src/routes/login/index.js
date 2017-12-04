import React from 'react';
import Layout from '../../components/Layout';
import Login from './Login';
import { loginUserRequest, loginUserSuccess } from '../../store/user/action';
import history from './../../history';

const title = 'Log In';

function loginUserActionCreator(fetch, dispatch) {
  return async (username, password) => {
    dispatch(loginUserRequest());

    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: `
          mutation {
            userLogin(username: "${username}", password: "${password}") {
              username,
              role,
              id
            }
          }
      `,
      }),
      credentials: 'include',
    });

    const { data, errors } = await resp.json();
    const { userLogin } = data;
    if (errors && errors.length) {
      console.error(errors);
      alert(`Error: ${errors[0].state[errors[0].message]}`);
      // TODO handler
      return;
    }

    dispatch(
      loginUserSuccess({
        username: userLogin.username,
        id: userLogin.id,
        role: userLogin.role,
      }),
    );

    history.push('/');
  };
}

function action({ fetch, store }) {
  const onSubmit = loginUserActionCreator(fetch, store.dispatch);

  const state = store.getState();
  if (state.user) {
    return {
      redirect: '/',
    };
  }

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
