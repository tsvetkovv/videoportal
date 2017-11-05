import React from 'react';
import Layout from '../../components/Layout';
import NewVideo from './NewVideo';
import { getYoutubeId } from '../../common/helpers';

const title = 'Add new video';

function addVideoCreator(fetch) {
  return async (link, name) => {
    const youtubeId = getYoutubeId(link);

    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: `
          mutation {
            videoAdd(title: "${name}", youtubeId: "${youtubeId}") {
              youtubeId
              title
            }
          }
      `,
      }),
      credentials: 'include',
    });

    const { errors } = await resp.json();

    if (errors && errors.length) {
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
