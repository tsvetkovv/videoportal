import React from 'react';
import Layout from '../../components/Layout';
import Register from './Register';
import {
  registerUserRequest,
  registerUserSuccess,
} from '../../store/user/action';

const title = 'New User Registration';

function registerUserCreator(fetch, dispatch) {
  return async (username, email, password) => {
    dispatch(registerUserRequest());

    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: `
       mutation {
        userRegister(username: "${username}", email: "${email}", password: "${password}") {
           user {
             id,
             username,
             email
           },
          errors {
            message,
            key
          }
        }
      }
      `,
      }),
      credentials: 'include',
    });

    const r = resp.json();

    const { data: { userRegister: { errors } } } = r;

    if (errors.length) {
      console.error(errors);
      return;
    }

    dispatch(registerUserSuccess());
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
