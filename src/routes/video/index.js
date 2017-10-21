import React from 'react';
import Video from './Video';
import Layout from '../../components/Layout';

const title = 'Video title';
const addDate = '19-10-2017';
const rating = '+100500';
const description = 'VIDEOVIDEOVIDEOVIDEOVIDEOVIDEOVIDEOVIDEOVIDEOVIDEOVIDEO';
const author = 'Alena';

function action() {
  return {
    chunks: ['video'],
    title,
    component: (
      <Layout>
        <Video
          title={title}
          addDate={addDate}
          rating={rating}
          description={description}
          author={author}
        />
      </Layout>
    ),
  };
}

export default action;
