import React from 'react';
import Layout from '../../components/Layout';
import Login from './Login';

const title = 'Log In';

async function onSubmit(usernameOrEmail, password) {
  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation {
          userLogin(usernameOrEmail: "${usernameOrEmail}", password: "${password}") {
            user {
              id
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
  if (data.id) {
    // todo Redirect
  }
}

async function action() {
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
