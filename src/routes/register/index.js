import React from 'react';
import Layout from '../../components/Layout';
import Register from './Register';

const title = 'New User Registration';

async function onSubmit(username, email, password) {
  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
       mutation {
        userRegister(username: "${username}", email: "${email}", password: "${password}") {
           user {
             id
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
  const { data } = await resp.json();
  if (data.id) {
    // Redirect
  }
}

function action() {
  return {
    chunks: ['register'],
    title,
    component: (
      <Layout>
        <Register title={title} onSubmit={onSubmit} />
      </Layout>
    ),
  };
}

export default action;
