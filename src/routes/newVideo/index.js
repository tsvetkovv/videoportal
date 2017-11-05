import React from 'react';
import Layout from '../../components/Layout';
import NewVideo from './NewVideo';

const title = 'Add new video';

function addVideoCreator(fetch) {
  return async (link, name) => {
    const date = Date.now();
    const author = 'Current User';
    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: `
       mutation {
        addVideo(link: "${link}", name: "${name}", date: "${date}", author: "${author}") {
           video {
             id,
             link,
             name,
             rating,
             author,
             date
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

    const { errors } = await resp.json();

    if (errors.length) {
      console.error(errors);
    }
  };
}

function action({ fetch }) {
  const handleAddVideo = addVideoCreator(fetch);

  return {
    chunks: ['user'],
    title,
    component: (
      <Layout>
        <NewVideo title={title} addVideo={handleAddVideo} />
      </Layout>
    ),
  };
}

export default action;
