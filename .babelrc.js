// Babel configuration
// https://babeljs.io/docs/usage/api/
module.exports = {
  presets: [
    [
      'env',
      {
        targets: {
          node: 'current'
        },
      },
    ],
    'stage-2',
    'flow',
    'react'
  ],
  ignore: ['node_modules', 'build']
};
