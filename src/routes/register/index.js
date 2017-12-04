import React from 'react';
import Layout from '../../components/Layout';
import Register from './Register';
import {
  registerUserRequest,
  registerUserSuccess,
} from '../../store/user/action';
import history from '../../history';

const title = 'New User Registration';

function registerUserCreator(fetch, dispatch) {
  return async (username, password) => {
    dispatch(registerUserRequest());

    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: `
       mutation {
        userRegister(username: "${username}", password: "${password}") {
          username
          id
          role
        }
      }
      `,
      }),
      credentials: 'include',
    });

    const { data, errors } = await resp.json();
    const { userRegister } = data;

    if (errors && errors.length) {
      alert(`Error: ${errors[0].message}`);
      // TODO handler
      return;
    }

    dispatch(
      registerUserSuccess({
        username: userRegister.username,
        id: userRegister.id,
        role: userRegister.role,
      }),
    );
    history.push('/');
  };
}
function action({ fetch, store: { dispatch } }) {
  const handleRegisterUser = registerUserCreator(fetch, dispatch);

  return {
    chunks: ['register'],
    title,
    component: (
      <Layout>
        <Register title={title} registerUser={handleRegisterUser} />
      </Layout>
    ),
  };
}

export default action;
