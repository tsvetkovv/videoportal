import React from 'react';
import Video from './Video';
import Layout from '../../components/Layout';

async function action({ params: { videoId } }) {
  // const resp = await fetch('/graphql', {
  //   body: JSON.stringify({
  //     query: `{videoId:${videoId}}`,
  //   }),
  // });
  // const { profileData } = await resp.json();
  // if (!data || !data.news) throw new Error('Failed to load the news feed.');

  const videoData = {
    addDate: '19-10-2017',
    rating: '+100500',
    description: 'VIDEOVIDEOVIDEOVIDEOVIDEOVIDEOVIDEOVIDEOVIDEOVIDEOVIDEO',
    author: 'Alena',
    authorId: 2222,
  };
  const title = 'Video title';

  return {
    chunks: ['video'],
    title,
    component: (
      <Layout>
        <Video videoId={videoId} videoData={videoData} />
      </Layout>
    ),
  };
}

export default action;
