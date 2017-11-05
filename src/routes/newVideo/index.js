import React from 'react';
import Layout from '../../components/Layout';
import NewVideo from './NewVideo';
import { getYoutubeId } from '../../common/helpers';
import history from './../../history';

const title = 'Add new video';

function addVideoCreator(fetch, id) {
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

    history.push(`/user/${id}`);

    const { errors } = await resp.json();

    if (errors && errors.length) {
      console.error(errors);
    }
  };
}

function action({ fetch, store }) {
  const { user: { id } } = store.getState();
  const handleAddVideo = addVideoCreator(fetch, id);

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
